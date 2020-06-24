//here we are just saying what we want to do
// everything her will then we given to reducer to be passed on
// this is the file that is gonna be called first from the main file

export const login = () => {
	return {
		type: "LOGIN", // this is just to be passed on to redux later
	};
};

export const logout = () => {
	return {
		type: "LOGOUT", // this is just to be passed on to redux later
		//payload:"" (this is params if for the reducer function later)
	};
};
