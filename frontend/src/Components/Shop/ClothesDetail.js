import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import Dialog from "@material-ui/core/Dialog";

import Alert from "../Alert.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cartItem, likeItem } from "../../actions/shopActions";
import { getSizeRecommendationLogin } from "../../actions/menuSelect";

class ClothesDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addInfo: false,
			size: "S",
			quantity: null,
			alert: "",
			height: this.props.user.height ? this.props.user.height : null,
			weight: this.props.user.weight ? this.props.user.weight : null,
			gender: this.props.user.gender,
		};
		//can bind function here! (we didnt bind here because we use arrow function below)
	}

	likeItem = () => {
		let data = { size: this.state.size };
		this.props.likeItem(data, this.props.item._id);
	};

	cartItem = () => {
		if (!this.state.quantity) {
			this.setState({ alert: "Please add desired quantity to add cart" });
		} else {
			let data = {
				size: this.state.size,
				quantity: this.state.quantity,
			};
			this.props.cartItem(data, this.props.item._id);
		}
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	getSizeRecommendationLogin = (e) => {
		e.preventDefault();
		if (this.state.weight && this.state.height && this.state.gender) {
			let userData = {
				height: this.state.height,
				weight: this.state.weight,
				gender: this.state.gender,
			};
			this.props.getSizeRecommendationLogin(userData, this.props.item._id);
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
						"max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0"
					}
				>
					<div
						className={
							"w-full lg:w-4/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
						}
					>
						<div className={"p-4 md:p-12 text-center lg:text-left"}>
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
											value={this.state.size}
											className={
												"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											}
											id="size"
											onChange={this.handleChange}
										>
											<option value="S">S</option>
											<option value="M">M</option>
											<option value="L">L</option>
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
							{this.props.sizeRecommendation ? (
								<p
									className={
										"pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"
									}
								>
									Your size recommendation : {this.props.sizeRecommendation}
								</p>
							) : null}

							<button
								onClick={this.getSizeRecommendationLogin}
								className={
									"flex-1 bg-teal-700 my-2 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
								}
							>
								Tell me my size
							</button>
							<p className={"text-sm"}>Description: {this.props.item.desc}</p>

							<div className={"flex pt-8 pb-8"}>
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
	getSizeRecommendationLogin,
})(ClothesDetail);
