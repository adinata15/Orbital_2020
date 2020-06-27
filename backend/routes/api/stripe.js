const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const stripeSecretKey = require('config').get('stripeSecretKey');
const stripeState = require('config').get('stripeState');
const stripe = require('stripe')(stripeSecretKey);

const Seller = require('../../model/Seller');

// @route GET api/stripe/connect/oauth
// @desc Update sellers stripe ID in database
// @access Public
router.get('/connect/oauth', auth, async (req, res) => {
  const { code, state } = req.query;

  try {
    // Assert the state matches the state you provided in the OAuth link (optional).
    if (!stateMatches(state)) {
      return res
        .status(403)
        .json({ error: 'Incorrect state parameter: ' + state });
    }

    let seller = await Seller.findOne({ _id: req.user.id });

    const stripeuserid = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    }).stripe_user_id;

    seller = await Seller.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { stripeseller: stripeuserid } },
      { new: true }
    ).select('-password');

    res.json(seller);
  } catch (err) {
    console.log(err.message);
    if (err.type === 'StripeInvalidGrantError') {
      return res
        .status(400)
        .json({ error: 'Invalid authorization code: ' + code });
    }
    res.status(500).send('Server error');
  }
});

const stateMatches = state_parameter => {
  // Load the same state value that you randomly generated for your OAuth link.
  const saved_state = stripeState;

  return saved_state === state_parameter;
};

module.exports = router;
