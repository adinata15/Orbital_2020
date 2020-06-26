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
import BuyerForm from "./Components/SignIn/BuyerForm";
import SellerForm from "./Components/SignIn/SellerForm";
import ClothesDetail from "./Components/Shop/ClothesDetail";
import Carousel from "./Components/Carousel";
import EditProfile from "./Components/Profile/EditProfile";
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
import PostItem from "./Components/Shop/PostItem.js";
import { withProps, setupConfig } from "./utils/functions.js";
import PrivateRoute from "./utils/PrivateRoute.js";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: "this is a token",
			isLogged: true, //change to false later
			user: {},
		};
		//can bind function here! (we didnt bind here because we use arrow function below)
	}
	//get user info cant be used yet
	getUserInfo = (token) => {
		let self = this;
		let config = setupConfig(token);
		axios.get("http://localhost:5000/api/users/me", config).then((res) => {
			self.setState({
				user: res.data,
			});
			console.log(`user's name: ${self.state.user.name}`);
		});
	};

	login = (inputToken) => {
		this.setState({
			isLogged: true,
			token: inputToken, //update token
		});

		return <Redirect to="/home" />;
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
				<p>Token is {this.state.token}</p>
				{/* <PostItem /> */}
				<NavBar
					isLogged={this.state.isLogged}
					login={this.login}
					getUserInfo={this.getUserInfo}
					logout={this.logout}
				/>
				<Carousel />
				<Switch>
					<Route
						path="/signup/buyer"
						login={this.login}
						component={BuyerForm}
					/>
					<Route
						path="/signup/seller"
						login={this.login}
						component={SellerForm}
					/>
					<Route exact path="/home" component={Home} />
					<Route path="/home/men" component={Men} />
					<Route path="/home/women" component={Women} />
					<Route path="/home/kids" component={Kids} />
					<PrivateRoute
						isLogged={this.state.isLogged}
						component={withProps(EditProfile, {
							...this.state,
						})}
						path="/edit/profile"
					/>
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

{
	/* To include upload pic button
	<input
	type="file"
	style={{ display: "none" }}
	onChange={this.handleChange}
	// to link to the button
	ref={(fileInput) => (this.fileInput = fileInput)}
/>

<button
	type="button"
	class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
	onClick={() => this.fileInput.click()}
>
	Choose file
</button>
<button onClick={this.fileUpload}>Upload</button> */
}

// const formData = new FormData();
//     formData.append('file',file)
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//     return  post(url, formData,config)
//   }
