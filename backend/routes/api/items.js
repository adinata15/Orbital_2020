const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

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

// @route PUT api/items/cart/:item_id
// @desc Add an item to shopping cart
// @access Private
router.put(
  '/cart/:item_id',
  [
    auth,
    [
      check('quantity', 'Quantity is required').exists({ checkFalsy: true }),
      check('size', 'Size is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { size, quantity } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({ msg: 'Quantity must be at least 1' });
    }

    try {
      const buyer = await Buyer.findOne({
        _id: req.user.id,
      });
      if (!buyer) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const newItem = await Item.findOne({
        _id: req.params.item_id,
      });
      if (!newItem) {
        return res.status(404).json({ msg: 'Item not found' });
      }

      //Same item already present in buyer's cart
      let alrPresent = false;
      buyer.cart.forEach(item => {
        if (
          item.item.toString() === newItem._id.toString() &&
          item.size === size
        ) {
          item.quantity += quantity;
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
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Item not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route PUT api/items/uncart/:item_id/:size
// @desc Remove an item from shopping cart
// @access Private
router.put('/uncart/:item_id/:size', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({
      _id: req.user.id,
    });
    if (!buyer) {
      return res.status(404).json({ msg: 'User not found' });
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
      : res.status(404).json({ msg: 'Item not found' });
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route PUT api/items/cart/plus/:item_id/:size
// @desc +1 quantity of an item in shopping cart
// @access Private
router.put('/cart/plus/:item_id/:size', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({
      _id: req.user.id,
    });
    if (!buyer) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (
      buyer.cart.filter(
        item =>
          item.item.toString() === req.params.item_id &&
          item.size === req.params.size
      ).length === 0
    ) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    buyer.cart.forEach(item => {
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
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route PUT api/items/cart/minus/:item_id/:size
// @desc -1 quantity of an item in shopping cart
// @access Private
router.put('/cart/minus/:item_id/:size', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({
      _id: req.user.id,
    });
    if (!buyer) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (
      buyer.cart.filter(
        item =>
          item.item.toString() === req.params.item_id &&
          item.size === req.params.size
      ).length === 0
    ) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    buyer.cart.forEach(item => {
      if (
        (item.item.toString() === req.params.item_id) &
        (item.size === req.params.size)
      ) {
        item.quantity -= 1;

        //Remove item if quantity is zero
        if (item.quantity === 0) {
          const removeIndex = buyer.cart
            .map(item => [item.item.toString(), item.size])
            .indexOf([req.params.item_id, req.params.size]);

          buyer.cart.splice(removeIndex, 1);
        }
      }
    });

    await buyer.save();

    res.json(buyer.cart);
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route PUT api/items/like/:item_id
// @desc Add an item to wishlist
// @access Private
router.put(
  '/wishlist/:item_id',
  [auth, check('size', 'Size is required').not().isEmpty()],
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
        return res.status(404).json({ msg: 'User not found' });
      }

      const newItem = await Item.findOne({
        _id: req.params.item_id,
      });
      if (!newItem) {
        return res.status(404).json({ msg: 'Item not found' });
      }

      //If the item is already present in buyer's wishlist
      if (
        buyer.wishlist.filter(
          item =>
            item.item.toString() === req.params.item_id && item.size === size
        ).length > 0
      ) {
        return res.status(404).json({ msg: 'Item is already in wishlist' });
      }

      //If the item is already present in buyer's wishlist
      if (
        buyer.cart.filter(
          item =>
            item.item.toString() === req.params.item_id && item.size === size
        ).length > 0
      ) {
        return res.status(404).json({ msg: 'Item is already in cart' });
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
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Item not found' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route PUT api/items/unlike/:item_id/:size
// @desc Remove an item from wishlist
// @access Private
router.put('/unlike/:item_id/:size', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({
      _id: req.user.id,
    });
    if (!buyer) {
      return res.status(404).json({ msg: 'User not found' });
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
      : res.status(404).json({ msg: 'Item not found' });
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route PUT api/items/wishlist/cart/:item_id/:size
// @desc Transfer item from wishlist to shopping cart
// @access Private
router.put('/wishlist/cart/:item_id/:size', auth, async (req, res) => {
  try {
    const buyer = await Buyer.findOne({
      _id: req.user.id,
    });
    if (!buyer) {
      return res.status(404).json({ msg: 'User not found' });
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
      ? res.json(buyer.cart)
      : res.status(404).json({ msg: 'Item not found' });
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route GET api/items/category/:category (if multiple categories are present, separated each value using '-')
// @desc Get all items from a certain category
// @access Public
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category.split('-');
    console.log(category);
    const items = await Item.find({
      category: { $all: category },
    });
    if (!items) {
      return res.status(404).json({ msg: 'Items not found' });
    }
    res.json(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
