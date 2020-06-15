const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'buyer',
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
  shippingaddress: {
    type: Boolean,
    default: false,
  },
  billingaddress: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Address = new mongoose.model('address', AddressSchema);
