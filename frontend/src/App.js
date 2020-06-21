//Press alt+click to edit multiple lines at once

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Form from "./Components/SignIn/SignUpForm";
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
	render() {
		return (
			<Router>
				<NavBar />
				<Carousel />
				<Switch>
					<Route exact path="/home" component={Home} />
					<Route path="/men" component={Men} />
					<Route path="/women" component={Women} />
					<Route path="/kids" component={Kids} />
				</Switch>

				<Form />
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
