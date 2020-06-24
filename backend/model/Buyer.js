const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
  accounttype: {
    type: String,
    default: 'buyer',
  },
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
      size: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  cart: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  billingaddress: {
    empty: {
      type: Boolean,
      default: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'address',
    },
  },
  shippingaddress: {
    empty: {
      type: Boolean,
      default: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'address',
    },
  },
  addresses: [
    {
      address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
      },
    },
  ],
  orders: [
    {
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyerorder',
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Buyer = new mongoose.model('buyer', BuyerSchema);
