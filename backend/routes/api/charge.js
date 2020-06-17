import Stripe from "stripe";
// don't commit your real stripe secret key... use env variables!!
const stripe = new Stripe(
	"sk_test_51GurU9IUwkCsjAp4DOxGtUpacEDkhXuOsYKzwrtSF8sXQyI89Cau5d4Jzgs9bwTcjnUbpj7HPkTcbRdJUGkRH0Rm009b8fU9gn"
);

export default async (req, res) => {
	const { id, amount } = req.body;

	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "SGD",
			description: "Delicious empanadas",
			payment_method: id,
			confirm: true,
		});

		console.log(payment);

		return res.status(200).json({
			confirm: "abc123",
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: error.message,
		});
	}
};
