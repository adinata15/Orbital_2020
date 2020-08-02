//Remember to use {{some_var:"some_values"}} -> double bracket+quote for style
// RMB to link front to back end using proxy in the package.json file
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //this is to connect store(redux) to react

import App from "./App";

import "./style/tailwind.generated.css";
import "./style/index.css";
import { BrowserRouter as Router } from "react-router-dom";

//store is like the place to store the global state
import store from "./store";

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);
