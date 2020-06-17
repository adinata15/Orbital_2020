const mongoose = require("mongoose");

const BuyerSchema = new mongoose.Schema({
	accounttype: {
		type: String,
		default: "buyer",
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
				ref: "item",
			},
		},
	],
	cart: [
		{
			item: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "item",
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
			ref: "address",
		},
	},
	shippingaddress: {
		empty: {
			type: Boolean,
			default: true,
		},
		address: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "address",
		},
	},
	addresses: [
		{
			address: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "address",
			},
		},
	],
	orders: [
		{
			order: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "buyerorder",
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Buyer = new mongoose.model("buyer", BuyerSchema);
