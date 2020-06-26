//left shipping and billing address
//gender cant update
//editting file upload

import React from "react";
import axios from "axios";
// import { getUserInfo } from "../utils/functions.js";
import Image from "../../images/plus.jpg";

class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props, password: "" };
		console.log(this.state.user);
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": this.state.token,
			},
		};
		let user = {
			...this.state.user,
			password: this.state.password,
		};

		user = JSON.stringify(user);
		console.log(user);

		axios
			.put(
				`http://localhost:5000/api/users/${this.state.user.accounttype}`,
				user,
				config
			)
			.then((res) => {
				console.log(res.data);
				alert("Editted user data");
			})
			.catch((err) => {
				console.error(err);
				alert("Edit fail");
			});
	};

	handleChange = (e) => {
		let val = e.target.value;
		switch (e.target.name) {
			case "password":
				this.setState({
					password: val,
				});
				break;
			case "name":
				this.setState((prevState) => {
					let user = { ...prevState.user }; // creating copy of state variable jasper
					user.name = val; // update the name property, assign a new value
					return { user }; // return new object jasper object
				});
				break;
			case "email":
				this.setState((prevState) => {
					let user = { ...prevState.user }; // creating copy of state variable jasper
					user.email = val; // update the name property, assign a new value
					return { user }; // return new object jasper object
				});
				break;
			case "gender":
				this.setState((prevState) => {
					let user = { ...prevState.user }; // creating copy of state variable jasper
					user.gender = val; // update the name property, assign a new value
					return { user }; // return new object jasper object
				});
				break;
			case "weight":
				this.setState((prevState) => {
					let user = { ...prevState.user }; // creating copy of state variable jasper
					user.weight = val; // update the name property, assign a new value
					return { user }; // return new object jasper object
				});
				break;
			case "height":
				this.setState((prevState) => {
					let user = { ...prevState.user }; // creating copy of state variable jasper
					user.height = val; // update the name property, assign a new value
					return { user }; // return new object jasper object
				});
				break;
			default:
				console.error();
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} class="w-full max-w-lg mx-auto my-6">
				<h1 class="text-center text-3xl mb-3">Edit Profile</h1>
				<div>
					<input
						type="file"
						hidden
						onChange={this.handleChange}
						// to link to the button
						ref={(fileInput) => (this.fileInput = fileInput)}
					/>
					<button
						type="button"
						class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
						onClick={() => this.fileInput.click()}
					>
						Choose file
					</button>
					<button onClick={this.fileUpload}>Upload</button>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-user-id"
						>
							User ID
						</label>
						<input
							name="name"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="name"
							value={this.state.user.name}
							type="text"
							placeholder="Jane"
							onChange={this.handleChange}
						/>
					</div>

					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-email"
						>
							Email
						</label>
						<input
							name="email"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="email"
							type="email"
							value={this.state.user.email}
							placeholder="jane@gmail.com"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div
					class="flex flex-wrap -mx-3 mb-6"
					hidden={this.state.user.accounttype === "seller"}
				>
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-user-id"
						>
							Shipping address
						</label>
						<input
							name="shipAddress"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="mailAdd"
							// value={this.state.user.shippingaddress}
							type="text"
							placeholder="25 Lower Kent Ridge Rd, Singapore 119081"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div
					class="flex flex-wrap -mx-3 mb-6"
					hidden={this.state.user.accounttype === "seller"}
				>
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-user-id"
						>
							Billing address
						</label>
						<input
							name="mailAddress"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="mailAddress"
							// value={this.state.user.billingaddress}
							type="text"
							password
							placeholder="25 Lower Kent Ridge Rd, Singapore 119081"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div
					class="flex flex-wrap -mx-3 mb-6"
					hidden={this.state.user.accounttype === "seller"}
				>
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-gender"
						>
							Gender
						</label>
						<div class="relative">
							<select
								class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="gender"
								defaultValue={this.state.user.gender}
								onChange={this.handleChange}
							>
								<option>Male</option>
								<option>Female</option>
								<option>Others</option>
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg
									class="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div
					class="flex flex-wrap -mx-3 mb-6"
					hidden={this.state.user.accounttype === "seller"}
				>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-weight"
						>
							Weight
						</label>
						<input
							name="weight"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="weight"
							type="number"
							value={this.state.user.weight}
							placeholder="in kg"
							onChange={this.handleChange}
						/>
					</div>

					<div
						class="w-full md:w-1/2 px-3 mb-6 md:mb-0"
						hidden={this.state.user.accounttype === "seller"}
					>
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-height"
						>
							Height
						</label>
						<input
							name="height"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="height"
							type="number"
							value={this.state.user.height}
							placeholder="in cm"
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
							Edit password here
						</label>
						<input
							name="password"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="password"
							type="password"
							placeholder="******************"
							minlength="8"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<button
					class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
					type="submit"
					id="button"
				>
					Save Changes
				</button>
			</form>
		);
	}
}

export default EditProfile;
