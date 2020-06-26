const mongoose = require('mongoose');

const SellerOrderSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller',
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'buyer',
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

module.exports = SellerOrder = new mongoose.model(
  'sellerorder',
  SellerOrderSchema
);
