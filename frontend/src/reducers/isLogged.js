//here we can eport all of the subreducers to the main index.js later
//we need to combine everything as one

const loginReducer = (state = false, action) => {
	switch (action.type) {
		case "LOGIN":
			return true; //these valuse will be fed to the state directly
		case "LOGOUT":
			return false;
		//need to have a default option here
		default:
			return state;
	}
};
export default loginReducer;
