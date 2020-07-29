const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const path = require("path");
const spawn = require("child_process").spawn;

const Item = require("../../model/Item");

// @route GET api/items/:item_id
// @desc Get an item
// @access Public
router.get("/:item_id", async (req, res) => {
	try {
		const item = await Item.findOne({
			_id: req.params.item_id,
		});
		if (!item) {
			return res.status(404).json({ msg: "Item not found" });
		}
		res.json(item);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Item not found" });
		}
		res.status(500).send("Server error");
	}
});

// @route PUT api/items/cart/:item_id
// @desc Add an item to shopping cart
// @access Private
router.put(
	"/cart/:item_id",
	[
		auth,
		[
			check("quantity", "Quantity is required").exists({ checkFalsy: true }),
			check("size", "Size is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { size, quantity } = req.body;
		if (quantity <= 0) {
			return res.status(400).json({ msg: "Quantity must be at least 1" });
		}

		try {
			const buyer = await Buyer.findOne({
				_id: req.user.id,
			});
			if (!buyer) {
				return res.status(404).json({ msg: "User not found" });
			}

			const newItem = await Item.findOne({
				_id: req.params.item_id,
			});
			if (!newItem) {
				return res.status(404).json({ msg: "Item not found" });
			}

			//Same item already present in buyer's cart
			let alrPresent = false;
			buyer.cart.forEach((item) => {
				if (
					item.item.toString() === newItem._id.toString() &&
					item.size === size
				) {
					item.quantity = parseInt(item.quantity) + parseInt(quantity);
					alrPresent = true;
				}
			});

			//New item, is not present in buyer's cart
			if (!alrPresent) {
				buyer.cart.push({
					item: newItem._id,
					brand: newItem.brand,
					title: newItem.title,
					price: newItem.price,
					image: newItem.images[0],
					size,
					quantity,
				});
			}

			await buyer.save();

			res.json(buyer.cart);
		} catch (err) {
			console.log(err.message);
			if (err.kind == "ObjectId") {
				return res.status(400).json({ msg: "Item not found" });
			}
			res.status(500).send("Server error");
		}
	}
);

// @route PUT api/items/uncart/:item_id/:size
// @desc Remove an item from shopping cart
// @access Private
router.put("/uncart/:item_id/:size", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({
			_id: req.user.id,
		});
		if (!buyer) {
			return res.status(404).json({ msg: "User not found" });
		}

		let itemFound = false;
		for (var i = 0; i < buyer.cart.length; i++) {
			if (
				buyer.cart[i].item.toString() === req.params.item_id &&
				buyer.cart[i].size === req.params.size
			) {
				buyer.cart.splice(i, 1);
				itemFound = true;
			}
		}
		await buyer.save();

		itemFound
			? res.json(buyer.cart)
			: res.status(404).json({ msg: "Item not found" });
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Item not found" });
		}
		res.status(500).send("Server error");
	}
});

// @route PUT api/items/cart/plus/:item_id/:size
// @desc +1 quantity of an item in shopping cart
// @access Private
router.put("/cart/plus/:item_id/:size", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({
			_id: req.user.id,
		});
		if (!buyer) {
			return res.status(404).json({ msg: "User not found" });
		}

		if (
			buyer.cart.filter(
				(item) =>
					item.item.toString() === req.params.item_id &&
					item.size === req.params.size
			).length === 0
		) {
			return res.status(404).json({ msg: "Item not found" });
		}

		buyer.cart.forEach((item) => {
			if (
				item.item.toString() === req.params.item_id &&
				item.size === req.params.size
			) {
				item.quantity += 1;
			}
		});

		await buyer.save();

		res.json(buyer.cart);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Item not found" });
		}
		res.status(500).send("Server error");
	}
});

// @route PUT api/items/cart/minus/:item_id/:size
// @desc -1 quantity of an item in shopping cart
// @access Private
router.put("/cart/minus/:item_id/:size", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({
			_id: req.user.id,
		});
		if (!buyer) {
			return res.status(404).json({ msg: "User not found" });
		}

		if (
			buyer.cart.filter(
				(item) =>
					item.item.toString() === req.params.item_id &&
					item.size === req.params.size
			).length === 0
		) {
			return res.status(404).json({ msg: "Item not found" });
		}

		buyer.cart.forEach((item) => {
			if (
				(item.item.toString() === req.params.item_id) &
				(item.size === req.params.size)
			) {
				item.quantity -= 1;

				//Remove item if quantity is zero
				if (item.quantity === 0) {
					const removeIndex = buyer.cart
						.map((item) => [item.item.toString(), item.size])
						.indexOf([req.params.item_id, req.params.size]);

					buyer.cart.splice(removeIndex, 1);
				}
			}
		});

		await buyer.save();

		res.json(buyer.cart);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Item not found" });
		}
		res.status(500).send("Server error");
	}
});

// @route PUT api/items/like/:item_id
// @desc Add an item to wishlist
// @access Private
router.put(
	"/like/:item_id",
	[auth, check("size", "Size is required").not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { size } = req.body;

		try {
			const buyer = await Buyer.findOne({
				_id: req.user.id,
			});
			if (!buyer) {
				return res.status(404).json({ msg: "User not found" });
			}

			const newItem = await Item.findOne({
				_id: req.params.item_id,
			});
			if (!newItem) {
				return res.status(404).json({ msg: "Item not found" });
			}

			//If the item is already present in buyer's wishlist
			if (
				buyer.wishlist.filter(
					(item) =>
						item.item.toString() === req.params.item_id && item.size === size
				).length > 0
			) {
				return res.status(404).json({ msg: "Item is already in wishlist" });
			}

			//If the item is already present in buyer's wishlist
			if (
				buyer.cart.filter(
					(item) =>
						item.item.toString() === req.params.item_id && item.size === size
				).length > 0
			) {
				return res.status(404).json({ msg: "Item is already in cart" });
			}

			//Item is not present in buyer's wishlist
			buyer.wishlist.push({
				item: newItem._id,
				brand: newItem.brand,
				title: newItem.title,
				price: newItem.price,
				image: newItem.images[0],
				size,
			});

			await buyer.save();

			res.json(buyer.wishlist);
		} catch (err) {
			console.log(err.message);
			if (err.kind == "ObjectId") {
				return res.status(400).json({ msg: "Item not found" });
			}
			res.status(500).send("Server error");
		}
	}
);

// @route PUT api/items/unlike/:item_id/:size
// @desc Remove an item from wishlist
// @access Private
router.put("/unlike/:item_id/:size", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({
			_id: req.user.id,
		});
		if (!buyer) {
			return res.status(404).json({ msg: "User not found" });
		}

		let itemFound = false;
		for (var i = 0; i < buyer.wishlist.length; i++) {
			if (
				buyer.wishlist[i].item.toString() === req.params.item_id &&
				buyer.wishlist[i].size === req.params.size
			) {
				buyer.wishlist.splice(i, 1);
				itemFound = true;
			}
		}
		await buyer.save();

		itemFound
			? res.json(buyer.wishlist)
			: res.status(404).json({ msg: "Item not found" });
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Item not found" });
		}
		res.status(500).send("Server error");
	}
});

// @route PUT api/items/wishlist/cart/:item_id/:size
// @desc Transfer item from wishlist to shopping cart
// @access Private
router.put("/wishlist/cart/:item_id/:size", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({
			_id: req.user.id,
		});
		if (!buyer) {
			return res.status(404).json({ msg: "User not found" });
		}

		let itemFound = false;
		for (var i = 0; i < buyer.wishlist.length; i++) {
			if (
				buyer.wishlist[i].item.toString() === req.params.item_id &&
				buyer.wishlist[i].size === req.params.size
			) {
				buyer.cart.push({
					item: buyer.wishlist[i].item,
					brand: buyer.wishlist[i].brand,
					title: buyer.wishlist[i].title,
					price: buyer.wishlist[i].price,
					size: buyer.wishlist[i].size,
					image: buyer.wishlist[i].image,
					quantity: 1,
				});
				buyer.wishlist.splice(i, 1);
				itemFound = true;
			}
		}
		await buyer.save();

		itemFound
			? res.json(buyer)
			: res.status(404).json({ msg: "Item not found" });
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Item not found" });
		}
		res.status(500).send("Server error");
	}
});

// @route GET api/items/category/:category (if multiple categories are present, separated each value using '-')
// @desc Get all items from a certain category
// @access Public
router.get("/category/:category", async (req, res) => {
	try {
		const category = req.params.category.toLowerCase().split("-");
		const items = await Item.find({
			category: { $all: category },
		});
		if (!items) {
			return res.status(404).json({ msg: "Items not found" });
		}
		res.json(items);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error");
	}
});

// @route POST api/items/size-assistant/:item_id
// @desc Get size recommendation for items on Best Fit
// @access Public
router.post(
	"/size-assistant/:item_id",
	[
		check("weight", "Weight is required").exists({ checkFalsy: true }),
		check("height", "Height is required").exists({ checkFalsy: true }),
		check("gender", "Gender is required").not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { height, weight, gender } = req.body;

		try {
			const item = await Item.findOne({ _id: req.params.item_id });
			if (!item) {
				return res.status(400).json({ msg: "Item not found" });
			}

			const sizes = item.sizes;
			const unit = item.sizechartunit;
			const meatype = item.sizechartmeatype;
			const category = item.category;

			if (unit === "in") {
				for (var i = 0; i < sizes.length; i++) {
					if (
						category.includes("tshirt") ||
						category.includes("shirt") ||
						category.includes("dress")
					) {
						sizes[i].chest.from = sizes[i].chest.from * 2.54;
						sizes[i].chest.to = sizes[i].chest.to * 2.54;
					} else {
						sizes[i].waist.from = sizes[i].waist.from * 2.54;
						sizes[i].waist.to = sizes[i].waist.to * 2.54;
					}
				}
			}

			if (meatype === "garment") {
				switch (true) {
					case category.includes("tshirt"):
						for (var i = 0; i < sizes.length; i++) {
							sizes[i].chest.from = sizes[i].chest.from * 2 - 4;
							sizes[i].chest.to = sizes[i].chest.to * 2 - 4;
						}
						break;
					case category.includes("shirt"):
						for (var i = 0; i < sizes.length; i++) {
							sizes[i].chest.from = sizes[i].chest.from * 2 - 10;
							sizes[i].chest.to = sizes[i].chest.to * 2 - 10;
						}
						break;
					case category.includes("dress"):
						for (var i = 0; i < sizes.length; i++) {
							sizes[i].chest.from = sizes[i].chest.from * 2 - 10;
							sizes[i].chest.to = sizes[i].chest.to * 2 - 10;
						}
						break;
				}
			}

			const pypath = path.join(
				__dirname,
				"../..",
				"utils",
				"size_assistant.py"
			);
			const params = [pypath];
			params.push(height);
			params.push(weight);
			let chestWidth;
			let waistCirc;
			let recSize;

			if (
				category.includes("tshirt") ||
				category.includes("shirt") ||
				category.includes("dress")
			) {
				params.push(0);

				if (gender === "M") {
					params.push(1);
				} else {
					params.push(2);
				}

				const py = spawn("python", params);

				py.stdout.on("data", (data) => {
					let sizeFound = false;
					let whichSize = 0;
					chestWidth = parseFloat(data.toString().slice(1, 6));

					while (!sizeFound) {
						if (whichSize === sizes.length) {
							break;
						}
						if (chestWidth < sizes[whichSize].chest.to) {
							recSize = sizes[whichSize].size;
							sizeFound = !sizeFound;
						} else {
							whichSize += 1;
						}
					}
				});

				py.stdout.on("close", () => {
					if (!chestWidth) {
						return res.status(500).send("Server error");
					}
					console.log("Predicted chest width =", chestWidth);
					recSize ? res.json({ recSize }) : res.json({ msg: "Size not found" });
				});

				py.stderr.on("data", (data) => {
					console.log(data.toString());
				});
			} else {
				params.push(1);

				if (gender === "M") {
					params.push(1);
				} else {
					params.push(2);
				}

				const py = spawn("python", params);

				py.stdout.on("data", (data) => {
					let sizeFound = false;
					let whichSize = 0;
					waistCirc = parseFloat(data.toString().slice(1, 6));

					while (!sizeFound) {
						if (whichSize === sizes.length) {
							break;
						}
						if (waistCirc < sizes[whichSize].waist.to) {
							recSize = sizes[whichSize].size;
							sizeFound = !sizeFound;
						} else {
							whichSize += 1;
						}
					}
				});

				py.stdout.on("close", () => {
					if (!waistCirc) {
						return res.status(500).send("Server error");
					}
					console.log("Predicted waist circumference =", waistCirc);
					recSize ? res.json({ recSize }) : res.json({ msg: "Size not found" });
				});

				py.stderr.on("data", (data) => {
					console.log(data.toString());
				});
			}
		} catch (err) {
			console.log(err.message);
			if (err.kind == "ObjectId") {
				return res.status(400).json({ msg: "Item not found" });
			}
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;
