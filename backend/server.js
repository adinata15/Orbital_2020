//node dependencies for both front and back end are different
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Connect to MongoDB
const uri = process.env.MONGO_DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

app.get("/home", (req, res) => res.send("Hi"));
app.get("/second", (req, res) => res.send("Second page"));

//this is connected to the front end
app.get("/search", (req, res) => {
	request(
		"https://jsonplaceholder.typicode.com/users",
		(err, response, body) => {
			if (!err && response.statusCode == 200) res.send(body); //need to use res here (instead of response)
		}
	);
});

app.post("/search", (req, res) => {
	request(
		"https://jsonplaceholder.typicode.com/users",
		(err, response, body) => {
			if (!err && response.statusCode == 200) res.send(body); //need to use res here (instead of response)
		}
	);
});

//route request to other file (neater execution)
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
