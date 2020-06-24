//Press alt+click to edit multiple lines at once

import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Axios from "axios";

import NavBar from "./Components/NavBar/NavBar";
import Signup from "./Components/SignIn/SignUpForm";
import ClothesDetail from "./Components/Shop/ClothesDetail";
import Carousel from "./Components/Carousel";
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
		console.log("horee");
		return <Redirect to="/home" />;
	};

	getUserInfo = (inputToken) => {
		// const self = this; //because the "this" inside axios will differ already
		const config = {
			headers: {
				Authorization: "Bearer " + inputToken,
			},
		};
		config = JSON.stringify(config);
		Axios.get("http://localhost:5000/api/users/me", config).then(
			alert("auth success")
		);
	};

	logout = () => {
		this.setState({
			isLogged: false,
		});
		console.log("huu");
	};

	render() {
		return (
			<Router>
				<p>Login is {this.state.isLogged ? "true" : "false"}</p>
				<NavBar
					isLogged={this.state.isLogged}
					getUserInfo={this.getUserInfo}
					login={this.login}
					logout={this.logout}
				/>
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
