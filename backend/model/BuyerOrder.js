const mongoose = require('mongoose');

const BuyerOrderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'buyer',
  },
  shippingaddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address',
  },
  billingaddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address',
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
      title: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = BuyerOrder = new mongoose.model(
  'buyerorder',
  BuyerOrderSchema
);
