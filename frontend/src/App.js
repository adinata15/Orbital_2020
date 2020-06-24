//Press alt+click to edit multiple lines at once

import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import axios from "axios";

import NavBar from "./Components/NavBar/NavBar";
import Signup from "./Components/SignIn/SignUpForm";
import ClothesDetail from "./Components/Shop/ClothesDetail";
import Carousel from "./Components/Carousel";
import EditProfile from "./Components/EditProfile";
import Home from "./Components/Shop/Home";
import Sidebar from "./Components/Sidebar";
import Breadcrumbs from "./Components/NavBar/Breadcrumbs";
import FooterBar from "./Components/FooterBar";
import TrialAPI from "./Components/TrialAPI";
import PersonInput from "./Components/PersonInput";
import FitAssistCard from "./Components/NavBar/FitAssistCard";
import Payment from "./Components/Payment.js";
import Men from "./Components/Shop/Men.js";
import Women from "./Components/Shop/Women.js";
import Kids from "./Components/Shop/Kids.js";
import { getUserInfo } from "./utils/functions.js";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: "",
			isLogged: false,
		};
		//can bind function here! (we didnt bind here because we use arrow function below)
	}

	login = (inputToken) => {
		this.setState({
			isLogged: true,
			token: inputToken, //update token
		});
		// setAuthToken(inputToken);
		// axios.defaults.headers.common["x-auth-token"] = inputToken;
		// console.log(axios.defaults.headers);
		console.log("horee");
		return <Redirect to="/home" />;
	};

	logout = () => {
		this.setState({
			isLogged: false,
		});
		console.log("huu");
	};

	// componentDidUpdate() {
	// 	if (this.state.token) {
	// 		setAuthToken(this.state.token);
	// 	}
	// }

	render() {
		return (
			<Router>
				<p>Login is {this.state.isLogged ? "true" : "false"}</p>
				<p>Token is {this.state.token}</p>
				<NavBar
					isLogged={this.state.isLogged}
					getUserInfo={this.getUserInfo}
					login={this.login}
					logout={this.logout}
				/>
				<EditProfile token={this.state.token} />
				<Carousel />
				<Switch>
					<Route path="/signup" component={Signup} />
					<Route exact path="/home" component={Home} />
					<Route path="/home/men" component={Men} />
					<Route path="/home/women" component={Women} />
					<Route path="/home/kids" component={Kids} />
				</Switch>
				<Payment />
				<Breadcrumbs />
				<FooterBar />
			</Router>
		);
	}
}

export default App;
/* Components
-------------------------------
Not done:
<FitAssistCard />
<Form />
<Dialog />
<Sidebar />
<ClothesDetail />
<TrialAPI />
<PersonInput />

Done:
<FooterBar />
-------------------------------
*/

/*
Template costructor
--------------------------------
constructor(props) {
	super(props);
	this.state = {
		
	};
	//can bind function here! (we didnt bind here because we use arrow function below)
}

handleClick = (e) => {
	//for the thing inside target it can be anything!
	this.setState({
		
	});
};
---------------------------------
*/

/* 
<TrialAPI />
<br />
<PersonInput /> 
*/

// axios
// 	.get("http://localhost:5000")
// 	.then((res) => {
// 		console.log(res.data);
// 		// data = res.data;
// 		alert("Hi succeedd");
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		alert("Try again");
// 		console.log("hello");
// 	});
