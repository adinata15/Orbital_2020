const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const stripeSecretKey = require("config").get("stripeSecretKey");
const stripeState = require("config").get("stripeState");
const stripe = require("stripe")(stripeSecretKey);
const bodyParser = require("body-parser");

const Buyer = require("../../model/Buyer");
const Seller = require("../../model/Seller");
const Item = require("../../model/Item");
const BuyerOrder = require("../../model/BuyerOrder");
const SellerOrder = require("../../model/SellerOrder");

// @route GET api/stripe/connect/oauth?code=code&state=state
// @desc Update sellers stripe ID in database
// @access Private
router.get("/connect/oauth", auth, async (req, res) => {
	const { code, state, error, error_description } = req.query;

	try {
		if (error) {
			return res.status(400).json({ error: error_description });
		}
		// Assert the state matches the state you provided in the OAuth link (optional)
		if (state !== stripeState) {
			return res
				.status(403)
				.json({ error: "Incorrect state parameter: " + state });
		}

		let seller = await Seller.findOne({ _id: req.user.id });

		const response = await stripe.oauth.token({
			grant_type: "authorization_code",
			code,
		});

		const stripeseller = response.stripe_user_id;

		seller = await Seller.findOneAndUpdate(
			{ _id: req.user.id },
			{ $set: { stripeseller } },
			{ new: true }
		).select("-password");

		res.json(seller);
	} catch (err) {
		console.log(err.message);
		if (err.type === "StripeInvalidGrantError") {
			return res
				.status(400)
				.json({ error: "Invalid authorization code: " + code });
		}
		res.status(500).send("Server error");
	}
});

// @route POST api/stripe/create-checkout-session
// @desc Allow buyer to pay for his/her items
// @access Private
router.post("/create-checkout-session", auth, async (req, res) => {
	const { items } = req.body;
	try {
		if (!items || items.length === 0) {
			return res.status(400).json({ msg: "Cart is empty" });
		}

		const line_items = [];
		const totalPricePerItem = [];
		const itemPromisesArray = [];

		items.forEach((item) => {
			const line_item = {
				name: item.title,
				images: [item.image],
				quantity: item.quantity,
				currency: "SGD",
				amount: item.price * 100,
			};
			line_items.push(line_item);
			totalPricePerItem.push(item.quantity * item.price * 100);
			itemPromisesArray.push(Item.findOne({ _id: item.item }));
		});

		const itemsArray = await Promise.all(itemPromisesArray);
		const sellerPromisesArray = [];

		itemsArray.forEach((item) =>
			sellerPromisesArray.push(Seller.findOne({ _id: item.seller }))
		);
		let sellersArray = await Promise.all(sellerPromisesArray);
		sellersArray = sellersArray.map((seller) => seller.stripeseller);

		const uniqueSellersArray = [[], []];
		for (var i = 0; i < sellersArray.length; i++) {
			const sellerIndex = uniqueSellersArray[0].indexOf(sellersArray[i]);
			if (sellerIndex < 0) {
				uniqueSellersArray[0].push(sellersArray[i]);
				uniqueSellersArray[1].push(totalPricePerItem[i]);
			} else {
				uniqueSellersArray[1][sellerIndex] += totalPricePerItem[i];
			}
		}

		metadata = {};
		for (var i = 0; i < uniqueSellersArray[0].length; i++) {
			metadata[uniqueSellersArray[0][i]] = uniqueSellersArray[1][i];
		}
		// For creating order
		metadata["buyerId"] = req.user.id;

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items,
			payment_intent_data: {
				transfer_group: Date.now(),
				metadata,
			},
			success_url: "http://localhost:3000/checkout/success",
			cancel_url: "http://localhost:3000",
		});

		res.json({ sessionId: session.id });
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error");
	}
});

// @route POST api/stripe/webhook
// @desc Make transfers to sellers upon buyer's successful payment, create buyer order and seller orders (This endpoint will run automatically once buyer completes payment, dont need to do anything on front end)
// @access Private
router.post(
	"/webhook",
	bodyParser.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		},
	}),
	async (req, res) => {
		const webhookSecret = require("config").get("webhookSecret");
		const sig = req.headers["stripe-signature"];

		let event;

		// Verify webhook signature and extract the event
		try {
			event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
		} catch (err) {
			return res.status(400).send(`Webhook Error: ${err.message}`);
		}

		try {
			if (event.type === "checkout.session.completed") {
				const session = event.data.object;
				const paymentIntent = await stripe.paymentIntents.retrieve(
					session.payment_intent
				);
				const chargeId = paymentIntent.charges.data[0].id;
				const transfer_group = paymentIntent.transfer_group;
				const sellerInfo = paymentIntent.metadata;
				const promisesArray = [];

				for (const seller in sellerInfo) {
					if (seller === "buyerId") {
						const buyer = await Buyer.findOne({ _id: sellerInfo[seller] });
						const billingaddress = buyer.billingaddress.address;
						const shippingaddress = buyer.shippingaddress.address;
						const items = buyer.cart;

						try {
							let total = 0;
							const itemsArray = [];
							const itemPromisesArray = [];

							items.forEach((item) => {
								itemsArray.push({
									item: item.item,
									brand: item.brand,
									title: item.title,
									size: item.size,
									image: item.image,
									price: item.price,
									quantity: item.quantity,
								});
								total += item.price * item.quantity;
								itemPromisesArray.push(Item.findOne({ _id: item.item }));
							});

							const orderFields = {};
							orderFields.shippingaddress = shippingaddress;
							orderFields.billingaddress = billingaddress;
							orderFields.items = itemsArray;
							orderFields.total = total;
							orderFields.buyer = buyer._id;

							const buyerOrder = new BuyerOrder(orderFields);
							await buyerOrder.save();
							buyer.orders.push({ order: buyerOrder });
							buyer.cart = [];
							await buyer.save();

							const sellerItemsArray = await Promise.all(itemPromisesArray);
							const sellerPromisesArray = [];

							sellerItemsArray.forEach((item) =>
								sellerPromisesArray.push(Seller.findOne({ _id: item.seller }))
							);
							let sellersArray = await Promise.all(sellerPromisesArray);
							sellersArray = sellersArray.map((seller) =>
								seller._id.toString()
							);
							const uniqueSellersArray = [[], []];

							for (var i = 0; i < sellersArray.length; i++) {
								const sellerIndex = uniqueSellersArray[0].indexOf(
									sellersArray[i]
								);
								if (sellerIndex < 0) {
									uniqueSellersArray[0].push(sellersArray[i]);
									uniqueSellersArray[1].push([itemsArray[i]]);
								} else {
									uniqueSellersArray[1][sellerIndex].push(itemsArray[i]);
								}
							}

							for (var i = 0; i < uniqueSellersArray[0].length; i++) {
								const seller = await Seller.findOne({
									_id: uniqueSellersArray[0][i],
								});
								let sellerTotal = 0;
								const indivSellerItemsArray = [];

								uniqueSellersArray[1][i].forEach((item) => {
									indivSellerItemsArray.push({
										item: item.item,
										brand: item.brand,
										title: item.title,
										size: item.size,
										image: item.image,
										price: item.price,
										quantity: item.quantity,
									});
									sellerTotal += item.price * item.quantity;
								});

								const sellerOrder = new SellerOrder({
									seller: seller._id,
									buyer: buyer._id,
									items: indivSellerItemsArray,
									total: sellerTotal,
								});

								await sellerOrder.save();
								seller.orders.push({ order: sellerOrder });
								await seller.save();
							}
						} catch (err) {
							console.log(err.message);
							res.status(500).send("Server error");
						}
					} else {
						const amount = parseInt(sellerInfo[seller] * 0.966 - 50);
						promisesArray.push(
							stripe.transfers.create({
								amount: amount,
								currency: "SGD",
								source_transaction: chargeId,
								destination: seller,
								transfer_group,
							})
						);
					}
				}

				await Promise.all(promisesArray);
			}
			res.json({ received: true });
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;
