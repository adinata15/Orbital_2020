const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  accounttype: {
    type: String,
    default: 'seller',
  },
  stripeseller: {},
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  listings: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
    },
  ],
  orders: [
    {
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerorder',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Seller = new mongoose.model('seller', SellerSchema);
