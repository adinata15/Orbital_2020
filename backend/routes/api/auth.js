const express = require('express');
const router = express.Router();

// @route eg. POST api/users
// @desc eg. Register user
// @access eg. Public
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;
