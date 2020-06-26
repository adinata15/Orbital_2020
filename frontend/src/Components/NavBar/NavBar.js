// use Link instead of a+href to prevent website from reloading
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SigninBtn from "../SignIn/SigninBtn.js";
import FitAssistBtn from "./FitAssistBtn";
import CartBtn from "./CartBtn";
import ProfileBtn from "../Profile/ProfileBtn.js";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
		// this.handleClickOpen
	}

	// handleClickOpen = () => {
	// 	this.setState({
	// 		open: true,
	// 	});
	// 	console.log("hiii");
	// };

	// handleClose = () => {
	// 	this.setState({
	// 		open: false,
	// 	});
	// 	console.log("h00i");
	// };
	// handleClick = () => {};

	render() {
		return (
			<Fragment>
				<div className="navbar">
					<Link to="/home">Home</Link>
					<div className="subnav">
						<button className="subnavbtn">Men </button>
						<div className="subnav-content">
							<Link name="bring" onClick={this.handleClick} to="/men/shirts">
								Shirts
							</Link>
							<Link name="company" onClick={this.handleClick} to="/men/pants">
								Pants
							</Link>
							<Link name="team" onClick={this.handleClick} to="/men/shorts">
								Shorts
							</Link>
						</div>
					</div>
					<div className="subnav">
						<button className="subnavbtn">Women</button>
						<div className="subnav-content ">
							<Link to="/women/dress">Dress</Link>
							<Link to="/women/shirt">Shirt</Link>
							<Link to="/women/skirt">Skirt</Link>
							<Link to="/women/pants">Pants</Link>
						</div>
					</div>
					<div className="subnav">
						<button className="subnavbtn">Kids</button>
						<div className="subnav-content">
							<Link to="/kids/shirt">Shirt</Link>
							<Link to="/kids/pants">Pants</Link>
							<Link to="/kids/cap">Cap</Link>
							<Link to="/kids/diapers">Diapers</Link>
						</div>
					</div>

					<div className="subnav">
						<FitAssistBtn />
					</div>

					{/* everything down should be restricted to private */}

					{/* <div className="subnav">
						<button className="subnavbtn">Profile</button>
						<div className="subnav-content">
							<Link to="/edit/profile">Edit Profile</Link>
							<Link to="/edit/password">Change Password</Link>
						</div>
					</div> */}

					<SigninBtn
						isLogged={this.props.isLogged}
						login={this.props.login}
						getUserInfo={this.props.getUserInfo}
						// logout={this.props.logout}
						class="float-right"
					/>
					<ProfileBtn isLogged={this.props.isLogged} />
					<CartBtn />
				</div>

				{/* <div style={{ padding: "16px 16px 16px 16px" }}>
					<h3>You are choosing {chosenMenu} item</h3>
				</div> */}
			</Fragment>
		);
	}
}

export default NavBar;
