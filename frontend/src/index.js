//Remember to use {{some_var:"some_values"}} -> double bracket+quote for style
// RMB to link front to back end using proxy in the package.json file
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./style/tailwind.generated.css";
import "./style/index.css";

ReactDOM.render(<App />, document.getElementById("root"));
