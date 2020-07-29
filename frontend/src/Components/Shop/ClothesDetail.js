import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import Dialog from "@material-ui/core/Dialog";

import Alert from "../Alert.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cartItem, likeItem } from "../../actions/shopActions";
import { getSizeRecommendationLogin } from "../../actions/menuSelect";
import { setAlert } from "../../actions/alertActions";

class ClothesDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addInfo: false,
			size: this.props.item.sizes[0].size,
			quantity: null,
			alert: "",
			height: this.props.user.height ? this.props.user.height : null,
			weight: this.props.user.weight ? this.props.user.weight : null,
			gender: this.props.user.gender,
			showSizeChart: false,
			sizeRecommendation: "",
		};
		//can bind function here! (we didnt bind here because we use arrow function below)
	}

	likeItem = () => {
		if (this.props.user.accounttype === "buyer") {
			let data = { size: this.state.size };
			this.props.likeItem(data, this.props.item._id);
		} else this.props.setAlert("Login as buyer to like items", "danger");
	};

	cartItem = () => {
		if (this.props.user.accounttype === "buyer") {
			if (!this.state.quantity) {
				this.props.setAlert("Please input item quantity", "danger");
			} else {
				let data = {
					size: this.state.size,
					quantity: this.state.quantity,
				};
				this.props.cartItem(data, this.props.item._id);
			}
		} else this.props.setAlert("Login as buyer to cart items", "danger");
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	getSizeRecommendationLogin = async (e) => {
		e.preventDefault();
		if (this.state.weight && this.state.height && this.state.gender) {
			let userData = {
				height: this.state.height,
				weight: this.state.weight,
				gender: this.state.gender,
			};
			await this.props.getSizeRecommendationLogin(
				userData,
				this.props.item._id
			);
			this.setState({
				sizeRecommendation: this.props.sizeRecommendation,
			});
		} else {
			this.setState({ addInfo: true });
		}
	};

	render() {
		return (
			<div
				className={
					"font-sans antialiased text-gray-900 leading-normal tracking-wider"
				}
			>
				<Alert />
				<div
					className={
						"max-w-6xl flex items-center h-screen flex-wrap mx-auto my-2"
					}
				>
					<div
						className={
							"w-4/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
						}
					>
						<div className={"p-12 text-left"}>
							<h1 className={"text-3xl font-bold pt-24 lg:pt-0"}>
								{this.props.item.title}
							</h1>
							<p
								className={
									"pt-4 text-base font-bold flex items-center justify-center lg:justify-start"
								}
							>
								${this.props.item.price}
							</p>

							<div className={"flex flex-wrap -mx-3 "}>
								<div className={"w-full  md:w-1/2 px-3 md:mb-0"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										}
										for="size"
									>
										Size
									</label>
									<div>
										<select
											className={
												"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											}
											id="size"
											onChange={this.handleChange}
										>
											{this.props.item.sizes.map((size) => (
												<option
													selected={this.state.size === `${size.size}`}
													value={size.size}
												>
													{size.size}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className={"w-full md:w-1/2 px-3 mb-6 md:mb-0"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										}
										for="quantity"
									>
										Quantity
									</label>
									<input
										name="quantity"
										className={
											"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
										id="quantity"
										type="number"
										placeholder="in pieces"
										onChange={this.handleChange}
									/>
								</div>
							</div>
							{this.state.addInfo ? (
								<div className={"flex flex-wrap -mx-3 my-2"}>
									<div className={"w-1/2 px-3 mb-6 md:mb-0"}>
										<label
											className={
												"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											}
											for="weight"
										>
											Weight
										</label>
										<input
											name="weight"
											className={
												"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											}
											value={this.state.weight ? this.state.weight : null}
											id="weight"
											type="number"
											placeholder="in kg"
											onChange={(e) => this.handleChange(e)}
										/>
									</div>

									<div className={"w-1/2 px-3 mb-6 md:mb-0"}>
										<label
											className={
												"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											}
											for="height"
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
											placeholder="in cm"
											onChange={(e) => this.handleChange(e)}
											value={this.state.height ? this.state.height : null}
										/>
									</div>
									<p className={"ml-3 italic text-center text-red-600"}>
										Please fill in the information above!
									</p>
								</div>
							) : null}
							{this.state.sizeRecommendation ? (
								<p
									className={
										"pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"
									}
								>
									Your size recommendation : {this.state.sizeRecommendation}
								</p>
							) : null}
							<p className={"w-1/2 mb-2 pr-3"}>
								<span
									onClick={() =>
										this.setState({ showSizeChart: !this.state.showSizeChart })
									}
									className={
										"italic text-sm text-teal-700 underline hover:text-teal-900 hover:no-underline cursor-pointer"
									}
								>
									Display size tabel
								</span>
								<span
									onClick={this.getSizeRecommendationLogin}
									className={
										"float-right italic text-sm text-teal-700 underline hover:text-teal-900 hover:no-underline cursor-pointer"
									}
									hidden={!(this.props.user.accounttype === "buyer")}
								>
									Tell me my size
								</span>
							</p>
							{this.state.showSizeChart ? (
								<table
									id="tablesizes"
									className={"cursor-default w-full table-fixed text-center"}
								>
									<thead>
										<tr className="bg-gray-500">
											<th className={"px-2 py-2"}>Size</th>
											<th className={"px-2 py-2"}>Chest</th>
											<th className={"px-2 py-2"}>Body length</th>
											<th className={"px-2 py-2"}>Waist</th>
											<th className={"px-2 py-2"}>Skirt length</th>
											<th className={"px-2 py-2"}>Hip</th>
											<th className={"px-2 py-2"}>Total length</th>
											<th className={"px-2 py-2"}>Bust</th>
										</tr>
									</thead>
									<tbody>
										{this.props.item.sizes.map((val) => {
											return (
												<tr key={val.index}>
													<td className={"border px-2 py-2"}>{val.size}</td>
													<td className={"border px-2 py-2"}>
														{val.chest.from === -1
															? null
															: val.chest.from === val.chest.to
															? val.chest.from
															: `${val.chest.from}-${val.chest.to}`}
													</td>
													<td className={"border px-2 py-2"}>
														{val.bodylength.from === -1
															? null
															: val.bodylength.from === val.bodylength.to
															? val.bodylength.from
															: `${val.bodylength.from}-${val.bodylength.to}`}
													</td>
													<td className={"border px-2 py-2"}>
														{val.waist.from === -1
															? null
															: val.waist.from === val.waist.to
															? val.waist.from
															: `${val.waist.from}-${val.waist.to}`}
													</td>
													<td className={"border px-2 py-2"}>
														{val.hip.from === -1
															? null
															: val.hip.from === val.hip.to
															? val.hip.from
															: `${val.hip.from}-${val.hip.to}`}
													</td>
													<td className={"border px-2 py-2"}>
														{val.totallength.from === -1
															? null
															: val.totallength.from === val.totallength.to
															? val.totallength.from
															: `${val.totallength.from}-${val.totallength.to}`}
													</td>
													<td className={"border px-2 py-2"}>
														{val.bust.from === -1
															? null
															: val.bust.from === val.bust.to
															? val.bust.from
															: `${val.bust.from}-${val.bust.to}`}
													</td>
													<td className={"border px-2 py-2"}>
														{val.skirtlength.from === -1
															? null
															: val.skirtlength.from === val.skirtlength.to
															? val.skirtlength.from
															: `${val.skirtlength.from}-${val.skirtlength.to}`}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							) : null}
							<div className={"flex py-4"}>
								<button
									onClick={this.cartItem}
									className={
										"flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
									}
								>
									Add to cart
								</button>
								<button
									onClick={this.likeItem}
									className={
										"flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
									}
								>
									Like
								</button>
								<button
									onClick={this.props.onClose}
									className={
										"flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
									}
								>
									Back to shop
								</button>
							</div>
							<p className={"text-sm text-red-600"}>{this.state.alert}</p>
						</div>
					</div>
					<div className={"lg:w-1/5 lg:h-auto inset-y-0 right-0"}>
						<Carousel
							axis="horizontal"
							showThumbs={false}
							showStatus={false}
							autoPlay={true}
							transitionTime={500}
							swipeable={true}
							infiniteLoop={true}
							dynamicHeight={true}
						>
							{this.props.item.images.map((image) => (
								<div>
									<img className={"block h-full w-full"} src={image} alt="" />
								</div>
							))}
						</Carousel>
						{/* <Dialog
							open={this.state.open}
							onClose={this.handleClose}
							aria-labelledby="form-dialog-title"
							fullWidth={true}
							maxWidth={"sm"}
							scroll={"body"}
						>
							<ClothesMoreInfo
								weight={this.state.weight}
								height={this.state.height}
								gender={this.state.gender}
								handleChange={this.handleChange}
								handleClose={this.handleClose}
							/>
						</Dialog> */}
					</div>
				</div>
			</div>
		);
	}
}

ClothesDetail.propTypes = {
	likeItem: PropTypes.func,
	cartItem: PropTypes.func,
	setAlert: PropTypes.func,
	getSizeRecommendationLogin: PropTypes.func,
	user: PropTypes.object,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	sizeRecommendation: state.menu.sizeRecommendation,
});

export default connect(mapStateToProps, {
	cartItem,
	likeItem,
	setAlert,
	getSizeRecommendationLogin,
})(ClothesDetail);
