const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const Buyer = require("../../model/Buyer");
const Seller = require("../../model/Seller");
const Address = require("../../model/Address");

// @route POST api/users/buyer
// @desc Register buyer
// @access Public
router.post(
	"/buyer",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Password must have at least 8 characters").isLength({
			min: 8,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password, height, weight, gender } = req.body;

		const buyerFields = {};
		buyerFields.name = name;
		buyerFields.email = email;
		buyerFields.password = password;
		if (height) buyerFields.height = height;
		if (weight) buyerFields.weight = weight;
		if (gender) buyerFields.gender = gender;

		try {
			let user = await Buyer.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] });
			}

			user = new Buyer(buyerFields);

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);

			await user.save();

			//Create JWT
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: config.get("tokenExpiry"),
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			res.status(500).send(err.message);
		}
	}
);

// @route POST api/users/seller
// @desc Register seller
// @access Public
router.post(
	"/seller",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Password must have at least 8 characters").isLength({
			min: 8,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await Seller.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] });
			}

			user = new Seller({ name, email, password });

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);

			await user.save();

			//Create JWT
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: config.get("tokenExpiry"),
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			res.status(500).send(err.message);
		}
	}
);

// @route GET api/users/me
// @desc Get logged in users account
// @access Private
router.get("/me", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({ _id: req.user.id }).select("-password");
		const seller = await Seller.findOne({ _id: req.user.id }).select(
			"-password"
		);

		if (!buyer && !seller) {
			return res.status(404).json({ msg: "Account not found" });
		}
		const user = buyer ? buyer : seller;
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error");
	}
});

// @route GET api/users/:seller_id
// @desc Get a sellers account
// @access Public
router.get("/:seller_id", async (req, res) => {
	try {
		const listings = await Seller.findOne(
			{ _id: req.params.seller_id },
			"listings"
		);
		if (!listings) {
			return res.status(404).json({ msg: "Account not found" });
		}
		res.json(listings);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Account not found" });
		}
		res.status(500).send("Server error");
	}
});

// @route PUT api/users/buyer
// @desc Update logged in buyers account
// @access Private
router.put(
	"/buyer",
	[
		auth,
		[
			check("name", "Name is required").not().isEmpty(),
			check("email", "Please enter a valid email").isEmail(),
			check("password", "Password must have at least 8 characters").isLength({
				min: 8,
			}),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password, height, weight, gender } = req.body;

		const buyerFields = {};
		buyerFields.name = name;
		buyerFields.email = email;
		buyerFields.password = password;
		if (height) buyerFields.height = height;
		if (weight) buyerFields.weight = weight;
		if (gender) buyerFields.gender = gender;

		try {
			let user = await Buyer.findOne({ _id: req.user.id });

			if (user) {
				//Update
				const salt = await bcrypt.genSalt(10);
				buyerFields.password = await bcrypt.hash(buyerFields.password, salt);

				user = await Buyer.findOneAndUpdate(
					{ _id: req.user.id },
					{ $set: buyerFields },
					{ new: true }
				).select("-password");
			}
			return res.json(user);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

// @route POST api/users/buyer/address
// @desc Add address
// @access Private
router.post(
	"/buyer/address",
	[
		auth,
		[
			check("firstname", "First Name is required").not().isEmpty(),
			check("lastname", "Last Name is required").not().isEmpty(),
			check("cellphone", "Cellphone is required").not().isEmpty(),
			check("telephone", "Telephone is required").not().isEmpty(),
			check("address", "Address is required").not().isEmpty(),
			check("postcode", "Postcode is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			firstname,
			lastname,
			cellphone,
			telephone,
			address,
			postcode,
		} = req.body;
		const addressFields = {
			buyer: req.user.id,
			firstname,
			lastname,
			cellphone,
			telephone,
			address,
			postcode,
		};

		try {
			const buyer = await Buyer.findOne({ _id: req.user.id });
			if (!buyer) {
				return res.status(404).json({ msg: "Account not found" });
			}

			const newAdd = new Address(addressFields);

			buyer.addresses.push({ address: newAdd._id });

			if (buyer.billingaddress.empty && buyer.shippingaddress.empty) {
				buyer.billingaddress.empty = false;
				buyer.billingaddress.address = newAdd._id;
				newAdd.billingaddress = true;
				buyer.shippingaddress.empty = false;
				buyer.shippingaddress.address = newAdd._id;
				newAdd.shippingaddress = true;
			}
			await newAdd.save();
			await buyer.save();

			res.json(buyer.addresses);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

// @route POST api/users/buyer/billingaddress
// @desc Add billing address
// @access Private
router.post(
	"/buyer/address/billingaddress",
	[
		auth,
		[
			check("firstname", "First Name is required").not().isEmpty(),
			check("lastname", "Last Name is required").not().isEmpty(),
			check("cellphone", "Cellphone is required").not().isEmpty(),
			check("telephone", "Telephone is required").not().isEmpty(),
			check("address", "Address is required").not().isEmpty(),
			check("postcode", "Postcode is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			firstname,
			lastname,
			cellphone,
			telephone,
			address,
			postcode,
		} = req.body;
		const addressFields = {
			buyer: req.user.id,
			firstname,
			lastname,
			cellphone,
			telephone,
			address,
			postcode,
		};

		try {
			const buyer = await Buyer.findOne({ _id: req.user.id });
			if (!buyer) {
				return res.status(404).json({ msg: "Account not found" });
			}

			const newAdd = new Address(addressFields);

			buyer.addresses.push({ address: newAdd._id });

			buyer.billingaddress.empty = false;
			buyer.billingaddress.address = newAdd._id;
			newAdd.billingaddress = true;

			await newAdd.save();
			await buyer.save();

			res.json(buyer.billingaddress);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

// @route POST api/users/buyer/shippingaddress
// @desc Add shipping address
// @access Private
router.post(
	"/buyer/address/shippingaddress",
	[
		auth,
		[
			check("firstname", "First Name is required").not().isEmpty(),
			check("lastname", "Last Name is required").not().isEmpty(),
			check("cellphone", "Cellphone is required").not().isEmpty(),
			check("telephone", "Telephone is required").not().isEmpty(),
			check("address", "Address is required").not().isEmpty(),
			check("postcode", "Postcode is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			firstname,
			lastname,
			cellphone,
			telephone,
			address,
			postcode,
		} = req.body;
		const addressFields = {
			buyer: req.user.id,
			firstname,
			lastname,
			cellphone,
			telephone,
			address,
			postcode,
		};

		try {
			const buyer = await Buyer.findOne({ _id: req.user.id });
			if (!buyer) {
				return res.status(404).json({ msg: "Account not found" });
			}

			const newAdd = new Address(addressFields);

			buyer.addresses.push({ address: newAdd._id });

			buyer.shippingaddress.empty = false;
			buyer.shippingaddress.address = newAdd._id;
			newAdd.shippingaddress = true;

			await newAdd.save();
			await buyer.save();

			res.json(buyer.shippingaddress);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

// @route PUT api/users/buyer/shippingaddress/:addres_id
// @desc Change shipping address
// @access Private
router.put("/buyer/shippingaddress/:address_id", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({ _id: req.user.id });
		if (!buyer) {
			return res.status(404).json({ msg: "Account not found" });
		}

		const address = await Address.findOne({ _id: req.params.address_id });
		if (!address) {
			return res.status(404).json({ msg: "Address not found" });
		}

		const oldAddress = await Address.findOne({
			_id: buyer.shippingaddress.address,
		});
		oldAddress.shippingaddress = false;
		await oldAddress.save();

		buyer.shippingaddress.address = address._id;
		address.shippingaddress = true;
		await buyer.save();
		await address.save();
		res.json(buyer.shippingaddress);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Address not found" });
		}
		res.status(500).send("Server error");
	}
});

// @route PUT api/users/buyer/billingaddress/:address_id
// @desc Change billing address
// @access Private
router.put("/buyer/billingaddress/:address_id", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({ _id: req.user.id });
		if (!buyer) {
			return res.status(404).json({ msg: "Account not found" });
		}

		const address = await Address.findOne({ _id: req.params.address_id });
		if (!address) {
			return res.status(404).json({ msg: "Address not found" });
		}

		const oldAddress = await Address.findOne({
			_id: buyer.billingaddress.address,
		});
		oldAddress.billingaddress = false;
		await oldAddress.save();

		buyer.billingaddress.address = address._id;
		address.billingaddress = true;
		await buyer.save();
		await address.save();
		res.json(buyer.billingaddress);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Address not found" });
		}
		res.status(500).send("Server error");
	}
});

// @route PUT api/users/buyer/address/:address_id
// @desc Update users address
// @access Private
router.put(
	"/buyer/address/:address_id",
	[
		auth,
		[
			check("firstname", "First Name is required").not().isEmpty(),
			check("lastname", "Last Name is required").not().isEmpty(),
			check("cellphone", "Cellphone is required").not().isEmpty(),
			check("telephone", "Telephone is required").not().isEmpty(),
			check("address", "Address is required").not().isEmpty(),
			check("postcode", "Postcode is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			firstname,
			lastname,
			cellphone,
			telephone,
			address,
			postcode,
		} = req.body;
		const addressFields = {
			buyer: req.user.id,
			firstname,
			lastname,
			cellphone,
			telephone,
			address,
			postcode,
		};

		try {
			const buyer = await Buyer.findOne({ _id: req.user.id });
			if (!buyer) {
				return res.status(404).json({ msg: "Account not found" });
			}

			let oldAddress = await Address.findOne({ _id: req.params.address_id });
			if (!oldAddress) {
				return res.status(404).json({ msg: "Address not found" });
			}

			if (oldAddress.buyer.toString() !== req.user.id) {
				return res.status(401).json({ msg: "User is not authorised" });
			}

			//Update
			oldAddress = await Address.findOneAndUpdate(
				{ _id: req.params.address_id },
				{ $set: addressFields },
				{ new: true }
			);
			await oldAddress.save();

			res.json(buyer.addresses);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

// @route GET api/users/buyer/address
// @desc Get all users addresses
// @access Private
router.get("/buyer/address", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({ _id: req.user.id });
		if (!buyer) {
			return res.status(404).json({ msg: "Account not found" });
		}
		let addresses = buyer.addresses;
		const addressesArray = [];
		addresses.forEach((address) =>
			addressesArray.push(Address.findOne({ _id: address.address }))
		);
		addresses = await Promise.all(addressesArray);
		res.json(addresses);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error");
	}
});

// @route DELETE api/users/buyer/address/:address_id
// @desc Delete users address
// @access Private
router.delete("/buyer/address/:address_id", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({ _id: req.user.id });
		if (!buyer) {
			return res.status(404).json({ msg: "Account not found" });
		}
		if (
			buyer.addresses.filter(
				(address) => address.address.toString() === req.params.address_id
			).length === 0
		) {
			return res.status(404).json({ msg: "Address not found" });
		}

		const removeIndex = buyer.addresses
			.map((address) => address.address.toString())
			.indexOf(req.params.address_id);

		await Address.findOneAndRemove({
			_id: buyer.addresses[removeIndex].address,
		});

		buyer.addresses.splice(removeIndex, 1);
		await buyer.save();

		res.json(buyer.addresses);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Address not found" });
		}
		res.status(500).send("Server error");
	}
});

module.exports = router;
