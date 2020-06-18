import React from "react";

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			match: false,
			pass: "",
		};
		//this.handleClose = this.handleClose.bind(this);
	}

	handleSubmit = (e) => {
		if (!this.state.match) {
			e.preventDefault();
			// alert("All * field is required");
		}
	};

	// handleCloses = () => {
	// 	console.log("hoo");
	// };

	handleChange = (e) => {
		if (e.target.id == "password") {
			this.setState({
				pass: e.target.value,
			});
			// console.log("hi");
		} else if (e.target.id == "confirmPassword") {
			this.setState({
				match: e.target.value == this.state.pass ? true : false,
			});
			// console.log("h0");
		}
		return false;
	};

	render() {
		return (
			<form action="/" method="POST" class="w-full max-w-lg mx-auto my-6">
				<h1 class="text-center text-3xl mb-3">Create Account</h1>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-user-id"
						>
							User ID*
						</label>
						<input
							name="userId"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="grid-user-id"
							type="text"
							placeholder="Jane"
							required
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
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="grid-email"
							type="email"
							placeholder="jane@gmail.com"
							required
						/>
					</div>
				</div>

				<div class="flex flex-wrap -mx-3 mb-6">
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
							id="confirmPassword"
							type="password"
							placeholder="******************"
							x-model="password_confirm"
							required
							onChange={this.handleChange}
						/>
					</div>
					<p
						hidden={!this.state.pass || this.state.match}
						class="text-red-500 text-xs italic"
					>
						Password do not match
					</p>
				</div>

				<div class="flex flex-wrap -mx-3 mb-6">
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
								id="grid-gender"
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

				<div class="flex flex-wrap -mx-3 mb-6">
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
							id="grid-weight"
							type="number"
							placeholder="in kg"
						/>
					</div>

					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-height"
						>
							Height
						</label>
						<input
							name="height"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-height"
							type="number"
							placeholder="in cm"
						/>
					</div>
				</div>
				{/* 				
				<p hidden={this.state.match} class="text-red-500 text-xs italic">
					All * field is required :)
				</p>
				<br /> */}

				<button
					class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
					// disabled={!this.state.match}
					onClick={this.handleSubmit}
					id="button"
				>
					Create Account
				</button>
			</form>
		);
	}
}

export default SignUpForm;
