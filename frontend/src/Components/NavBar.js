//not done:choose each section by click then hover to reveal effect
import React from "react";
import SigninBtn from "./SigninBtn.js";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			option: "",
		};
		//can bind function here! (we didnt bind here because we use arrow function below)
	}

	handleClick = (e) => {
		//for the thing inside target it can be anything!
		this.setState({
			option: e.target.name,
		});
	};

	render() {
		let chosenMenu;
		chosenMenu =
			this.state.option === "company"
				? "company"
				: this.state.option === "team"
				? "team"
				: this.state.option === "bring"
				? "bring"
				: "careers";
		return (
			<div>
				<div class="navbar">
					<a href="#home">Home</a>
					<div class="subnav">
						<button class="subnavbtn">Men </button>
						<div class="subnav-content">
							<a name="bring" onClick={this.handleClick} href="#bring">
								Pants
							</a>
							<a name="company" onClick={this.handleClick} href="#bring">
								T-shirt
							</a>
							<a name="team" onClick={this.handleClick} href="#bring">
								Shorts
							</a>
						</div>
					</div>
					<div class="subnav">
						<button class="subnavbtn">Women</button>
						<div class="subnav-content ">
							<a href="#dress">Dress</a>
							<a href="#deliver">Shirt</a>
							<a href="#package">Skirt</a>
							<a href="#express">Pants</a>
						</div>
					</div>
					<div class="subnav">
						<button class="subnavbtn">Kids</button>
						<div class="subnav-content">
							<a href="#link1">Shirt</a>
							<a href="#link2">Pants</a>
							<a href="#link3">Cap</a>
							<a href="#link4">Diapers</a>
						</div>
					</div>
					<a href="#contact">Fit Assitant</a>
					<SigninBtn class="float-right" />
				</div>

				{/* 
				<div style={{ padding: "16px 16px 16px 16px" }}>
					<h3>You are choosing {chosenMenu} item</h3>
				</div> 
				*/}
			</div>
		);
	}
}

export default NavBar;
