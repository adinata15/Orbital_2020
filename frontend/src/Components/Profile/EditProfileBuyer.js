//left shipping and billing address
//need to do pasword confirmation
//gender cant update
//editting file upload

import React from "react";
// import omit from "lodash.omit";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile } from "../../actions/profileActions";

class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.user,
			editpass: false,
			password: "",
			newPassword: "",
			newPassword2: "",
			height: this.props.user.height ? this.props.user.height : null,
			weight: this.props.user.weight ? this.props.user.weight : null,
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let userData = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			newPassword: this.state.newPassword,
			newPassword2: this.state.newPassword2,
			height: this.state.height,
			weight: this.state.weight,
			gender: this.state.gender,
		};
		console.log(userData);
		this.props.editProfile(userData, this.props.user.accounttype);
	};

	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value,
		});
		console.log(this.state);
	};

	render() {
		if (this.props.user.accounttype === "seller") window.location.assign("/");
		return (
			<form
				onSubmit={this.handleSubmit}
				className={"w-full max-w-lg mx-auto my-6"}
			>
				<h1 className={"text-center text-3xl mb-3"}>My Profile</h1>

				<div className={"flex flex-wrap -mx-3 mb-6"}>
					<div className={"w-full md:w-1/2 px-3 mb-6 md:mb-0"}>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							}
							for="grid-user-id"
						>
							User ID
						</label>
						<input
							name="name"
							className={
								"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							}
							id="name"
							value={this.state.name}
							type="text"
							placeholder="Jane"
							onChange={this.handleChange}
						/>
					</div>

					<div className={"w-full md:w-1/2 px-3 mb-6 md:mb-0"}>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							}
							for="grid-email"
						>
							Email
						</label>
						<input
							name="email"
							className={
								"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							}
							id="email"
							type="email"
							value={this.state.email}
							placeholder="jane@gmail.com"
							onChange={this.handleChange}
						/>
					</div>
				</div>

				<div className={"flex flex-wrap -mx-3 mb-6"}>
					<div className={"w-full px-3"}>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							}
							for="grid-gender"
						>
							Gender
						</label>
						<div className="relative">
							<select
								className={
									"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								}
								name="gender"
								id="gender"
								onChange={this.handleChange}
							>
								<option selected={this.state.gender === "M"} value="M">
									Male
								</option>
								<option selected={this.state.gender === "F"} value="F">
									Female
								</option>
							</select>
							<div
								className={
									"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
								}
							>
								<svg
									className={"fill-current h-4 w-4"}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div className={"flex flex-wrap -mx-3 mb-6"}>
					<div className={"w-full md:w-1/2 px-3 mb-6 md:mb-0"}>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							}
							for="grid-weight"
						>
							Weight
						</label>
						<input
							name="weight"
							className={
								"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							}
							id="weight"
							type="number"
							value={this.state.weight}
							placeholder="in kg"
							onChange={this.handleChange}
						/>
					</div>

					<div className={"w-full md:w-1/2 px-3 mb-6 md:mb-0"}>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							}
							for="grid-height"
						>
							Height
						</label>
						<input
							name="height"
							className={
								"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							}
							id="height"
							type="number"
							value={this.state.height}
							placeholder="in cm"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className={"flex flex-wrap -mx-3 mb-6"}>
					<button
						className={
							"bg-gray-800 hover:bg-gray-600 text-white font-bold mx-3 py-3 px-4 rounded"
						}
						type="button"
						id="editpass"
						onClick={() => this.setState({ editpass: !this.state.editpass })}
						hidden={this.state.editpass}
					>
						Edit Password
					</button>
					<div className={"w-full px-3"} hidden={!this.state.editpass}>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							}
							for="grid-password"
						>
							Old password
						</label>
						<input
							name="password"
							className={
								"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							}
							id="password"
							type="password"
							placeholder="Leave blank if no edit required"
							minlength="8"
							onChange={this.handleChange}
						/>
					</div>
					<div className={"w-full px-3"} hidden={!this.state.editpass}>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							}
							for="grid-password"
						>
							New password
						</label>
						<input
							name="newPassword"
							className={
								"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							}
							id="newPassword"
							type="password"
							placeholder="******************"
							minlength="8"
							onChange={this.handleChange}
						/>
					</div>
					<div className={"w-full px-3"} hidden={!this.state.editpass}>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							}
							for="grid-password"
						>
							Confirm new password
						</label>
						<input
							name="newPassword2"
							className={
								"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							}
							id="newPassword2"
							type="password"
							placeholder="******************"
							minlength="8"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<button
					className={
						"bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
					}
					type="submit"
					id="savechanges"
				>
					Save Changes
				</button>
			</form>
		);
	}
}

EditProfile.propTypes = {
	editProfile: PropTypes.func,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { editProfile })(EditProfile);
