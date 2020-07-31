import React from "react";
import omit from "lodash.omit";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSizeRecommendation } from "../../actions/menuSelect";

import Image from "../../images/plus.svg";
import DeleteImage from "../../images/delete.svg";

class FitAssistCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			weight: "",
			height: "",
			gender: "M",
			unit: "cm",
			meatype: "garment",
			category: "tshirt",
			sizeTable: [
				{
					index: Math.random(),
					size: "",
					chest: "",
					waist: "",
				},
			],
			sizeRecommendation: "",
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		let sizeData = {};

		this.state.sizeTable.forEach((size, idx) => {
			sizeData[`size${idx + 1}`] = size.size;
			sizeData[`size${idx + 1}chest`] = size.chest;
			sizeData[`size${idx + 1}waist`] = size.waist;
		});
		console.log(this.state);

		let bodyData = { ...this.state, ...sizeData };
		bodyData = omit(bodyData, "sizeTable");
		await this.props.getSizeRecommendation(bodyData);
		this.setState({
			sizeRecommendation: this.props.sizeRecommendation,
		});
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleChangeTable = (e) => {
		let sizeTable = [...this.state.sizeTable];
		sizeTable[e.target.dataset.id][e.target.name] = e.target.value;
	};

	removeRow = (row) => {
		this.setState({
			sizeTable: this.state.sizeTable.filter((r) => r !== row),
		});
	};

	addRow = () => {
		if (this.state.sizeTable.length === 8) return;
		this.setState((prevState) => ({
			sizeTable: [
				...prevState.sizeTable,
				{
					index: Math.random(),
					size: "",
					chest: "",
					waist: "",
				},
			],
		}));
	};

	render() {
		return (
			<div
				className={
					"font-sans antialiased text-gray-900 leading-normal tracking-wider"
				}
			>
				<div
					className={
						"max-w-4xl flex items-center h-auto flex-wrap mx-auto my-10"
					}
				>
					<div
						id="profile"
						className={"w-full rounded-lg shadow-2xl bg-white opacity-75 mx-0"}
					>
						<div className={"p-4 text-center "}>
							<h1 className={"text-3xl font-bold pt-5"}>Fit Assistant</h1>
							{!this.state.sizeRecommendation ||
							this.state.sizeRecommendation === "Size not found" ? (
								<p className={"text-s text-red-600 italic mt-3"}>
									{this.state.sizeRecommendation}
								</p>
							) : (
								<p className={"text-s italic mt-3"}>
									Your size recommendation :{" "}
									{this.state.sizeRecommendation.toUpperCase()}
								</p>
							)}
							<form
								onSubmit={this.handleSubmit}
								className={"flex justify-center flex-wrap mt-6 -mx-3"}
							>
								<div className="w-full max-w-md md:w-1/2 px-3 md:mb-0">
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
										}
										for="grid-height"
									>
										Weight
									</label>
									<input
										name="weight"
										className={
											"appearance-none block max-w-md w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
										id="grid-height"
										onChange={this.handleChange}
										type="number"
										placeholder="in kg"
										required
									/>
								</div>

								<div className="w-full max-w-md md:w-1/2 px-3 md:mb-0">
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
										}
										for="grid-height"
									>
										Height
									</label>
									<input
										name="height"
										onChange={this.handleChange}
										className={
											"appearance-none block max-w-md w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
										id="grid-height"
										type="number"
										placeholder="in cm"
										required
									/>
								</div>

								<div className={"w-1/2 px-3"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
										}
										for="grid-gender"
									>
										Gender
									</label>
									<div className={"relative"}>
										<select
											className={
												"block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											}
											name="gender"
											onChange={this.handleChange}
										>
											<option value="M">Male</option>
											<option value="F">Female</option>
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
								<div className={"w-1/2 px-3"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
										}
										for="category"
									>
										Category
									</label>
									<div className={"relative"}>
										<select
											className={
												"block appearance-none w-full bg-gray-200 border text-black border-gray-20 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											}
											name="category"
											onChange={this.handleChange}
										>
											<option value="tshirt">T-Shirt</option>
											<option value="shirt">Shirt</option>
											<option value="skirt">Skirt</option>
											<option value="pants">Pants</option>
											<option value="jeans">Jeans</option>
											<option value="shorts">Shorts</option>
											<option value="dress">Dress</option>
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

								<div className={"w-1/2 px-3"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
										}
										for="unit"
									>
										Measurement unit
									</label>
									<div className={"relative"}>
										<select
											className={
												"block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											}
											name="unit"
											onChange={this.handleChange}
										>
											<option value="cm">cm</option>
											<option value="in">inches</option>
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

								<div className={"w-1/2 px-3"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold my-2"
										}
										for="meatype"
									>
										Measurement Type
									</label>
									<div className={"relative"}>
										<select
											className={
												"block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											}
											name="meatype"
											onChange={this.handleChange}
										>
											<option value="garment">Cloth measurements</option>
											<option value="body">Body measurements</option>
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
								<div className={"w-full"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold my-2 mx-3"
										}
									>
										Size table
									</label>
									<table id="tableSizeTable" className="table-fixed mx-3">
										<thead>
											<tr className="bg-gray-500">
												<th className={"px-2 py-2"}>Size</th>
												<th className={"px-2 py-2"}>Chest</th>
												<th className={"px-2 py-2"}>Waist</th>
											</tr>
										</thead>
										<tbody>
											{this.state.sizeTable.map((val, idx) => {
												let size = `size${idx}`,
													chest = `size${idx}chest`,
													waist = `size${idx}waist`;

												return (
													<tr key={val.index}>
														<td className={"border px-4"}>
															<input
																className="w-full"
																type="text"
																name="size"
																data-id={idx}
																id={size}
																onChange={(e) => this.handleChangeTable(e)}
															/>
														</td>
														<td className={"border px-4"}>
															<input
																className="w-full"
																type="text"
																name="chest"
																id={chest}
																data-id={idx}
																required={
																	this.state.category === "shirt" ||
																	this.state.category === "dress" ||
																	this.state.category === "tshirt"
																}
																onChange={(e) => this.handleChangeTable(e)}
															/>
														</td>
														<td className={"border px-4"}>
															<input
																className="w-full"
																type="text"
																name="waist"
																id={waist}
																data-id={idx}
																required={
																	this.state.category === "pants" ||
																	this.state.category === "shorts" ||
																	this.state.category === "skirt" ||
																	this.state.category === "jeans"
																}
																onChange={(e) => this.handleChangeTable(e)}
															/>
														</td>
														<td className={"border-l px-1"}>
															{idx === 0 ? (
																<div className={"p-1 w-10 h-10"}>
																	<img
																		onClick={() => this.addRow()}
																		src={Image}
																		alt=""
																	/>
																</div>
															) : (
																<div className={"p-1 w-10 h-10"}>
																	<img
																		onClick={() => this.removeRow(val)}
																		src={DeleteImage}
																		alt=""
																	/>
																</div>
															)}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
								<div className={"py-5"}>
									<button
										type="submit"
										className={
											"bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
										}
									>
										Tell me my size
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
FitAssistCard.propTypes = {
	getSizeRecommendation: PropTypes.func,
	sizeRecommedation: PropTypes.string,
};

const mapStateToProps = (state) => ({
	sizeRecommendation: state.menu.sizeRecommendation,
});

export default connect(mapStateToProps, {
	getSizeRecommendation,
})(FitAssistCard);
