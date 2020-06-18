//not done:choose each section by click then hover to reveal effect
import React from "react";
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
					<a href="#home">Home</a>
					<div className="subnav">
						<button className="subnavbtn">Men </button>
						<div className="subnav-content">
							<a name="bring" onClick={this.handleClick} href="men">
								Men
							</a>
							<a name="company" onClick={this.handleClick} href="women">
								Women
							</a>
							<a name="team" onClick={this.handleClick} href="kids">
								Kids
							</a>
						</div>
					</div>

					<div className="subnav">
						<button className="subnavbtn">Women</button>
						<div className="subnav-content ">
							<a href="#dress">Dress</a>
							<a href="#deliver">Shirt</a>
							<a href="#package">Skirt</a>
							<a href="#express">Pants</a>
						</div>
					</div>

					<div className="subnav">
						<button className="subnavbtn">Kids</button>
						<div className="subnav-content">
							<a href="#link1">Shirt</a>
							<a href="#link2">Pants</a>
							<a href="#link3">Cap</a>
							<a href="#link4">Diapers</a>
						</div>
					</div>

					<div className="subnav">
						<FitAssistBtn />
					</div>
					<SigninBtn class="float-right" />
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
