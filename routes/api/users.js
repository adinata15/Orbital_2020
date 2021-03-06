const express = require('express');
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
const BuyerOrder = require('../../model/BuyerOrder');
const SellerOrder = require('../../model/SellerOrder');

// @route POST api/users/buyer
// @desc Register buyer
// @access Public
router.post(
  '/buyer',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must have at least 8 characters').isLength({
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
          .json({ errors: [{ msg: 'Invalid credentials' }] });
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
        config.get('jwtSecret'),
        {
          expiresIn: config.get('tokenExpiry'),
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
  '/seller',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must have at least 8 characters').isLength({
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
          .json({ errors: [{ msg: 'Invalid credentials' }] });
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
        config.get('jwtSecret'),
        {
          expiresIn: config.get('tokenExpiry'),
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
router.get('/me', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ _id: req.user.id }).select('-password');
    const seller = await Seller.findOne({ _id: req.user.id }).select(
      '-password'
    );

    if (!buyer && !seller) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    const user = buyer ? buyer : seller;
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/users/:seller_id
// @desc Get a sellers account
// @access Public
router.get('/:seller_id', async (req, res) => {
  try {
    const seller = await Seller.findOne({ _id: req.params.seller_id });
    if (!seller) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    let listings = seller.listings;
    if (listings.length === 0) {
      return res.json({ name: seller.name, image: seller.image });
    }

    const listingsArray = [];
    listings.forEach(listing =>
      listingsArray.push(Item.findOne({ _id: listing.item }))
    );
    listings = await Promise.all(listingsArray);

    res.json({ name: seller.name, image: seller.image, listings });
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Account not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route PUT api/users/buyer
// @desc Update logged in buyers account
// @access Private
router.put(
  '/buyer',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please enter a valid email').isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      newPassword,
      newPassword2,
      height,
      weight,
      gender,
    } = req.body;

    const buyerFields = {};
    buyerFields.name = name;
    buyerFields.email = email;
    if (height) buyerFields.height = height;
    if (weight) buyerFields.weight = weight;
    if (gender) buyerFields.gender = gender;

    try {
      let user = await Buyer.findOne({ _id: req.user.id });

      if (user) {
        if (password) {
          const isMatched = await bcrypt.compare(password, user.password);

          if (!isMatched) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Invalid credentials' }] });
          }

          if (newPassword !== newPassword2) {
            return res.status(400).json({ msg: 'Passwords do not match' });
          }

          if (newPassword.length < 8) {
            return res
              .status(400)
              .json({ msg: 'Password must at least contain 8 characters' });
          }

          //Update password
          buyerFields.password = newPassword;
          const salt = await bcrypt.genSalt(10);
          buyerFields.password = await bcrypt.hash(buyerFields.password, salt);
        }
        //Update account
        user = await Buyer.findOneAndUpdate(
          { _id: req.user.id },
          { $set: buyerFields },
          { new: true }
        ).select('-password');
      }
      return res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route PUT api/users/buyer/password
// @desc Update logged in buyers password
// @access Private
// router.put(
//   '/buyer/password',
//   [
//     auth,
//     [
//       check('newPassword', 'Password must have at least 8 characters').isLength(
//         {
//           min: 8,
//         }
//       ),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { oldPassword, newPassword, newPassword2 } = req.body;

//     try {
//       let user = await Buyer.findOne({ _id: req.user.id });

//       if (user) {
//         //Verify password
//         const isMatched = await bcrypt.compare(oldPassword, user.password);

//         if (!isMatched) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'Invalid credentials' }] });
//         }

//         if (newPassword !== newPassword2) {
//           return res.status(400).json({ msg: 'Passwords do not match' });
//         }
//         //Update
//         const salt = await bcrypt.genSalt(10);
//         const password = await bcrypt.hash(newPassword, salt);

//         user = await Buyer.findOneAndUpdate(
//           { _id: req.user.id },
//           { $set: { password } },
//           { new: true }
//         ).select('-password');
//       } else {
//         return res.status(400).json({ msg: 'User not found' });
//       }
//       return res.json(user);
//     } catch (err) {
//       console.log(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// @route PUT api/users/seller
// @desc Update logged in sellers account
// @access Private
router.put(
  '/seller',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please enter a valid email').isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, newPassword, newPassword2 } = req.body;

    const sellerFields = {};
    sellerFields.name = name;
    sellerFields.email = email;

    try {
      let user = await Seller.findOne({ _id: req.user.id });

      if (user) {
        if (password) {
          const isMatched = await bcrypt.compare(password, user.password);

          if (!isMatched) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Invalid credentials' }] });
          }

          if (newPassword !== newPassword2) {
            return res.status(400).json({ msg: 'Passwords do not match' });
          }

          if (newPassword.length < 8) {
            return res
              .status(400)
              .json({ msg: 'Password must at least contain 8 characters' });
          }

          //Update password
          sellerFields.password = newPassword;
          const salt = await bcrypt.genSalt(10);
          sellerFields.password = await bcrypt.hash(
            sellerFields.password,
            salt
          );
        }
        //Update account
        user = await Seller.findOneAndUpdate(
          { _id: req.user.id },
          { $set: sellerFields },
          { new: true }
        ).select('-password');
      }
      return res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route PUT api/users/seller/password
// @desc Update logged in sellers password
// @access Private
// router.put(
//   '/seller/password',
//   [
//     auth,
//     [
//       check('newPassword', 'Password must have at least 8 characters').isLength(
//         {
//           min: 8,
//         }
//       ),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { oldPassword, newPassword, newPassword2 } = req.body;

//     try {
//       let user = await Seller.findOne({ _id: req.user.id });

//       if (user) {
//         //Verify password
//         const isMatched = await bcrypt.compare(oldPassword, user.password);

//         if (!isMatched) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'Invalid credentials' }] });
//         }

//         if (newPassword !== newPassword2) {
//           return res.status(400).json({ msg: 'Passwords do not match' });
//         }
//         //Update
//         const salt = await bcrypt.genSalt(10);
//         const password = await bcrypt.hash(newPassword, salt);

//         user = await Seller.findOneAndUpdate(
//           { _id: req.user.id },
//           { $set: { password } },
//           { new: true }
//         ).select('-password');
//       } else {
//         return res.status(400).json({ msg: 'User not found' });
//       }
//       return res.json(user);
//     } catch (err) {
//       console.log(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// @route POST api/users/buyer/address
// @desc Add address
// @access Private
router.post(
  '/buyer/address',
  [
    auth,
    [
      check('firstname', 'First Name is required').not().isEmpty(),
      check('lastname', 'Last Name is required').not().isEmpty(),
      check('cellphone', 'Cellphone is required').exists({ checkFalsy: true }),
      check('telephone', 'Telephone is required').exists({ checkFalsy: true }),
      check('address', 'Address is required').not().isEmpty(),
      check('postcode', 'Postcode is required').exists({ checkFalsy: true }),
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
        return res.status(404).json({ msg: 'Account not found' });
      }

      const newAdd = new Address(addressFields);

      buyer.addresses.push({ address: newAdd._id });

      if (buyer.billingaddress.empty && buyer.shippingaddress.empty) {
        buyer.billingaddress.empty = false;
        buyer.billingaddress.address = {
          addressid: newAdd._id,
          firstname: newAdd.firstname,
          lastname: newAdd.lastname,
          cellphone: newAdd.cellphone,
          telephone: newAdd.telephone,
          address: newAdd.address,
          postcode: newAdd.postcode,
        };
        newAdd.billingaddress = true;
        buyer.shippingaddress.empty = false;
        buyer.shippingaddress.address = {
          addressid: newAdd._id,
          firstname: newAdd.firstname,
          lastname: newAdd.lastname,
          cellphone: newAdd.cellphone,
          telephone: newAdd.telephone,
          address: newAdd.address,
          postcode: newAdd.postcode,
        };
        newAdd.shippingaddress = true;
      }
      await newAdd.save();
      await buyer.save();

      res.json(buyer.addresses);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route POST api/users/buyer/billingaddress
// @desc Add billing address
// @access Private
router.post(
  '/buyer/address/billingaddress',
  [
    auth,
    [
      check('firstname', 'First Name is required').not().isEmpty(),
      check('lastname', 'Last Name is required').not().isEmpty(),
      check('cellphone', 'Cellphone is required').exists({ checkFalsy: true }),
      check('telephone', 'Telephone is required').exists({ checkFalsy: true }),
      check('address', 'Address is required').not().isEmpty(),
      check('postcode', 'Postcode is required').exists({ checkFalsy: true }),
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
        return res.status(404).json({ msg: 'Account not found' });
      }

      const newAdd = new Address(addressFields);

      buyer.addresses.push({ address: newAdd._id });

      buyer.billingaddress.empty = false;
      buyer.billingaddress.address = {
        addressid: newAdd._id,
        firstname: newAdd.firstname,
        lastname: newAdd.lastname,
        cellphone: newAdd.cellphone,
        telephone: newAdd.telephone,
        address: newAdd.address,
        postcode: newAdd.postcode,
      };
      newAdd.billingaddress = true;

      await newAdd.save();
      await buyer.save();

      res.json(buyer.billingaddress);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route POST api/users/buyer/shippingaddress
// @desc Add shipping address
// @access Private
router.post(
  '/buyer/address/shippingaddress',
  [
    auth,
    [
      check('firstname', 'First Name is required').not().isEmpty(),
      check('lastname', 'Last Name is required').not().isEmpty(),
      check('cellphone', 'Cellphone is required').exists({ checkFalsy: true }),
      check('telephone', 'Telephone is required').exists({ checkFalsy: true }),
      check('address', 'Address is required').not().isEmpty(),
      check('postcode', 'Postcode is required').exists({ checkFalsy: true }),
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
        return res.status(404).json({ msg: 'Account not found' });
      }

      const newAdd = new Address(addressFields);

      buyer.addresses.push({ address: newAdd._id });

      buyer.shippingaddress.empty = false;
      buyer.shippingaddress.address = {
        addressid: newAdd._id,
        firstname: newAdd.firstname,
        lastname: newAdd.lastname,
        cellphone: newAdd.cellphone,
        telephone: newAdd.telephone,
        address: newAdd.address,
        postcode: newAdd.postcode,
      };
      newAdd.shippingaddress = true;

      await newAdd.save();
      await buyer.save();

      res.json(buyer.shippingaddress);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route PUT api/users/buyer/shippingaddress/:address_id
// @desc Change shipping address
// @access Private
router.put('/buyer/shippingaddress/:address_id', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ _id: req.user.id });
    if (!buyer) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    const address = await Address.findOne({ _id: req.params.address_id });
    if (!address || address.buyer.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Address not found' });
    }

    const oldAddress = await Address.findOne({
      _id: buyer.shippingaddress.address.addressid,
    });

    if (oldAddress.id === address.id) {
      res.json(buyer.shippingaddress);
    } else {
      oldAddress.shippingaddress = false;
      await oldAddress.save();

      buyer.shippingaddress.address = {
        addressid: address._id,
        firstname: address.firstname,
        lastname: address.lastname,
        cellphone: address.cellphone,
        telephone: address.telephone,
        address: address.address,
        postcode: address.postcode,
      };
      address.shippingaddress = true;
      await buyer.save();
      await address.save();
      res.json(buyer.shippingaddress);
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Address not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route PUT api/users/buyer/billingaddress/:address_id
// @desc Change billing address
// @access Private
router.put('/buyer/billingaddress/:address_id', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ _id: req.user.id });
    if (!buyer) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    const address = await Address.findOne({ _id: req.params.address_id });
    if (!address || address.buyer.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Address not found' });
    }

    const oldAddress = await Address.findOne({
      _id: buyer.billingaddress.address.addressid,
    });
    if (oldAddress.id === address.id) {
      res.json(buyer.billingaddress);
    } else {
      oldAddress.billingaddress = false;
      await oldAddress.save();

      buyer.billingaddress.address = {
        addressid: address._id,
        firstname: address.firstname,
        lastname: address.lastname,
        cellphone: address.cellphone,
        telephone: address.telephone,
        address: address.address,
        postcode: address.postcode,
      };
      address.billingaddress = true;
      await buyer.save();
      await address.save();
      res.json(buyer.billingaddress);
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Address not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route PUT api/users/buyer/address/:address_id
// @desc Update users address
// @access Private
router.put(
  '/buyer/address/:address_id',
  [
    auth,
    [
      check('firstname', 'First Name is required').not().isEmpty(),
      check('lastname', 'Last Name is required').not().isEmpty(),
      check('cellphone', 'Cellphone is required').exists({ checkFalsy: true }),
      check('telephone', 'Telephone is required').exists({ checkFalsy: true }),
      check('address', 'Address is required').not().isEmpty(),
      check('postcode', 'Postcode is required').exists({ checkFalsy: true }),
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
        return res.status(404).json({ msg: 'Account not found' });
      }

      let oldAddress = await Address.findOne({ _id: req.params.address_id });
      if (!oldAddress) {
        return res.status(404).json({ msg: 'Address not found' });
      }

      if (oldAddress.buyer.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User is not authorised' });
      }

      //Update
      oldAddress = await Address.findOneAndUpdate(
        { _id: req.params.address_id },
        { $set: addressFields },
        { new: true }
      );
      await oldAddress.save();

      if (
        buyer.billingaddress.address.addressid.toString() ===
        req.params.address_id
      ) {
        buyer.billingaddress.address.firstname = firstname;
        buyer.billingaddress.address.lastname = lastname;
        buyer.billingaddress.address.cellphone = cellphone;
        buyer.billingaddress.address.telephone = telephone;
        buyer.billingaddress.address.address = address;
        buyer.billingaddress.address.postcode = postcode;
      }

      if (
        buyer.shippingaddress.address.addressid.toString() ===
        req.params.address_id
      ) {
        buyer.shippingaddress.address.firstname = firstname;
        buyer.shippingaddress.address.lastname = lastname;
        buyer.shippingaddress.address.cellphone = cellphone;
        buyer.shippingaddress.address.telephone = telephone;
        buyer.shippingaddress.address.address = address;
        buyer.shippingaddress.address.postcode = postcode;
      }

      await buyer.save();

      res.json(buyer.addresses);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route GET api/users/buyer/address
// @desc Get all users addresses
// @access Private
router.get('/buyer/address', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ _id: req.user.id });
    if (!buyer) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    let addresses = buyer.addresses;
    const addressesArray = [];
    addresses.forEach(address =>
      addressesArray.push(Address.findOne({ _id: address.address }))
    );
    addresses = await Promise.all(addressesArray);
    res.json(addresses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route DELETE api/users/buyer/address/:address_id
// @desc Delete users address
// @access Private
router.delete('/buyer/address/:address_id', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ _id: req.user.id });
    if (!buyer) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    if (
      buyer.addresses.filter(
        address => address.address.toString() === req.params.address_id
      ).length === 0
    ) {
      return res.status(404).json({ msg: 'Address not found' });
    }
    if (
      buyer.shippingaddress.address.addressid.toString() ===
        req.params.address_id ||
      buyer.billingaddress.address.addressid.toString() ===
        req.params.address_id
    ) {
      return res.status(400).json({ msg: 'Bad request' });
    }

    const removeIndex = buyer.addresses
      .map(address => address.address.toString())
      .indexOf(req.params.address_id);

    await Address.findOneAndRemove({
      _id: buyer.addresses[removeIndex].address,
    });

    buyer.addresses.splice(removeIndex, 1);
    await buyer.save();

    res.json(buyer.addresses);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Address not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route POST api/users/seller/profile_pict
// @desc Add or update profile pict
// @access Private
// Remind sellers that pic is preferably <= 1080*1080
router.post('/seller/profile_pict', auth, async (req, res) => {
  try {
    const seller = await Seller.findOne({ _id: req.user.id }).select(
      '-password'
    );
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
                .resize(1080, 1080)
                .withMetadata()
                .toFormat('jpeg', { quality: 95 })
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
// Remind sellers that pic is preferably <= 1080*1080
router.post(
  '/seller/item',
  [
    auth,
    uploadImage,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('brand', 'Brand is required').not().isEmpty(),
      check('price', 'Price is required').exists({ checkFalsy: true }),
      check('sizechartunit', 'Unit is required').not().isEmpty(),
      // Whether measurements shown in the size guide refer to body measurements or measurements of the garment
      check('sizechartmeatype', 'Measurement type is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { size1, size2, size3, size4, size5, size6, size7, size8 } = req.body;

    const sizesArray = [size1, size2, size3, size4, size5, size6, size7, size8];
    const len = sizesArray.length;

    if (!sizesArray[0]) {
      return res.status(400).json({ msg: 'Please provide sizes' });
    }

    for (var i = len; i >= 0; i--) {
      if (!sizesArray[i]) sizesArray.splice(i, 1);
    }

    const {
      title,
      category,
      brand,
      desc,
      price,
      outofstock,
      sizechartunit,
      sizechartmeatype,
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

    const sizeArraysArray = [
      size1Array,
      size2Array,
      size3Array,
      size4Array,
      size5Array,
      size6Array,
      size7Array,
      size8Array,
    ];

    const newSizesArray = [];
    sizesArray.forEach(size => {
      let sizeIndex = sizesArray.indexOf(size);
      if (size) {
        size = {
          size,
          chest: sizeArraysArray[sizeIndex][0]
            ? sizeArraysArray[sizeIndex][0].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][0]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][0]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][0].trim(),
                  to: sizeArraysArray[sizeIndex][0].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          bodylength: sizeArraysArray[sizeIndex][1]
            ? sizeArraysArray[sizeIndex][1].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][1]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][1]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][1].trim(),
                  to: sizeArraysArray[sizeIndex][1].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          waist: sizeArraysArray[sizeIndex][2]
            ? sizeArraysArray[sizeIndex][2].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][2]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][2]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][2].trim(),
                  to: sizeArraysArray[sizeIndex][2].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          hip: sizeArraysArray[sizeIndex][3]
            ? sizeArraysArray[sizeIndex][3].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][3]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][3]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][3].trim(),
                  to: sizeArraysArray[sizeIndex][3].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          totallength: sizeArraysArray[sizeIndex][4]
            ? sizeArraysArray[sizeIndex][4].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][4]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][4]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][4].trim(),
                  to: sizeArraysArray[sizeIndex][4].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          bust: sizeArraysArray[sizeIndex][5]
            ? sizeArraysArray[sizeIndex][5].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][5]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][5]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][5].trim(),
                  to: sizeArraysArray[sizeIndex][5].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          skirtlength: sizeArraysArray[sizeIndex][6]
            ? sizeArraysArray[sizeIndex][6].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][6]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][6]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][6].trim(),
                  to: sizeArraysArray[sizeIndex][6].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
        };
      }
      newSizesArray.push(size);
    });

    const itemFields = {};
    itemFields.title = title;
    itemFields.category = category
      .split(',')
      .map(cat => cat.trim().toLowerCase());
    itemFields.brand = brand;
    itemFields.price = price;
    if (desc) itemFields.desc = desc;
    if (outofstock) {
      itemFields.outofstock = outofstock.split(',').map(size => size.trim());
    }
    itemFields.sizechartunit = sizechartunit;
    itemFields.sizechartmeatype = sizechartmeatype;

    itemFields.sizes = [];
    newSizesArray.forEach(size => {
      itemFields.sizes.push(size);
    });

    try {
      const seller = await Seller.findOne({ _id: req.user.id });
      if (!seller) {
        return res.status(404).json({ msg: 'Account not found' });
      }
      if (!req.files.displayImage) {
        return res.status(400).json({ msg: 'Please provide item images' });
      }

      // Create item without images so as to allows S3 to access item ID
      itemFields.seller = seller._id;
      let item = new Item(itemFields);
      await item.save();

      const sellerId = seller._id.toString();
      const itemId = item._id.toString();

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
                    .toFormat('jpeg', { quality: 90 })
                    .toBuffer()
                )
                .then(buffer =>
                  s3
                    .putObject({
                      Body: buffer,
                      Bucket: config.get('s3bucket'),
                      ContentType: 'image/jpeg',
                      Key: `${sellerId}/${itemId}/sizechart/${
                        sc.key.slice(-4) === 'jpeg'
                          ? sc.key.slice(
                              sellerId.length + 14,
                              sc.key.length - 5
                            ) + 'Updated.jpeg'
                          : sc.key.slice(
                              sellerId.length + 14,
                              sc.key.length - 4
                            ) + 'Updated.jpeg'
                      }`,
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  sizechart.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/sizechart/${
                      sc.key.slice(-4) === 'jpeg'
                        ? sc.key.slice(
                            sellerId.length + 14,
                            sc.key.length - 5
                          ) + 'Updated.jpeg'
                        : sc.key.slice(
                            sellerId.length + 14,
                            sc.key.length - 4
                          ) + 'Updated.jpeg'
                    }`
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
                  sharp(data.Body).toFormat('jpeg', { quality: 90 }).toBuffer()
                )
                .then(buffer =>
                  s3
                    .putObject({
                      Body: buffer,
                      Bucket: config.get('s3bucket'),
                      ContentType: 'image/jpeg',
                      Key: `${sellerId}/${itemId}/sizechart/${
                        sc.key.slice(-4) === 'jpeg'
                          ? sc.key.slice(
                              sellerId.length + 14,
                              sc.key.length - 5
                            ) + 'Updated.jpeg'
                          : sc.key.slice(
                              sellerId.length + 14,
                              sc.key.length - 4
                            ) + 'Updated.jpeg'
                      }`,
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  sizechart.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/sizechart/${
                      sc.key.slice(-4) === 'jpeg'
                        ? sc.key.slice(
                            sellerId.length + 14,
                            sc.key.length - 5
                          ) + 'Updated.jpeg'
                        : sc.key.slice(
                            sellerId.length + 14,
                            sc.key.length - 4
                          ) + 'Updated.jpeg'
                    }`
                  );
                })
                .catch(err => {
                  if (err.code === 'NoSuchKey') err.message = 'Image not found';
                  console.log(err.message);
                  console.log('i am here');
                  return res.status(500).send('Server error');
                })
            );
          }
        });
      }

      const images = [];
      const displayImage = req.files.displayImage[0];

      if (displayImage.key.slice(-4) === 'jpeg') {
        promiseArray.push(
          s3
            .getObject({
              Bucket: config.get('s3bucket'),
              Key: displayImage.key,
            })
            .promise()
            .then(data =>
              sharp(data.Body)
                .rotate()
                .resize(1080, 1080, {
                  fit: 'cover',
                })
                .toFormat('jpeg', { quality: 90 })
                .toBuffer()
            )
            .then(buffer =>
              s3
                .putObject({
                  Body: buffer,
                  Bucket: config.get('s3bucket'),
                  ContentType: 'image/jpeg',
                  Key: `${sellerId}/${itemId}/${
                    displayImage.key.slice(-4) === 'jpeg'
                      ? displayImage.key.slice(
                          sellerId.length + 15,
                          displayImage.key.length - 5
                        ) + 'Updated.jpeg'
                      : displayImage.key.slice(
                          sellerId.length + 15,
                          displayImage.key.length - 4
                        ) + 'Updated.jpeg'
                  }`,
                  ACL: 'public-read',
                })
                .promise()
            )
            .then(() => {
              images.unshift(
                `https://${config.get(
                  's3bucket'
                )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/${
                  displayImage.key.slice(-4) === 'jpeg'
                    ? displayImage.key.slice(
                        sellerId.length + 15,
                        displayImage.key.length - 5
                      ) + 'Updated.jpeg'
                    : displayImage.key.slice(
                        sellerId.length + 15,
                        displayImage.key.length - 4
                      ) + 'Updated.jpeg'
                }`
              );
            })
            .catch(err => {
              if (err.code === 'NoSuchKey') err.message = 'Image not found';
              console.log(err.message);
              console.log('i am here 2');
              return res.status(500).send('Server error');
            })
        );
      } else {
        promiseArray.push(
          s3
            .getObject({
              Bucket: config.get('s3bucket'),
              Key: displayImage.key,
            })
            .promise()
            .then(data =>
              sharp(data.Body)
                .resize(1080, 1080, {
                  fit: 'cover',
                })
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
                  Key: `${sellerId}/${itemId}/${
                    displayImage.key.slice(-4) === 'jpeg'
                      ? displayImage.key.slice(
                          sellerId.length + 15,
                          displayImage.key.length - 5
                        ) + 'Updated.jpeg'
                      : displayImage.key.slice(
                          sellerId.length + 15,
                          displayImage.key.length - 4
                        ) + 'Updated.jpeg'
                  }`,
                  ACL: 'public-read',
                })
                .promise()
            )
            .then(() => {
              images.unshift(
                `https://${config.get(
                  's3bucket'
                )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/${
                  displayImage.key.slice(-4) === 'jpeg'
                    ? displayImage.key.slice(
                        sellerId.length + 15,
                        displayImage.key.length - 5
                      ) + 'Updated.jpeg'
                    : displayImage.key.slice(
                        sellerId.length + 15,
                        displayImage.key.length - 4
                      ) + 'Updated.jpeg'
                }`
              );
            })
            .catch(err => {
              if (err.code === 'NoSuchKey') err.message = 'Image not found';
              console.log(err.message);
              console.log('i am here 3');
              return res.status(500).send('Server error');
            })
        );
      }

      if (req.files.itemImages) {
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
                    .resize(1080, 1080, {
                      fit: 'cover',
                    })
                    .toFormat('jpeg', { quality: 90 })
                    .toBuffer()
                )
                .then(buffer =>
                  s3
                    .putObject({
                      Body: buffer,
                      Bucket: config.get('s3bucket'),
                      ContentType: 'image/jpeg',
                      Key: `${sellerId}/${itemId}/${
                        image.key.slice(-4) === 'jpeg'
                          ? image.key.slice(
                              sellerId.length + 15,
                              image.key.length - 5
                            ) + 'Updated.jpeg'
                          : image.key.slice(
                              sellerId.length + 15,
                              image.key.length - 4
                            ) + 'Updated.jpeg'
                      }`,
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  images.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/${
                      image.key.slice(-4) === 'jpeg'
                        ? image.key.slice(
                            sellerId.length + 15,
                            image.key.length - 5
                          ) + 'Updated.jpeg'
                        : image.key.slice(
                            sellerId.length + 15,
                            image.key.length - 4
                          ) + 'Updated.jpeg'
                    }`
                  );
                })
                .catch(err => {
                  if (err.code === 'NoSuchKey') err.message = 'Image not found';
                  console.log(err.message);
                  console.log('i am here 4');
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
                    .resize(1080, 1080, {
                      fit: 'cover',
                    })
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
                      Key: `${sellerId}/${itemId}/${
                        image.key.slice(-4) === 'jpeg'
                          ? image.key.slice(
                              sellerId.length + 15,
                              image.key.length - 5
                            ) + 'Updated.jpeg'
                          : image.key.slice(
                              sellerId.length + 15,
                              image.key.length - 4
                            ) + 'Updated.jpeg'
                      }`,
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  images.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/${
                      image.key.slice(-4) === 'jpeg'
                        ? image.key.slice(
                            sellerId.length + 15,
                            image.key.length - 5
                          ) + 'Updated.jpeg'
                        : image.key.slice(
                            sellerId.length + 15,
                            image.key.length - 4
                          ) + 'Updated.jpeg'
                    }`
                  );
                })
                .catch(err => {
                  if (err.code === 'NoSuchKey') err.message = 'Image not found';
                  console.log(err.message);
                  console.log('i am here 5');
                  return res.status(500).send('Server error');
                })
            );
          }
        });
      }

      await Promise.all(promiseArray);

      itemFields.images = images;
      if (sizechart.length > 0) itemFields.sizechart = sizechart;

      item = await Item.findOneAndUpdate(
        { _id: itemId },
        { $set: itemFields },
        { new: true }
      );
      await item.save();

      seller.listings.push({ item: item._id });

      await seller.save();
      res.json(seller.listings);
    } catch (err) {
      console.log(err.message);
      console.log('i am here 6');
      res.status(500).send('Server error');
    }
  }
);

// @route PUT api/users/seller/item/:item_id
// @desc Update item/listing
// @access Private
// Remind sellers that pic is preferably <= 1080*1080
router.put(
  '/seller/item/:item_id',
  [
    auth,
    uploadImage,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('brand', 'Brand is required').not().isEmpty(),
      check('price', 'Price is required').exists({ checkFalsy: true }),
      check('sizechartunit', 'Unit is required').not().isEmpty(),
      // Whether measurements shown in the size guide refer to body measurements or measurements of the garment
      check('sizechartmeatype', 'Measurement type is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { size1, size2, size3, size4, size5, size6, size7, size8 } = req.body;

    const sizesArray = [size1, size2, size3, size4, size5, size6, size7, size8];
    const len = sizesArray.length;

    if (!sizesArray[0]) {
      return res.status(400).json({ msg: 'Please provide sizes' });
    }

    for (var i = len; i >= 0; i--) {
      if (!sizesArray[i]) sizesArray.splice(i, 1);
    }

    const {
      title,
      category,
      brand,
      desc,
      price,
      outofstock,
      sizechartunit,
      sizechartmeatype,
      displayImage,
      itemImages,
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

    const sizeArraysArray = [
      size1Array,
      size2Array,
      size3Array,
      size4Array,
      size5Array,
      size6Array,
      size7Array,
      size8Array,
    ];

    const newSizesArray = [];
    sizesArray.forEach(size => {
      let sizeIndex = sizesArray.indexOf(size);
      if (size) {
        size = {
          size,
          chest: sizeArraysArray[sizeIndex][0]
            ? sizeArraysArray[sizeIndex][0].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][0]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][0]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][0].trim(),
                  to: sizeArraysArray[sizeIndex][0].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          bodylength: sizeArraysArray[sizeIndex][1]
            ? sizeArraysArray[sizeIndex][1].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][1]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][1]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][1].trim(),
                  to: sizeArraysArray[sizeIndex][1].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          waist: sizeArraysArray[sizeIndex][2]
            ? sizeArraysArray[sizeIndex][2].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][2]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][2]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][2].trim(),
                  to: sizeArraysArray[sizeIndex][2].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          hip: sizeArraysArray[sizeIndex][3]
            ? sizeArraysArray[sizeIndex][3].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][3]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][3]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][3].trim(),
                  to: sizeArraysArray[sizeIndex][3].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          totallength: sizeArraysArray[sizeIndex][4]
            ? sizeArraysArray[sizeIndex][4].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][4]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][4]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][4].trim(),
                  to: sizeArraysArray[sizeIndex][4].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          bust: sizeArraysArray[sizeIndex][5]
            ? sizeArraysArray[sizeIndex][5].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][5]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][5]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][5].trim(),
                  to: sizeArraysArray[sizeIndex][5].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
          skirtlength: sizeArraysArray[sizeIndex][6]
            ? sizeArraysArray[sizeIndex][6].split('-').map(size => size.trim())
                .length > 1
              ? {
                  from: sizeArraysArray[sizeIndex][6]
                    .split('-')
                    .map(size => size.trim())[0],
                  to: sizeArraysArray[sizeIndex][6]
                    .split('-')
                    .map(size => size.trim())[1],
                }
              : {
                  from: sizeArraysArray[sizeIndex][6].trim(),
                  to: sizeArraysArray[sizeIndex][6].trim(),
                }
            : {
                from: -1,
                to: -1,
              },
        };
      }
      newSizesArray.push(size);
    });

    const itemFields = {};
    itemFields.title = title;
    itemFields.category = category
      .split(',')
      .map(cat => cat.trim().toLowerCase());
    itemFields.brand = brand;
    itemFields.price = price;
    if (desc) itemFields.desc = desc;
    if (outofstock) {
      itemFields.outofstock = outofstock.split(',').map(size => size.trim());
    }
    itemFields.sizechartunit = sizechartunit;
    itemFields.sizechartmeatype = sizechartmeatype;

    itemFields.sizes = [];
    newSizesArray.forEach(size => {
      itemFields.sizes.push(size);
    });

    try {
      const seller = await Seller.findOne({ _id: req.user.id });
      if (!seller) {
        return res.status(404).json({ msg: 'Account not found' });
      }
      if (!displayImage) {
        if (!req.files.newDisplayImage) {
          return res.status(400).json({ msg: 'Please provide item images' });
        }
      }
      let item = await Item.findOne({ _id: req.params.item_id });
      if (!item) {
        return res.status(400).json({ msg: 'Item not found' });
      }
      if (item.seller.toString() !== req.user.id) {
        return res.status(400).json({ msg: 'User is not authorised' });
      }

      const sellerId = seller._id.toString();
      const itemId = item._id.toString();

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
                    .toFormat('jpeg', { quality: 90 })
                    .toBuffer()
                )
                .then(buffer =>
                  s3
                    .putObject({
                      Body: buffer,
                      Bucket: config.get('s3bucket'),
                      ContentType: 'image/jpeg',
                      Key: `${sellerId}/${itemId}/sizechart/${
                        sc.key.slice(-4) === 'jpeg'
                          ? sc.key.slice(
                              sellerId.length + 14,
                              sc.key.length - 5
                            ) + 'Updated.jpeg'
                          : sc.key.slice(
                              sellerId.length + 14,
                              sc.key.length - 4
                            ) + 'Updated.jpeg'
                      }`,
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  sizechart.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/sizechart/${
                      sc.key.slice(-4) === 'jpeg'
                        ? sc.key.slice(
                            sellerId.length + 14,
                            sc.key.length - 5
                          ) + 'Updated.jpeg'
                        : sc.key.slice(
                            sellerId.length + 14,
                            sc.key.length - 4
                          ) + 'Updated.jpeg'
                    }`
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
                  sharp(data.Body).toFormat('jpeg', { quality: 90 }).toBuffer()
                )
                .then(buffer =>
                  s3
                    .putObject({
                      Body: buffer,
                      Bucket: config.get('s3bucket'),
                      ContentType: 'image/jpeg',
                      Key: `${sellerId}/${itemId}/sizechart/${
                        sc.key.slice(-4) === 'jpeg'
                          ? sc.key.slice(
                              sellerId.length + 14,
                              sc.key.length - 5
                            ) + 'Updated.jpeg'
                          : sc.key.slice(
                              sellerId.length + 14,
                              sc.key.length - 4
                            ) + 'Updated.jpeg'
                      }`,
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  sizechart.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/sizechart/${
                      sc.key.slice(-4) === 'jpeg'
                        ? sc.key.slice(
                            sellerId.length + 14,
                            sc.key.length - 5
                          ) + 'Updated.jpeg'
                        : sc.key.slice(
                            sellerId.length + 14,
                            sc.key.length - 4
                          ) + 'Updated.jpeg'
                    }`
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

      let images = [];
      if (displayImage) {
        images.push(displayImage);
      }
      if (itemImages) {
        images = images.concat(itemImages.split(',').map(cat => cat.trim()));
      }

      if (!displayImage) {
        const newDisplayImage = req.files.newDisplayImage[0];

        if (newDisplayImage.key.slice(-4) === 'jpeg') {
          promiseArray.push(
            s3
              .getObject({
                Bucket: config.get('s3bucket'),
                Key: newDisplayImage.key,
              })
              .promise()
              .then(data =>
                sharp(data.Body)
                  .rotate()
                  .resize(1080, 1080, {
                    fit: 'cover',
                  })
                  .toFormat('jpeg', { quality: 90 })
                  .toBuffer()
              )
              .then(buffer =>
                s3
                  .putObject({
                    Body: buffer,
                    Bucket: config.get('s3bucket'),
                    ContentType: 'image/jpeg',
                    Key: `${sellerId}/${itemId}/${
                      newDisplayImage.key.slice(-4) === 'jpeg'
                        ? newDisplayImage.key.slice(
                            sellerId.length + 15,
                            newDisplayImage.key.length - 5
                          ) + 'Updated.jpeg'
                        : newDisplayImage.key.slice(
                            sellerId.length + 15,
                            newDisplayImage.key.length - 4
                          ) + 'Updated.jpeg'
                    }`,
                    ACL: 'public-read',
                  })
                  .promise()
              )
              .then(() => {
                images.unshift(
                  `https://${config.get(
                    's3bucket'
                  )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/${
                    newDisplayImage.key.slice(-4) === 'jpeg'
                      ? newDisplayImage.key.slice(
                          sellerId.length + 15,
                          newDisplayImage.key.length - 5
                        ) + 'Updated.jpeg'
                      : newDisplayImage.key.slice(
                          sellerId.length + 15,
                          newDisplayImage.key.length - 4
                        ) + 'Updated.jpeg'
                  }`
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
                Key: newDisplayImage.key,
              })
              .promise()
              .then(data =>
                sharp(data.Body)
                  .resize(1080, 1080, {
                    fit: 'cover',
                  })
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
                    Key: `${sellerId}/${itemId}/${
                      newDisplayImage.key.slice(-4) === 'jpeg'
                        ? newDisplayImage.key.slice(
                            sellerId.length + 15,
                            newDisplayImage.key.length - 5
                          ) + 'Updated.jpeg'
                        : newDisplayImage.key.slice(
                            sellerId.length + 15,
                            newDisplayImage.key.length - 4
                          ) + 'Updated.jpeg'
                    }`,
                    ACL: 'public-read',
                  })
                  .promise()
              )
              .then(() => {
                images.unshift(
                  `https://${config.get(
                    's3bucket'
                  )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/${
                    newDisplayImage.key.slice(-4) === 'jpeg'
                      ? newDisplayImage.key.slice(
                          sellerId.length + 15,
                          newDisplayImage.key.length - 5
                        ) + 'Updated.jpeg'
                      : newDisplayImage.key.slice(
                          sellerId.length + 15,
                          newDisplayImage.key.length - 4
                        ) + 'Updated.jpeg'
                  }`
                );
              })
              .catch(err => {
                if (err.code === 'NoSuchKey') err.message = 'Image not found';
                console.log(err.message);
                return res.status(500).send('Server error');
              })
          );
        }
      }

      if (req.files.newItemImages) {
        req.files.newItemImages.forEach(image => {
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
                    .resize(1080, 1080, {
                      fit: 'cover',
                    })
                    .toFormat('jpeg', { quality: 90 })
                    .toBuffer()
                )
                .then(buffer =>
                  s3
                    .putObject({
                      Body: buffer,
                      Bucket: config.get('s3bucket'),
                      ContentType: 'image/jpeg',
                      Key: `${sellerId}/${itemId}/${
                        image.key.slice(-4) === 'jpeg'
                          ? image.key.slice(
                              sellerId.length + 15,
                              image.key.length - 5
                            ) + 'Updated.jpeg'
                          : image.key.slice(
                              sellerId.length + 15,
                              image.key.length - 4
                            ) + 'Updated.jpeg'
                      }`,
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  images.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/${
                      image.key.slice(-4) === 'jpeg'
                        ? image.key.slice(
                            sellerId.length + 15,
                            image.key.length - 5
                          ) + 'Updated.jpeg'
                        : image.key.slice(
                            sellerId.length + 15,
                            image.key.length - 4
                          ) + 'Updated.jpeg'
                    }`
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
                    .resize(1080, 1080, {
                      fit: 'cover',
                    })
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
                      Key: `${sellerId}/${itemId}/${
                        image.key.slice(-4) === 'jpeg'
                          ? image.key.slice(
                              sellerId.length + 15,
                              image.key.length - 5
                            ) + 'Updated.jpeg'
                          : image.key.slice(
                              sellerId.length + 15,
                              image.key.length - 4
                            ) + 'Updated.jpeg'
                      }`,
                      ACL: 'public-read',
                    })
                    .promise()
                )
                .then(() => {
                  images.push(
                    `https://${config.get(
                      's3bucket'
                    )}.s3-ap-southeast-1.amazonaws.com/${sellerId}/${itemId}/${
                      image.key.slice(-4) === 'jpeg'
                        ? image.key.slice(
                            sellerId.length + 15,
                            image.key.length - 5
                          ) + 'Updated.jpeg'
                        : image.key.slice(
                            sellerId.length + 15,
                            image.key.length - 4
                          ) + 'Updated.jpeg'
                    }`
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

      await Promise.all(promiseArray);

      itemFields.seller = seller._id;
      itemFields.images = images;
      if (sizechart.length > 0) itemFields.sizechart = sizechart;

      item = await Item.findOneAndUpdate(
        { _id: req.params.item_id },
        { $set: itemFields },
        { new: true }
      );
      await item.save();

      res.json(item);
    } catch (err) {
      console.log(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Item not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route DELETE api/users/seller/item/:item_id
// @desc Delete sellers item
// @access Private
router.delete('/seller/item/:item_id', auth, async (req, res) => {
  try {
    const seller = await Seller.findOne({ _id: req.user.id });
    if (!seller) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    if (
      seller.listings.filter(
        listing => listing.item.toString() === req.params.item_id
      ).length === 0
    ) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    const removeIndex = seller.listings
      .map(listing => listing.item.toString())
      .indexOf(req.params.item_id);

    await Item.findOneAndRemove({
      _id: seller.listings[removeIndex].item,
    });

    seller.listings.splice(removeIndex, 1);
    await seller.save();

    let listings = [];
    seller.listings.forEach(listing =>
      listings.push(Item.findOne({ _id: listing.item }))
    );
    listings = await Promise.all(listings);

    res.json(listings);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route GET api/users/buyer/cart
// @desc Get all users cart items
// @access Private
router.get('/buyer/cart', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ _id: req.user.id });
    if (!buyer) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    res.json(buyer.cart);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/users/buyer/wishlist
// @desc Get all users liked items
// @access Private
router.get('/buyer/wishlist', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ _id: req.user.id });
    if (!buyer) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    res.json(buyer.wishlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/users/buyer/orders
// @desc Get all buyers orders
// @access Private
router.get('/buyer/orders', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ _id: req.user.id });
    if (!buyer) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    let orders = buyer.orders;
    const ordersArray = [];
    orders.forEach(order =>
      ordersArray.push(BuyerOrder.findOne({ _id: order.order }))
    );
    orders = await Promise.all(ordersArray);
    res.json(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/users/seller/orders
// @desc Get all sellers orders
// @access Private
router.get('/seller/orders', auth, async (req, res) => {
  try {
    const seller = await Seller.findOne({ _id: req.user.id });
    if (!seller) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    let orders = seller.orders;
    const ordersArray = [];
    orders.forEach(order =>
      ordersArray.push(SellerOrder.findOne({ _id: order.order }))
    );
    orders = await Promise.all(ordersArray);
    res.json(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
