//not done:choose each section by click then hover to reveal effect
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SigninBtn from "../SignIn/SigninBtn.js";
import FitAssistBtn from "./FitAssistBtn";
import CartBtn from "./CartBtn";

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
			<div>
				<div className="navbar">
					<a href="/home">Home</a>
					<div className="subnav">
						<button className="subnavbtn">Men </button>
						<div className="subnav-content">
							<a name="bring" onClick={this.handleClick} href="/men/shirts">
								Shirts
							</a>
							<a name="company" onClick={this.handleClick} href="/men/pants">
								Pants
							</a>
							<a name="team" onClick={this.handleClick} href="/men/shorts">
								Shorts
							</a>
						</div>
					</div>

					<div className="subnav">
						<button className="subnavbtn">Women</button>
						<div className="subnav-content ">
							<a href="/women/dress">Dress</a>
							<a href="/women/shirt">Shirt</a>
							<a href="/women/skirt">Skirt</a>
							<a href="/women/pants">Pants</a>
						</div>
					</div>

					<div className="subnav">
						<button className="subnavbtn">Kids</button>
						<div className="subnav-content">
							<a href="/kids/shirt">Shirt</a>
							<a href="/kids/pants">Pants</a>
							<a href="/kids/cap">Cap</a>
							<a href="/kids/diapers">Diapers</a>
						</div>
					</div>

					<div className="subnav">
						<FitAssistBtn />
					</div>
					<SigninBtn
						login={this.props.login}
						// logout={this.props.logout}
						class="float-right"
					/>
					<CartBtn />
				</div>

				{/* <div style={{ padding: "16px 16px 16px 16px" }}>
					<h3>You are choosing {chosenMenu} item</h3>
				</div> */}
			</div>
		);
	}
}

export default NavBar;
