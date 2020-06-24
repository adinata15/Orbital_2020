import axios from "axios";

const setupConfig = (token) => {
	return {
		headers: {
			"x-auth-token": token,
		},
	};
};

const getUserInfo = (token) => {
	let config = setupConfig(token);
	axios
		.get("http://localhost:5000/api/users/me", config)
		.then((res) => {
			alert("auth success");
			console.log(res.data);
		})
		.catch((err) => {
			alert("auth fail");
			console.error(err);
		});
};

export { getUserInfo, setupConfig };
