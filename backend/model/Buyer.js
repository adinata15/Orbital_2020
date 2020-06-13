const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
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
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  gender: {
    type: String,
  },
  wishlist: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
    },
  ],
  cart: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
    },
  ],
  billingaddresses: [
    {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      cellphone: {
        type: Number,
        required: true,
      },
      telephone: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
      },
    },
  ],
  shippingaddresses: [
    {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      cellphone: {
        type: Number,
        required: true,
      },
      telephone: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
      },
    },
  ],
  orders: [
    {
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Buyer = new mongoose.model('buyer', BuyerSchema);
