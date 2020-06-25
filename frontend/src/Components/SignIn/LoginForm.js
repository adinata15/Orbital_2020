import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import SignUpLink from "./SignUpLink";
import axios from "axios";
import { Link } from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";
import { getUserInfo } from "../../utils/functions.js";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			email: "",
			accountType: "buyer",
		};
		// this.props.login();
		//this.handleClose = this.handleClose.bind(this);
	}

	handleChange = (e) => {
		switch (e.target.id) {
			case "password":
				this.setState({
					password: e.target.value,
				});
				break;
			case "email":
				this.setState({
					email: e.target.value,
				});
				break;
			default:
				console.error();
		}
	};

	handleClick = (e) => {
		this.setState({
			accountType: e.target.id,
		});
		// console.log(this.state.accountType);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const self = this; //because the "this" inside axios will differ already

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		let user = {
			accountType: this.state.accountType,
			email: this.state.email,
			password: this.state.password,
		};

		user = JSON.stringify(user);
		// console.log(user);

		axios
			.post("http://localhost:5000/api/auth", user, config)
			.then((res) => {
				console.log(res.data);
				alert("yay");
				// getUserInfo(res.data.token);
				this.props.login(res.data.token); //cause this one is loacted in app.js file?
				self.props.handleClose();
			})
			.catch((err) => {
				console.error(err);
				alert("We encountered an error");
			});
	};

	render() {
		return (
			<Fragment>
				<form
					action=""
					onSubmit={this.handleSubmit}
					class="w-9/12 max-w-lg mx-auto my-6"
				>
					<span class="float-right text-xl" id="close">
						<Link id="closeBtn" onClick={this.props.handleClose} to="">
							&times;
						</Link>
					</span>
					<h1 class="text-center text-3xl mb-3">Sign in</h1>
					<div class="flex flex-wrap -mx-3 mb-6">
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="email"
							>
								Account type
							</label>

							<div class="pl-5 pb-3">
								<input
									type="radio"
									id="buyer"
									name="accountType"
									class="justify-center mr-2"
									onClick={this.handleClick}
									required
								/>
								<label
									for="accountType"
									class=" items-center cursor-pointer mr-8 text-gray-700"
								>
									Buyer
								</label>

								<input
									onClick={this.handleClick}
									id="seller"
									name="accountType"
									class="justify-center items-center mr-2"
									type="radio"
									required
								/>
								<label
									for="radio2"
									class=" items-center cursor-pointer text-gray-700"
								>
									Seller
								</label>
							</div>
						</div>

						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="email"
							>
								Email
							</label>
							<input
								name="email"
								onChange={this.handleChange}
								class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="email"
								type="email"
								placeholder="jane@gmail.com"
								required
							/>
						</div>
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="grid-password"
							>
								Password
							</label>
							<input
								name="password"
								onChange={this.handleChange}
								class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="password"
								type="password"
								placeholder="******************"
								minlength="8"
								required
							/>
						</div>
					</div>
					<DialogActions>
						<button
							class="w-full float-left bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 mb-3 rounded"
							id="button"
							type="submit"
						>
							Log In
						</button>
					</DialogActions>
					<p class="text-xs italic">
						Do not have an account?
						<SignUpLink
							login={this.props.login}
							getUserInfo={this.props.getUserInfo}
							handleClose={this.props.handleClose}
						/>
					</p>
				</form>
			</Fragment>
		);
	}
}

export default LoginForm;
