//This file is for the modification (CRUD)
const router = require("express").Router();
let signUp = require("../models/signUp.model");

router.route("/").get((req, res) => {
	signUp
		.find()
		.then((exercises) => res.json(exercises))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const userid = req.body.userid;
	const email = req.body.email;
	const password = req.body.description;
	const gender = req.body.gender;
	const weight = Number(req.body.weight);
	const height = Number(req.body.height);

	const newsignUp = new signUp({
		userid,
		email,
		password,
		gender,
		weight,
		height,
	});

	newsignUp
		.save()
		.then(() => res.json("Exercise added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
	signUp
		.findById(req.params.id)
		.then((exercise) => res.json(exercise))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
		.then(() => res.json("Exercise deleted."))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
	signUp
		.findById(req.params.id)
		.then((signUp) => {
			signUp.username = req.body.username;
			signUp.description = req.body.description;
			signUp.duration = Number(req.body.duration);
			signUp.date = Date.parse(req.body.date);

			signUp
				.save()
				.then(() => res.json("Exercise updated!"))
				.catch((err) => res.status(400).json("Error: " + err));
		})
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
