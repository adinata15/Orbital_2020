const mongoose = require('mongoose');

const BuyerOrderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'buyer',
  },
  shippingaddress: {
    addressid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'address',
    },
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
      type: Number,
      required: true,
    },
  },
  billingaddress: {
    addressid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'address',
    },
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
      type: Number,
      required: true,
    },
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

module.exports = BuyerOrder = new mongoose.model(
  'buyerorder',
  BuyerOrderSchema
);
