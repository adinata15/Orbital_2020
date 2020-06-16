//Press alt+click to edit multiple lines at once

import React from "react";
import NavBar from "./Components/NavBar";
import Form from "./Components/Form";
import ClothesDetail from "./Components/ClothesDetail";
import Carousel from "./Components/Carousel";
import ShopBar from "./Components/ShopBar";
import Sidebar from "./Components/Sidebar";
import Breadcrumbs from "./Components/Breadcrumbs";
import Dialog from "./Components/FormDialog";
import FooterBar from "./Components/FooterBar";
import TrialAPI from "./Components/TrialAPI";
import PersonInput from "./Components/PersonInput";
import FitAssistCard from "./Components/FitAssistCard";

class App extends React.Component {
	render() {
		return (
			<div>
				<NavBar />
				<Carousel />
				<Breadcrumbs />
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
<Form />
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
