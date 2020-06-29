import React from "react";
import Image from "../../images/green.jpg";
import axios from "axios";

class ClothesDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: "",
			quantity: "",
		};
		//can bind function here! (we didnt bind here because we use arrow function below)
	}

	addCart = () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": this.props.token,
			},
		};

		axios
			.put(`http://localhost:5000/api/items/cart/${this.props.item.id}`, config)
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
		this.setState({
			[e.target.id]: e.target.value,
		});
	};
	render() {
		return (
			<div class="font-sans antialiased text-gray-900 leading-normal tracking-wider">
				<div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
					<div class="w-full lg:w-4/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
						<div class="p-4 md:p-12 text-center lg:text-left">
							<div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
								<img
									class="block h-full w-full lg:hidden rounded-lg"
									src={this.props.item.images[0]}
								/>
							</div>

							<h1 class="text-3xl font-bold pt-24 lg:pt-0">
								{this.props.item.title}
							</h1>
							<div class="mx-auto lg:mx-0 w-full pt-3 border-b-2 border-teal-500 opacity-25"></div>
							<p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
								${this.props.item.price}
							</p>
							<p class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
								Your size recommendation : S
							</p>
							<div class="flex flex-wrap -mx-3 ">
								<div class="w-full  md:w-1/2 px-3 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="size"
									>
										Size
									</label>
									<div>
										<select
											class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="size"
											onChange={this.handleChange}
										>
											<option>S</option>
											<option>M</option>
											<option>L</option>
										</select>
										{/* <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
											<svg
												class="fill-current h-4 w-4"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
											>
												<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
											</svg>
										</div> */}
									</div>
								</div>

								<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										for="quantity"
									>
										Quantity
									</label>
									<input
										name="quantity"
										class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="quantity"
										type="number"
										placeholder="in kg"
										onChange={this.handleChange}
									/>
								</div>
							</div>

							<p class="pt-8 text-sm">Description: {this.props.item.desc} </p>

							<div class="pt-8 pb-8">
								<button
									onClick={this.addCart}
									class="bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
								>
									Add to cart
								</button>
								<button
									onClick={this.props.addWishlist}
									class="bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
								>
									Like
								</button>
								<button
									onClick={this.props.onClose}
									class="bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
								>
									Back to shop
								</button>
							</div>
						</div>
					</div>
					<div class="lg:w-1/5 lg:h-auto inset-y-0 right-0">
						<img
							src={this.props.item.images[0]}
							class="rounded-none w-auto h-auto lg:rounded-lg shadow-2xl hidden lg:block"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ClothesDetail;
