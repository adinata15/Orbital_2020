//Press alt+click to edit multiple lines at once
import "./style/app.css";
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

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
import SignupForm from "./Components/SignIn/SignupForm.js";

import PrivateRoute from "./utils/PrivateRoute.js";

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
					<Route path="/edit/profile/seller" component={EditProfileSeller} />
					<PrivateRoute path="/sell" component={SellForm} />
					<PrivateRoute path="/store" component={ListingBook} />
					<PrivateRoute path="/edit-listing" component={ListingDetail} />

					<PrivateRoute
						path="/edit/profile/buyer"
						component={EditProfileBuyer}
					/>
					<PrivateRoute path="/address" component={AddressBook} />
					<PrivateRoute path="/order" component={OrdersBook} />
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
