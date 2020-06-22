const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const uploadImage = require('../../utils/uploadImage');
const aws = require('aws-sdk');
const sharp = require('sharp');

const Buyer = require('../../model/Buyer');
const Seller = require('../../model/Seller');
const Address = require('../../model/Address');
const Item = require('../../model/Item');

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

// @route PUT api/users/seller
// @desc Update logged in sellers account
// @access Private
router.put(
	"/seller",
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

		const { name, email } = req.body;
		let { password } = req.body;

		try {
			let user = await Seller.findOne({ _id: req.user.id });

			if (user) {
				//Update
				const salt = await bcrypt.genSalt(10);
				password = await bcrypt.hash(password, salt);

				user = await Seller.findOneAndUpdate(
					{ _id: req.user.id },
					{ $set: { name: name, email: email, password: password } },
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

// @route PUT api/users/buyer/shippingaddress/:address_id
// @desc Change shipping address
// @access Private
router.put("/buyer/shippingaddress/:address_id", auth, async (req, res) => {
	try {
		const buyer = await Buyer.findOne({ _id: req.user.id });
		if (!buyer) {
			return res.status(404).json({ msg: "Account not found" });
		}

		const address = await Address.findOne({ _id: req.params.address_id });
		if (!address || address.buyer.toString() !== req.user.id) {
			return res.status(404).json({ msg: "Address not found" });
		}

		const oldAddress = await Address.findOne({
			_id: buyer.shippingaddress.address,
		});

		if (oldAddress.id === address.id) {
			res.json(buyer.shippingaddress);
		} else {
			oldAddress.shippingaddress = false;
			await oldAddress.save();

			buyer.shippingaddress.address = address._id;
			address.shippingaddress = true;
			await buyer.save();
			await address.save();
			res.json(buyer.shippingaddress);
		}
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
		if (!address || address.buyer.toString() !== req.user.id) {
			return res.status(404).json({ msg: "Address not found" });
		}

		const oldAddress = await Address.findOne({
			_id: buyer.billingaddress.address,
		});
		if (oldAddress.id === address.id) {
			res.json(buyer.billingaddress);
		} else {
			oldAddress.billingaddress = false;
			await oldAddress.save();

			buyer.billingaddress.address = address._id;
			address.billingaddress = true;
			await buyer.save();
			await address.save();
			res.json(buyer.billingaddress);
		}
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
		if (
			buyer.shippingaddress.address.toString() === req.params.address_id ||
			buyer.billingaddress.address.toString() === req.params.address_id
		) {
			return res.status(400).json({ msg: "Bad request" });
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

// @route POST api/users/seller/profile_pict
// @desc Add or update profile pict
// @access Private
router.post('/seller/profile_pict', auth, async (req, res) => {
  try {
    const seller = await Seller.findOne({ _id: req.user.id });
    if (!seller) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    uploadImage(req, res, err => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      } else {
        if (!req.files.profileImage) {
          return res.status(400).json({ msg: 'No file selected!' });
        } else {
          const s3 = new aws.S3();
          s3.getObject({
            Bucket: config.get('s3bucket'),
            Key: req.files.profileImage[0].key,
          })
            .promise()
            .then(data =>
              sharp(data.Body)
                .resize(200, 200)
                .withMetadata()
                .toFormat('jpeg', { quality: 80 })
                .toBuffer()
            )
            .then(buffer =>
              s3
                .putObject({
                  Body: buffer,
                  Bucket: config.get('s3bucket'),
                  ContentType: 'image/jpeg',
                  Key:
                    req.files.profileImage[0].key.slice(-4) === 'jpeg'
                      ? req.files.profileImage[0].key.slice(
                          0,
                          req.files.profileImage[0].key.length - 5
                        ) + 'Updated.jpeg'
                      : req.files.profileImage[0].key.slice(
                          0,
                          req.files.profileImage[0].key.length - 4
                        ) + 'Updated.jpeg',
                  ACL: 'public-read',
                })
                .promise()
            )
            .then(() => {
              seller.image =
                `https://${config.get(
                  's3bucket'
                )}.s3-ap-southeast-1.amazonaws.com/` +
                (req.files.profileImage[0].key.slice(-4) === 'jpeg'
                  ? req.files.profileImage[0].key.slice(
                      0,
                      req.files.profileImage[0].key.length - 5
                    ) + 'Updated.jpeg'
                  : req.files.profileImage[0].key.slice(
                      0,
                      req.files.profileImage[0].key.length - 4
                    ) + 'Updated.jpeg');
              seller.save(function (err, seller) {
                if (err) {
                  console.log(err.message);
                  return console.error(err);
                }
                res.json(seller);
              });
            })
            .catch(err => {
              if (err.code === 'NoSuchKey') err.message = 'Image not found';
              console.log(err.message);
              return res.status(500).send('Server error');
            });
        }
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/users/seller/item
// @desc Add item to sell
// @access Private
// Remind sellers that pic must be of certain dimensions!
router.post(
  '/seller/item',
  [
    auth,
    uploadImage,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('brand', 'Brand is required').not().isEmpty(),
      check('price', 'Price is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { size1, size2, size3, size4, size5, size6, size7, size8 } = req.body;

    const {
      title,
      category,
      brand,
      desc,
      price,
      outofstock,
      size1chest,
      size1waist,
      size1bl,
      size1hip,
      size1tl,
      size1bust,
      size1sl,
      size2chest,
      size2waist,
      size2bl,
      size2hip,
      size2tl,
      size2bust,
      size2sl,
      size3chest,
      size3waist,
      size3bl,
      size3hip,
      size3tl,
      size3bust,
      size3sl,
      size4chest,
      size4waist,
      size4bl,
      size4hip,
      size4tl,
      size4bust,
      size4sl,
      size5chest,
      size5waist,
      size5bl,
      size5hip,
      size5tl,
      size5bust,
      size5sl,
      size6chest,
      size6waist,
      size6bl,
      size6hip,
      size6tl,
      size6bust,
      size6sl,
      size7chest,
      size7waist,
      size7bl,
      size7hip,
      size7tl,
      size7bust,
      size7sl,
      size8chest,
      size8waist,
      size8bl,
      size8hip,
      size8tl,
      size8bust,
      size8sl,
    } = req.body;

    const size1Array = [
      size1chest,
      size1bl,
      size1waist,
      size1hip,
      size1tl,
      size1bust,
      size1sl,
    ];
    const size2Array = [
      size2chest,
      size2bl,
      size2waist,
      size2hip,
      size2tl,
      size2bust,
      size2sl,
    ];
    const size3Array = [
      size3chest,
      size3bl,
      size3waist,
      size3hip,
      size3tl,
      size3bust,
      size3sl,
    ];
    const size4Array = [
      size4chest,
      size4bl,
      size4waist,
      size4hip,
      size4tl,
      size4bust,
      size4sl,
    ];
    const size5Array = [
      size5chest,
      size5bl,
      size5waist,
      size5hip,
      size5tl,
      size5bust,
      size5sl,
    ];
    const size6Array = [
      size6chest,
      size6bl,
      size6waist,
      size6hip,
      size6tl,
      size6bust,
      size6sl,
    ];
    const size7Array = [
      size7chest,
      size7bl,
      size7waist,
      size7hip,
      size7tl,
      size7bust,
      size7sl,
    ];
    const size8Array = [
      size8chest,
      size8bl,
      size8waist,
      size8hip,
      size8tl,
      size8bust,
      size8sl,
    ];

    if (size1) {
      size1 = {
        size: size1,
        chest: size1Array[0]
          ? size1Array[0].split('-').map(size => size.trim()).length > 1
            ? {
                from: size1Array[0].split('-').map(size => size.trim())[0],
                to: size1Array[0].split('-').map(size => size.trim())[1],
              }
            : {
                from: size1Array[0].trim(),
                to: size1Array[0].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bodylength: size1Array[1]
          ? size1Array[1].split('-').map(size => size.trim()).length > 1
            ? {
                from: size1Array[1].split('-').map(size => size.trim())[0],
                to: size1Array[1].split('-').map(size => size.trim())[1],
              }
            : {
                from: size1Array[1].trim(),
                to: size1Array[1].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        waist: size1Array[2]
          ? size1Array[2].split('-').map(size => size.trim()).length > 1
            ? {
                from: size1Array[2].split('-').map(size => size.trim())[0],
                to: size1Array[2].split('-').map(size => size.trim())[1],
              }
            : {
                from: size1Array[2].trim(),
                to: size1Array[2].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        hip: size1Array[3]
          ? size1Array[3].split('-').map(size => size.trim()).length > 1
            ? {
                from: size1Array[3].split('-').map(size => size.trim())[0],
                to: size1Array[3].split('-').map(size => size.trim())[1],
              }
            : {
                from: size1Array[3].trim(),
                to: size1Array[3].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        totallength: size1Array[4]
          ? size1Array[4].split('-').map(size => size.trim()).length > 1
            ? {
                from: size1Array[4].split('-').map(size => size.trim())[0],
                to: size1Array[4].split('-').map(size => size.trim())[1],
              }
            : {
                from: size1Array[4].trim(),
                to: size1Array[4].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bust: size1Array[5]
          ? size1Array[5].split('-').map(size => size.trim()).length > 1
            ? {
                from: size1Array[5].split('-').map(size => size.trim())[0],
                to: size1Array[5].split('-').map(size => size.trim())[1],
              }
            : {
                from: size1Array[5].trim(),
                to: size1Array[5].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        skirtlength: size1Array[6]
          ? size1Array[6].split('-').map(size => size.trim()).length > 1
            ? {
                from: size1Array[6].split('-').map(size => size.trim())[0],
                to: size1Array[6].split('-').map(size => size.trim())[1],
              }
            : {
                from: size1Array[6].trim(),
                to: size1Array[6].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
      };
    }

    if (size2) {
      size2 = {
        size: size2,
        chest: size2Array[0]
          ? size2Array[0].split('-').map(size => size.trim()).length > 1
            ? {
                from: size2Array[0].split('-').map(size => size.trim())[0],
                to: size2Array[0].split('-').map(size => size.trim())[1],
              }
            : {
                from: size2Array[0].trim(),
                to: size2Array[0].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bodylength: size2Array[1]
          ? size2Array[1].split('-').map(size => size.trim()).length > 1
            ? {
                from: size2Array[1].split('-').map(size => size.trim())[0],
                to: size2Array[1].split('-').map(size => size.trim())[1],
              }
            : {
                from: size2Array[1].trim(),
                to: size2Array[1].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        waist: size2Array[2]
          ? size2Array[2].split('-').map(size => size.trim()).length > 1
            ? {
                from: size2Array[2].split('-').map(size => size.trim())[0],
                to: size2Array[2].split('-').map(size => size.trim())[1],
              }
            : {
                from: size2Array[2].trim(),
                to: size2Array[2].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        hip: size2Array[3]
          ? size2Array[3].split('-').map(size => size.trim()).length > 1
            ? {
                from: size2Array[3].split('-').map(size => size.trim())[0],
                to: size2Array[3].split('-').map(size => size.trim())[1],
              }
            : {
                from: size2Array[3].trim(),
                to: size2Array[3].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        totallength: size2Array[4]
          ? size2Array[4].split('-').map(size => size.trim()).length > 1
            ? {
                from: size2Array[4].split('-').map(size => size.trim())[0],
                to: size2Array[4].split('-').map(size => size.trim())[1],
              }
            : {
                from: size2Array[4].trim(),
                to: size2Array[4].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bust: size2Array[5]
          ? size2Array[5].split('-').map(size => size.trim()).length > 1
            ? {
                from: size2Array[5].split('-').map(size => size.trim())[0],
                to: size2Array[5].split('-').map(size => size.trim())[1],
              }
            : {
                from: size2Array[5].trim(),
                to: size2Array[5].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        skirtlength: size2Array[6]
          ? size2Array[6].split('-').map(size => size.trim()).length > 1
            ? {
                from: size2Array[6].split('-').map(size => size.trim())[0],
                to: size2Array[6].split('-').map(size => size.trim())[1],
              }
            : {
                from: size2Array[6].trim(),
                to: size2Array[6].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
      };
    }

    if (size3) {
      size3 = {
        size: size3,
        chest: size3Array[0]
          ? size3Array[0].split('-').map(size => size.trim()).length > 1
            ? {
                from: size3Array[0].split('-').map(size => size.trim())[0],
                to: size3Array[0].split('-').map(size => size.trim())[1],
              }
            : {
                from: size3Array[0].trim(),
                to: size3Array[0].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bodylength: size3Array[1]
          ? size3Array[1].split('-').map(size => size.trim()).length > 1
            ? {
                from: size3Array[1].split('-').map(size => size.trim())[0],
                to: size3Array[1].split('-').map(size => size.trim())[1],
              }
            : {
                from: size3Array[1].trim(),
                to: size3Array[1].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        waist: size3Array[2]
          ? size3Array[2].split('-').map(size => size.trim()).length > 1
            ? {
                from: size3Array[2].split('-').map(size => size.trim())[0],
                to: size3Array[2].split('-').map(size => size.trim())[1],
              }
            : {
                from: size3Array[2].trim(),
                to: size3Array[2].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        hip: size3Array[3]
          ? size3Array[3].split('-').map(size => size.trim()).length > 1
            ? {
                from: size3Array[3].split('-').map(size => size.trim())[0],
                to: size3Array[3].split('-').map(size => size.trim())[1],
              }
            : {
                from: size3Array[3].trim(),
                to: size3Array[3].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        totallength: size3Array[4]
          ? size3Array[4].split('-').map(size => size.trim()).length > 1
            ? {
                from: size3Array[4].split('-').map(size => size.trim())[0],
                to: size3Array[4].split('-').map(size => size.trim())[1],
              }
            : {
                from: size3Array[4].trim(),
                to: size3Array[4].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bust: size3Array[5]
          ? size3Array[5].split('-').map(size => size.trim()).length > 1
            ? {
                from: size3Array[5].split('-').map(size => size.trim())[0],
                to: size3Array[5].split('-').map(size => size.trim())[1],
              }
            : {
                from: size3Array[5].trim(),
                to: size3Array[5].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        skirtlength: size3Array[6]
          ? size3Array[6].split('-').map(size => size.trim()).length > 1
            ? {
                from: size3Array[6].split('-').map(size => size.trim())[0],
                to: size3Array[6].split('-').map(size => size.trim())[1],
              }
            : {
                from: size3Array[6].trim(),
                to: size3Array[6].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
      };
    }

    if (size4) {
      size4 = {
        size: size4,
        chest: size4Array[0]
          ? size4Array[0].split('-').map(size => size.trim()).length > 1
            ? {
                from: size4Array[0].split('-').map(size => size.trim())[0],
                to: size4Array[0].split('-').map(size => size.trim())[1],
              }
            : {
                from: size4Array[0].trim(),
                to: size4Array[0].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bodylength: size4Array[1]
          ? size4Array[1].split('-').map(size => size.trim()).length > 1
            ? {
                from: size4Array[1].split('-').map(size => size.trim())[0],
                to: size4Array[1].split('-').map(size => size.trim())[1],
              }
            : {
                from: size4Array[1].trim(),
                to: size4Array[1].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        waist: size4Array[2]
          ? size4Array[2].split('-').map(size => size.trim()).length > 1
            ? {
                from: size4Array[2].split('-').map(size => size.trim())[0],
                to: size4Array[2].split('-').map(size => size.trim())[1],
              }
            : {
                from: size4Array[2].trim(),
                to: size4Array[2].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        hip: size4Array[3]
          ? size4Array[3].split('-').map(size => size.trim()).length > 1
            ? {
                from: size4Array[3].split('-').map(size => size.trim())[0],
                to: size4Array[3].split('-').map(size => size.trim())[1],
              }
            : {
                from: size4Array[3].trim(),
                to: size4Array[3].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        totallength: size4Array[4]
          ? size4Array[4].split('-').map(size => size.trim()).length > 1
            ? {
                from: size4Array[4].split('-').map(size => size.trim())[0],
                to: size4Array[4].split('-').map(size => size.trim())[1],
              }
            : {
                from: size4Array[4].trim(),
                to: size4Array[4].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bust: size4Array[5]
          ? size4Array[5].split('-').map(size => size.trim()).length > 1
            ? {
                from: size4Array[5].split('-').map(size => size.trim())[0],
                to: size4Array[5].split('-').map(size => size.trim())[1],
              }
            : {
                from: size4Array[5].trim(),
                to: size4Array[5].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        skirtlength: size4Array[6]
          ? size4Array[6].split('-').map(size => size.trim()).length > 1
            ? {
                from: size4Array[6].split('-').map(size => size.trim())[0],
                to: size4Array[6].split('-').map(size => size.trim())[1],
              }
            : {
                from: size4Array[6].trim(),
                to: size4Array[6].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
      };
    }

    if (size5) {
      size5 = {
        size: size5,
        chest: size5Array[0]
          ? size5Array[0].split('-').map(size => size.trim()).length > 1
            ? {
                from: size5Array[0].split('-').map(size => size.trim())[0],
                to: size5Array[0].split('-').map(size => size.trim())[1],
              }
            : {
                from: size5Array[0].trim(),
                to: size5Array[0].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bodylength: size5Array[1]
          ? size5Array[1].split('-').map(size => size.trim()).length > 1
            ? {
                from: size5Array[1].split('-').map(size => size.trim())[0],
                to: size5Array[1].split('-').map(size => size.trim())[1],
              }
            : {
                from: size5Array[1].trim(),
                to: size5Array[1].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        waist: size5Array[2]
          ? size5Array[2].split('-').map(size => size.trim()).length > 1
            ? {
                from: size5Array[2].split('-').map(size => size.trim())[0],
                to: size5Array[2].split('-').map(size => size.trim())[1],
              }
            : {
                from: size5Array[2].trim(),
                to: size5Array[2].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        hip: size5Array[3]
          ? size5Array[3].split('-').map(size => size.trim()).length > 1
            ? {
                from: size5Array[3].split('-').map(size => size.trim())[0],
                to: size5Array[3].split('-').map(size => size.trim())[1],
              }
            : {
                from: size5Array[3].trim(),
                to: size5Array[3].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        totallength: size5Array[4]
          ? size5Array[4].split('-').map(size => size.trim()).length > 1
            ? {
                from: size5Array[4].split('-').map(size => size.trim())[0],
                to: size5Array[4].split('-').map(size => size.trim())[1],
              }
            : {
                from: size5Array[4].trim(),
                to: size5Array[4].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bust: size5Array[5]
          ? size5Array[5].split('-').map(size => size.trim()).length > 1
            ? {
                from: size5Array[5].split('-').map(size => size.trim())[0],
                to: size5Array[5].split('-').map(size => size.trim())[1],
              }
            : {
                from: size5Array[5].trim(),
                to: size5Array[5].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        skirtlength: size5Array[6]
          ? size5Array[6].split('-').map(size => size.trim()).length > 1
            ? {
                from: size5Array[6].split('-').map(size => size.trim())[0],
                to: size5Array[6].split('-').map(size => size.trim())[1],
              }
            : {
                from: size5Array[6].trim(),
                to: size5Array[6].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
      };
    }

    if (size6) {
      size6 = {
        size: size6,
        chest: size6Array[0]
          ? size6Array[0].split('-').map(size => size.trim()).length > 1
            ? {
                from: size6Array[0].split('-').map(size => size.trim())[0],
                to: size6Array[0].split('-').map(size => size.trim())[1],
              }
            : {
                from: size6Array[0].trim(),
                to: size6Array[0].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bodylength: size6Array[1]
          ? size6Array[1].split('-').map(size => size.trim()).length > 1
            ? {
                from: size6Array[1].split('-').map(size => size.trim())[0],
                to: size6Array[1].split('-').map(size => size.trim())[1],
              }
            : {
                from: size6Array[1].trim(),
                to: size6Array[1].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        waist: size6Array[2]
          ? size6Array[2].split('-').map(size => size.trim()).length > 1
            ? {
                from: size6Array[2].split('-').map(size => size.trim())[0],
                to: size6Array[2].split('-').map(size => size.trim())[1],
              }
            : {
                from: size6Array[2].trim(),
                to: size6Array[2].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        hip: size6Array[3]
          ? size6Array[3].split('-').map(size => size.trim()).length > 1
            ? {
                from: size6Array[3].split('-').map(size => size.trim())[0],
                to: size6Array[3].split('-').map(size => size.trim())[1],
              }
            : {
                from: size6Array[3].trim(),
                to: size6Array[3].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        totallength: size6Array[4]
          ? size6Array[4].split('-').map(size => size.trim()).length > 1
            ? {
                from: size6Array[4].split('-').map(size => size.trim())[0],
                to: size6Array[4].split('-').map(size => size.trim())[1],
              }
            : {
                from: size6Array[4].trim(),
                to: size6Array[4].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bust: size6Array[5]
          ? size6Array[5].split('-').map(size => size.trim()).length > 1
            ? {
                from: size6Array[5].split('-').map(size => size.trim())[0],
                to: size6Array[5].split('-').map(size => size.trim())[1],
              }
            : {
                from: size6Array[5].trim(),
                to: size6Array[5].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        skirtlength: size6Array[6]
          ? size6Array[6].split('-').map(size => size.trim()).length > 1
            ? {
                from: size6Array[6].split('-').map(size => size.trim())[0],
                to: size6Array[6].split('-').map(size => size.trim())[1],
              }
            : {
                from: size6Array[6].trim(),
                to: size6Array[6].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
      };
    }

    if (size7) {
      size7 = {
        size: size7,
        chest: size7Array[0]
          ? size7Array[0].split('-').map(size => size.trim()).length > 1
            ? {
                from: size7Array[0].split('-').map(size => size.trim())[0],
                to: size7Array[0].split('-').map(size => size.trim())[1],
              }
            : {
                from: size7Array[0].trim(),
                to: size7Array[0].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bodylength: size7Array[1]
          ? size7Array[1].split('-').map(size => size.trim()).length > 1
            ? {
                from: size7Array[1].split('-').map(size => size.trim())[0],
                to: size7Array[1].split('-').map(size => size.trim())[1],
              }
            : {
                from: size7Array[1].trim(),
                to: size7Array[1].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        waist: size7Array[2]
          ? size7Array[2].split('-').map(size => size.trim()).length > 1
            ? {
                from: size7Array[2].split('-').map(size => size.trim())[0],
                to: size7Array[2].split('-').map(size => size.trim())[1],
              }
            : {
                from: size7Array[2].trim(),
                to: size7Array[2].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        hip: size7Array[3]
          ? size7Array[3].split('-').map(size => size.trim()).length > 1
            ? {
                from: size7Array[3].split('-').map(size => size.trim())[0],
                to: size7Array[3].split('-').map(size => size.trim())[1],
              }
            : {
                from: size7Array[3].trim(),
                to: size7Array[3].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        totallength: size7Array[4]
          ? size7Array[4].split('-').map(size => size.trim()).length > 1
            ? {
                from: size7Array[4].split('-').map(size => size.trim())[0],
                to: size7Array[4].split('-').map(size => size.trim())[1],
              }
            : {
                from: size7Array[4].trim(),
                to: size7Array[4].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bust: size7Array[5]
          ? size7Array[5].split('-').map(size => size.trim()).length > 1
            ? {
                from: size7Array[5].split('-').map(size => size.trim())[0],
                to: size7Array[5].split('-').map(size => size.trim())[1],
              }
            : {
                from: size7Array[5].trim(),
                to: size7Array[5].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        skirtlength: size7Array[6]
          ? size7Array[6].split('-').map(size => size.trim()).length > 1
            ? {
                from: size7Array[6].split('-').map(size => size.trim())[0],
                to: size7Array[6].split('-').map(size => size.trim())[1],
              }
            : {
                from: size7Array[6].trim(),
                to: size7Array[6].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
      };
    }

    if (size8) {
      size8 = {
        size: size8,
        chest: size8Array[0]
          ? size8Array[0].split('-').map(size => size.trim()).length > 1
            ? {
                from: size8Array[0].split('-').map(size => size.trim())[0],
                to: size8Array[0].split('-').map(size => size.trim())[1],
              }
            : {
                from: size8Array[0].trim(),
                to: size8Array[0].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bodylength: size8Array[1]
          ? size8Array[1].split('-').map(size => size.trim()).length > 1
            ? {
                from: size8Array[1].split('-').map(size => size.trim())[0],
                to: size8Array[1].split('-').map(size => size.trim())[1],
              }
            : {
                from: size8Array[1].trim(),
                to: size8Array[1].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        waist: size8Array[2]
          ? size8Array[2].split('-').map(size => size.trim()).length > 1
            ? {
                from: size8Array[2].split('-').map(size => size.trim())[0],
                to: size8Array[2].split('-').map(size => size.trim())[1],
              }
            : {
                from: size8Array[2].trim(),
                to: size8Array[2].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        hip: size8Array[3]
          ? size8Array[3].split('-').map(size => size.trim()).length > 1
            ? {
                from: size8Array[3].split('-').map(size => size.trim())[0],
                to: size8Array[3].split('-').map(size => size.trim())[1],
              }
            : {
                from: size8Array[3].trim(),
                to: size8Array[3].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        totallength: size8Array[4]
          ? size8Array[4].split('-').map(size => size.trim()).length > 1
            ? {
                from: size8Array[4].split('-').map(size => size.trim())[0],
                to: size8Array[4].split('-').map(size => size.trim())[1],
              }
            : {
                from: size8Array[4].trim(),
                to: size8Array[4].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        bust: size8Array[5]
          ? size8Array[5].split('-').map(size => size.trim()).length > 1
            ? {
                from: size8Array[5].split('-').map(size => size.trim())[0],
                to: size8Array[5].split('-').map(size => size.trim())[1],
              }
            : {
                from: size8Array[5].trim(),
                to: size8Array[5].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
        skirtlength: size8Array[6]
          ? size8Array[6].split('-').map(size => size.trim()).length > 1
            ? {
                from: size8Array[6].split('-').map(size => size.trim())[0],
                to: size8Array[6].split('-').map(size => size.trim())[1],
              }
            : {
                from: size8Array[6].trim(),
                to: size8Array[6].trim(),
              }
          : {
              from: -1,
              to: -1,
            },
      };
    }

    const itemFields = {};
    itemFields.title = title;
    itemFields.category = category;
    itemFields.brand = brand;
    itemFields.price = price;
    if (desc) itemFields.desc = desc;
    if (outofstock) {
      itemFields.outofstock = outofstock.split(',').map(size => size.trim());
    }

    itemFields.sizes = [];
    if (size1) {
      itemFields.sizes.push(size1);
    }
    if (size2) {
      itemFields.sizes.push(size2);
    }
    if (size3) {
      itemFields.sizes.push(size3);
    }
    if (size4) {
      itemFields.sizes.push(size4);
    }
    if (size5) {
      itemFields.sizes.push(size5);
    }
    if (size6) {
      itemFields.sizes.push(size6);
    }
    if (size7) {
      itemFields.sizes.push(size7);
    }
    if (size8) {
      itemFields.sizes.push(size8);
    }

    try {
      const seller = await Seller.findOne({ _id: req.user.id });
      if (!seller) {
        return res.status(404).json({ msg: 'Account not found' });
      }
      if (!req.files.itemImages) {
        return res.status(400).json({ msg: 'Please provide item images' });
      }

      const promiseArray = [];
      const s3 = new aws.S3();

      const sizechart = [];
      if (req.files.sizeChart) {
        req.files.sizeChart.forEach(sc => {
          if (sc.key.slice(-4) === 'jpeg') {
            promiseArray.push(
              s3
                .getObject({
                  Bucket: config.get('s3bucket'),
                  Key: sc.key,
                })
                .promise()
                .then(data =>
                  sharp(data.Body)
                    .rotate()
                    .resize(600, 200)
                    .toFormat('jpeg', { quality: 90 })
                    .toBuffer()
                )
                .then(buffer =>
                  s3
                    .putObject({
                      Body: buffer,
                      Bucket: config.get('s3bucket'),
                      ContentType: 'image/jpeg',
                      Key:
                        sc.key.slice(-4) === 'jpeg'
                          ? sc.key.slice(0, sc.key.length - 5) + 'Updated.jpeg'
                          : sc.key.slice(0, sc.key.length - 4) + 'Updated.jpeg',
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  sizechart.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/` +
                      (sc.key.slice(-4) === 'jpeg'
                        ? sc.key.slice(0, sc.key.length - 5) + 'Updated.jpeg'
                        : sc.key.slice(0, sc.key.length - 4) + 'Updated.jpeg')
                  );
                })
                .catch(err => {
                  if (err.code === 'NoSuchKey') err.message = 'Image not found';
                  console.log(err.message);
                  return res.status(500).send('Server error');
                })
            );
          } else {
            promiseArray.push(
              s3
                .getObject({
                  Bucket: config.get('s3bucket'),
                  Key: sc.key,
                })
                .promise()
                .then(data =>
                  sharp(data.Body)
                    .resize(600, 200)
                    .withMetadata()
                    .toFormat('jpeg', { quality: 90 })
                    .toBuffer()
                )
                .then(buffer =>
                  s3
                    .putObject({
                      Body: buffer,
                      Bucket: config.get('s3bucket'),
                      ContentType: 'image/jpeg',
                      Key:
                        sc.key.slice(-4) === 'jpeg'
                          ? sc.key.slice(0, sc.key.length - 5) + 'Updated.jpeg'
                          : sc.key.slice(0, sc.key.length - 4) + 'Updated.jpeg',
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  sizechart.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/` +
                      (sc.key.slice(-4) === 'jpeg'
                        ? sc.key.slice(0, sc.key.length - 5) + 'Updated.jpeg'
                        : sc.key.slice(0, sc.key.length - 4) + 'Updated.jpeg')
                  );
                })
                .catch(err => {
                  if (err.code === 'NoSuchKey') err.message = 'Image not found';
                  console.log(err.message);
                  return res.status(500).send('Server error');
                })
            );
          }
        });
      }

      const images = [];
      req.files.itemImages.forEach(image => {
        if (image.key.slice(-4) === 'jpeg') {
          promiseArray.push(
            s3
              .getObject({
                Bucket: config.get('s3bucket'),
                Key: image.key,
              })
              .promise()
              .then(data =>
                sharp(data.Body)
                  .rotate()
                  .resize(250, 600)
                  .toFormat('jpeg', { quality: 90 })
                  .toBuffer()
              )
              .then(buffer =>
                s3
                  .putObject({
                    Body: buffer,
                    Bucket: config.get('s3bucket'),
                    ContentType: 'image/jpeg',
                    Key:
                      image.key.slice(-4) === 'jpeg'
                        ? image.key.slice(0, image.key.length - 5) +
                          'Updated.jpeg'
                        : image.key.slice(0, image.key.length - 4) +
                          'Updated.jpeg',
                    ACL: 'public-read',
                  })
                  .promise()
              )
              .then(() => {
                images.push(
                  `https://${config.get(
                    's3bucket'
                  )}.s3-ap-southeast-1.amazonaws.com/` +
                    (image.key.slice(-4) === 'jpeg'
                      ? image.key.slice(0, image.key.length - 5) +
                        'Updated.jpeg'
                      : image.key.slice(0, image.key.length - 4) +
                        'Updated.jpeg')
                );
              })
              .catch(err => {
                if (err.code === 'NoSuchKey') err.message = 'Image not found';
                console.log(err.message);
                return res.status(500).send('Server error');
              })
          );
        } else {
          promiseArray.push(
            s3
              .getObject({
                Bucket: config.get('s3bucket'),
                Key: image.key,
              })
              .promise()
              .then(data =>
                sharp(data.Body)
                  .resize(250, 600)
                  .withMetadata()
                  .toFormat('jpeg', { quality: 90 })
                  .toBuffer()
              )
              .then(buffer =>
                s3
                  .putObject({
                    Body: buffer,
                    Bucket: config.get('s3bucket'),
                    ContentType: 'image/jpeg',
                    Key:
                      image.key.slice(-4) === 'jpeg'
                        ? image.key.slice(0, image.key.length - 5) +
                          'Updated.jpeg'
                        : image.key.slice(0, image.key.length - 4) +
                          'Updated.jpeg',
                    ACL: 'public-read',
                  })
                  .promise()
              )
              .then(() => {
                images.push(
                  `https://${config.get(
                    's3bucket'
                  )}.s3-ap-southeast-1.amazonaws.com/` +
                    (image.key.slice(-4) === 'jpeg'
                      ? image.key.slice(0, image.key.length - 5) +
                        'Updated.jpeg'
                      : image.key.slice(0, image.key.length - 4) +
                        'Updated.jpeg')
                );
              })
              .catch(err => {
                if (err.code === 'NoSuchKey') err.message = 'Image not found';
                console.log(err.message);
                return res.status(500).send('Server error');
              })
          );
        }
      });

      await Promise.all(promiseArray);

      itemFields.seller = seller._id;
      itemFields.images = images;
      if (sizechart.length > 0) itemFields.sizechart = sizechart;

      const item = new Item(itemFields);

      seller.listings.push({ item: item._id });

      await item.save();
      await seller.save();
      res.json(seller.listings);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
