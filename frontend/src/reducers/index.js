// here we receive all of the "intended commands" from actions to be carried out
// here is also where we assign the state with the corresponding actions (like middleman of dispatch and action)
// everything here will then be dispatched on the main file later on

import isLogged from "./isLogged";
import { combineReducers } from "redux"; //to combine the multiple redcers into one then send it to the main file

const allReducers = combineReducers({
	//you can put any name for the key
	isLogged: isLogged, //if same name can actualy just write isLogged too
});

export default allReducers;
