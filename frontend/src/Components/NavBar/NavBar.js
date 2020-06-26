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
	}

	render() {
		return (
			<Fragment>
				<div className="navbar">
					<Link to="/home">Home</Link>
					<div className="subnav">
						<button className="subnavbtn">Men </button>
						<div className="subnav-content">
							<Link name="bring" to="/men/shirts">
								Shirts
							</Link>
							<Link name="company" to="/men/pants">
								Pants
							</Link>
							<Link name="team" to="/men/shorts">
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

					<SigninBtn
						isLogged={this.props.isLogged}
						login={this.props.login}
						getUserInfo={this.props.getUserInfo}
						class="float-right"
					/>
					<ProfileBtn
						accounttype={this.props.user.accounttype}
						logout={this.props.logout}
						isLogged={this.props.isLogged}
					/>
					<CartBtn />
				</div>
			</Fragment>
		);
	}
}

export default NavBar;
