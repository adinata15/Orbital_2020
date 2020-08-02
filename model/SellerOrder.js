const mongoose = require('mongoose');

const SellerOrderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'buyer',
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller',
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
      brand: {
        type: String,
        required: true,
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
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = SellerOrder = new mongoose.model(
  'sellerorder',
  SellerOrderSchema
);
