//Press alt+click to edit multiple lines at once

import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Form from "./Components/SignIn/SignUpForm";
import ClothesDetail from "./Components/Shop/ClothesDetail";
import Carousel from "./Components/Carousel";
import ShopBar from "./Components/Shop/ShopBar";
import Sidebar from "./Components/Sidebar";
import Breadcrumbs from "./Components/NavBar/Breadcrumbs";
import FooterBar from "./Components/FooterBar";
import TrialAPI from "./Components/TrialAPI";
import PersonInput from "./Components/PersonInput";
import FitAssistCard from "./Components/NavBar/FitAssistCard";
import Payment from "./Components/Payment.js";

class App extends React.Component {
	render() {
		return (
			<div>
				{/* <Form /> */}
				<Payment />
				<NavBar />
				<Carousel />
				{/* <Breadcrumbs /> */}
				<ShopBar />
				<FooterBar />
			</div>
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
