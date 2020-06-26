//pass!=passconfirm for some reason

import React from "react";
import axios from "axios";
// import { Route, Redirect } from "react-router-dom";
import Image from "../../images/plus.jpg";

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			passwordConfirm: "",
			password: "",
			name: "", //this is user-id
			email: "",
			image: "",
		};
		//this.handleClose = this.handleClose.bind(this);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.password !== this.state.passwordConfirm) {
			alert("Passwords need to match");
			return;
		} else {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			let user = {
				password: this.state.password,
				name: this.state.name,
				email: this.state.email,
				// image: this.state.image,
			};

			user = JSON.stringify(user);
			console.log(user);

			axios
				.post("http://localhost:5000/api/users/seller", user, config)
				.then((res) => {
					console.log(res.data);
					alert("Sign up succeed");
					this.props.login(res.data);
				})
				.catch((err) => {
					console.error(err);
					alert("Sign up fail");
				});
		}
	};

	// handleClick = (e) => {
	// 	this.setState({
	// 		accountType: e.target.id,
	// 	});
	// 	// console.log(this.state.accountType);
	// };

	handleChange = (e) => {
		// this.setState({
		// 	[e.target.name]: [e.target.value],
		// });
		// console.log(e.target.name + ":" + e.target.value);
		switch (e.target.name) {
			case "password":
				this.setState({
					password: e.target.value,
				});
				break;
			case "passwordConfirm":
				this.setState({
					passwordConfirm: e.target.value,
				});
				break;
			case "name":
				this.setState({
					name: e.target.value,
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

	redirect = () => {
		window.location = "http://localhost:3000/signup/buyer";
	};

	showError = () => {
		if (this.state.password !== this.state.passwordConfirm)
			return (
				<p class="text-sm text-red-600 italic"> Password does not match </p>
			);
		else return;
	};

	render() {
		return (
			<form
				enctype="mulitpart/form-data"
				onSubmit={this.handleSubmit}
				class="w-full max-w-lg mx-auto my-6"
			>
				{/* <p>{this.state.password}</p>
				<p>{this.state.passwordConfirm}</p> */}
				<h1 class="text-center text-3xl mb-3">Create Account</h1>

				<div class="flex flex-wrap -mx-3 mb-2">
					<div class="w-full px-3">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
							Account type*
						</label>

						<div class="pl-5 pb-3">
							<input
								type="radio"
								id="buyer"
								name="accounttype"
								class="justify-center mr-2"
								onClick={this.redirect}
								required
							/>
							<label class=" items-center cursor-pointer mr-8 text-gray-700">
								Buyer
							</label>

							<input
								id="seller"
								name="accounttype"
								class="justify-center items-center mr-2"
								type="radio"
								checked
								required
							/>
							<label class=" items-center cursor-pointer text-gray-700">
								Seller
							</label>
						</div>
					</div>
				</div>

				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-user-id"
						>
							User ID*
						</label>
						<input
							name="name"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="user-id"
							type="text"
							placeholder="Jane"
							required
							onChange={this.handleChange}
						/>
					</div>

					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-email"
						>
							Email*
						</label>
						<input
							name="email"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="email"
							type="email"
							placeholder="jane@gmail.com"
							required
							onChange={this.handleChange}
						/>
					</div>
				</div>

				<div class="flex flex-wrap -mx-3 mb-3">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-password"
						>
							Password (8 characters minimum)*
						</label>
						<input
							name="password"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="password"
							type="password"
							placeholder="******************"
							minlength="8"
							required
							onChange={this.handleChange}
						/>
					</div>
				</div>

				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-password"
						>
							Confirm password*
						</label>
						<input
							name="passwordConfirm"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="passwordConfirm"
							type="password"
							placeholder="******************"
							x-model="passwordConfirm"
							required
							onChange={this.handleChange}
						/>
					</div>
					{this.showError()}
				</div>

				<button
					class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
					type="submit"
					id="button"
				>
					Create Account
				</button>
				{/* <div>
					gender={this.state.gender}, weight={this.state.weight}, height=
					{this.state.height}, name={this.state.name}
				</div> */}
			</form>
		);
	}
}

export default SignUpForm;
