//problem upload profile pic
//sellform on progress
//how to handle error (error not handled yet)
//className until profile btn so far

//Press alt+click to edit multiple lines at once
import "./App.css";
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "./actions/loginActions";

import NavBar from "./Components/NavBar/NavBar";
import SellForm from "./Components/NavBar/SellForm";
import FitAssistCard from "./Components/NavBar/FitAssistCard";
import Shop from "./Components/Shop/Shop";

import EditProfileSeller from "./Components/Profile/EditProfileSeller";
import EditProfileBuyer from "./Components/Profile/EditProfileBuyer";
import ListingBook from "./Components/Profile/ListingBook";
import ListingDetail from "./Components/Profile/ListingDetail";
import OrdersBook from "./Components/Profile/OrdersBook";
import AddressBook from "./Components/Profile/AddressBook";
import FooterBar from "./Components/FooterBar";
import Home from "./Components/Home.js";
import Alert from "./Components/Alert.js";

import PrivateRoute from "./utils/PrivateRoute.js";
import SignupForm from "./Components/SignIn/SignupForm.js";

class App extends React.Component {
	async componentDidMount() {
		if (this.props.token && !this.props.isAuthenticated) {
			await this.props.loadUser();
		}
	}

	render() {
		return (
			<div>
				<NavBar />
				<Alert />
				<Switch>
					<Route path="/signup" component={SignupForm} />
					<Route exact path="/" component={Home} />
					<Route exact path="/shop" component={Shop} />
					<Route exact path="/fit-assist" component={FitAssistCard} />
					<Route path="/stripe/connect/oauth" component={EditProfileSeller} />
					<PrivateRoute
						path="/edit/profile/seller"
						component={EditProfileSeller}
					/>
					<PrivateRoute
						path="/edit/profile/buyer"
						component={EditProfileBuyer}
					/>
					<PrivateRoute path="/address" component={AddressBook} />
					<PrivateRoute path="/sell" component={SellForm} />
					<PrivateRoute path="/store" component={ListingBook} />
					<PrivateRoute path="/order" component={OrdersBook} />
					<PrivateRoute path="/edit-listing" component={ListingDetail} />
					<Route path="/checkout/success" component={OrdersBook} />
				</Switch>
				<FooterBar />
			</div>
		);
	}
}

App.propTypes = {
	isAuthenticated: PropTypes.bool,
	token: PropTypes.string,
	loadUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	token: state.auth.token,
});

export default withRouter(connect(mapStateToProps, { loadUser })(App));
/* Components
-------------------------------

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
<button onClick={this.fileUpload}>Upload</button> 
}*/

// const formData = new FormData();
//     formData.append('file',file)
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//     return  post(url, formData,config)
//   }
