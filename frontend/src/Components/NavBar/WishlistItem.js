import React from "react";
import axios from "axios";
import Image from "../../images/cart.png";

class ShopForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...this.props };
	}
	toCart = () => {
		//to do
	};
	render() {
		return (
			<div class=" p-2 font-sans antialiased text-gray-900 leading-normal tracking-wider">
				<div class="max-w-md flex items-center h-auto flex-wrap mx-auto shadow-md lg:my-3">
					<div class="w-3/5 rounded-lg lg:rounded-l-sm lg:rounded-r-none mx-3 lg:mx-0">
						<p class="pt-4 pl-4 text-base opacity-50 font-bold items-center lg:justify-start">
							{this.props.item.brand}
						</p>
						<h1 class="text-xl pl-4 font-bold pt-15 lg:pt-0 ">
							{this.props.item.title}
						</h1>
						<div class="ml-3 mx-auto pb-3 lg:mx-0 w-3/5 ">
							<p class="pt-4 pl-4 text-base items-center justify-center lg:justify-start">
								${this.props.item.price}
							</p>
							<p class="pt-4 pl-4 text-base items-center justify-center lg:justify-start">
								Size: {this.props.item.size}
							</p>
							<img
								class="h-8 w-8 ml-3 my-3 right-0 bottom-0"
								onClick={this.toCart}
								style={{ transform: "scaleX(-1)" }}
								src={Image}
							/>
						</div>
					</div>
					<div class="lg:w-32 lg:h-32 float-right">
						<img
							src={this.props.item.image}
							class="rounded-none w-32 object-cover h-32 lg:rounded-lg shadow-2xl lg:block"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ShopForm;
