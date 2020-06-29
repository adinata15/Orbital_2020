import React from "react";
import Image from "../../images/green.jpg";
import Card from "../Shop/Card.js";
import axios from "axios";

class ShopForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div class=" p-3 font-sans antialiased text-gray-900 leading-normal tracking-wider">
				<div class="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-5 shadow-md lg:my-10">
					<div class="w-4/5 rounded-lg lg:rounded-l-sm lg:rounded-r-none mx-6 lg:mx-0">
						<p class="pt-4 pl-4 text-base font-bold items-center justify-center lg:justify-start">
							{this.props.item.brand}
						</p>
						<h1 class="text-3xl pl-4 font-bold pt-24 lg:pt-0">
							{this.props.item.title}
						</h1>
						<div class="ml-3 mx-auto pb-3 lg:mx-0 w-4/5">
							<p class="pt-4 pl-4 text-base items-center justify-center lg:justify-start">
								${this.props.item.price}
							</p>
							<p class="pt-4 pl-4 text-base items-center justify-center lg:justify-start">
								Size: {this.props.item.size}
							</p>
							<p class="pt-4 pl-4 text-base items-center justify-center lg:justify-start">
								Quantity: {this.props.item.quantity}
							</p>
						</div>
					</div>
					<div class="lg:h-48 inset-y-0 right-0">
						<img
							src={this.props.item.image}
							class="rounded-none w-auto h-48 lg:rounded-lg shadow-2xl hidden lg:block"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ShopForm;
