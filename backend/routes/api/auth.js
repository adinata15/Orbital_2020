const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Seller = require('../../model/Seller');
const Buyer = require('../../model/Buyer');

// @route GET api/auth
// @desc Test auth
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id).select('-password');
    if (!buyer) {
      const seller = await Seller.findById(req.user.id).select('-password');
      return res.json(seller);
    }
    res.json(buyer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST api/auth
// @desc Login user
// @access Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('accounttype', 'Please choose account type').not().isEmpty(),
    check('password', 'Please enter password').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, accounttype } = req.body;

    try {
      let buyer, seller;
      if (accounttype === 'buyer') {
        buyer = await Buyer.findOne({ email });
      } else {
        seller = await Seller.findOne({ email });
      }

      if (!buyer && !seller) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const user = buyer ? buyer : seller;

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

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

module.exports = router;
