const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Buyer = require('../../model/Buyer');
const Seller = require('../../model/Seller');

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
      let buyer = await Buyer.findOne({ email });

      if (buyer) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      buyer = new Buyer(buyerFields);

      const salt = await bcrypt.genSalt(10);
      buyer.password = await bcrypt.hash(buyer.password, salt);

      await buyer.save();

      //Create JWT
      const payload = {
        buyer: {
          id: buyer.id,
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
      let seller = await Seller.findOne({ email });

      if (seller) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      seller = new Seller({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      seller.password = await bcrypt.hash(seller.password, salt);

      await seller.save();

      //Create JWT
      const payload = {
        seller: {
          id: seller.id,
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

module.exports = router;
