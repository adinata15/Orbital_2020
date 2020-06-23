const express = require('express');
const router = express.Router();

const Item = require('../../model/Item');

// @route GET api/items/:item_id
// @desc Get an item
// @access Public
router.get('/:item_id', async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.item_id,
    });
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
