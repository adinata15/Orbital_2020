//Press alt+click to edit multiple lines at once

import React from "react";
import NavBar from "./Components/NavBar";
import Form from "./Components/Form";
import ClothesDetail from "./Components/ClothesDetail";
import Carousel from "./Components/Carousel";
import ShopBar from "./Components/ShopBar";
import Sidebar from "./Components/Sidebar";
import Breadcrumbs from "./Components/Breadcrumbs";
import Dialog from "./Components/Dialog";
import FooterBar from "./Components/FooterBar";
import TrialAPI from "./Components/TrialAPI";
import PersonInput from "./Components/PersonInput";

class App extends React.Component {
	render() {
		return (
			<div>
				<br />
				<TrialAPI />
				<br />
				<PersonInput />
			</div>
		);
	}
}

export default App;
/* Components
-------------------------------
Not done:
<Dialog />
<NavBars />
<Sidebar />
<ClothesDetail />

				<NavBar />
				<Breadcrumbs />
				<Carousel />
				<ShopBar />
				<FooterBar />

Done:
<Form />
<FooterBar />
-------------------------------
*/
