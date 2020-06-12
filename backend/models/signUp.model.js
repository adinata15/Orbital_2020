//This file is to provide the schema/template for the data
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signUpSchema = new Schema(
	{
		userid: { type: String, required: true },
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			required: "Email address is required",
			validate: [validateEmail, "Please fill a valid email address"],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please fill a valid email address",
			],
		},
		password: {
			type: String,
			required: true,
			unique: true,
			minlength: 8,
		},
		gender: { type: String, required: true },
		weight: { type: Number, required: true },
		height: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const SignUp = mongoose.model("SignUp", signUpSchema);

module.exports = SignUp;
