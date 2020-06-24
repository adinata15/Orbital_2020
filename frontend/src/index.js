//Remember to use {{some_var:"some_values"}} -> double bracket+quote for style
// RMB to link front to back end using proxy in the package.json file
import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import allReducer from "./reducers"; //this will automatically take the file in ./reducers/index (default case is always index)
import { Provider } from "react-redux"; //this is to connect store(redux) to react

import App from "./App";

import "./style/tailwind.generated.css";
import "./style/index.css";

//store is like the place to store the global state
const myStore = createStore(
	allReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //this is so that we can use redux dev tools for the website
);

ReactDOM.render(
	<Provider store={myStore}>
		<App />
	</Provider>,
	document.getElementById("root")
);
