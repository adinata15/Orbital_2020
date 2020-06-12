//not done: make multiple in one row, image not distorted
import React from "react";
import Image from "../images/green.jpg";

class Card extends React.Component {
	render() {
		return (
			<div class=" w-56 bg-white justify-center border rounded-lg overflow-hidden mt-2 ml-2">
				<img class="h-48 w-full justify-center" src={Image} alt="" />
				<div class="p-2">
					<div class="flex items-baseline">
						<span class="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
							New
						</span>
						<div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
							Greenery
						</div>
					</div>
					<h4 class="mt-1 font-semibold text-lg leading-tight truncate">
						Fountain of Life
					</h4>
					<div>
						Price
						<span class="text-gray-600 text-sm"> : priceless</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Card;

// <!-- <div class="h-48 bg-cover bg-center" :style="{ backgroundImage: `url('${property.imageUrl}')`}"></div> -->

// <div class="sm:w-auto md:w-full lg:w-32 xl:w-3/4 px-6  rounded overflow-hidden shadow-lg">
// <img
// 	class="h-48 px-4 pt-4 object-cover"
// 	src={Image}
// 	alt="Picture of clothes"
// />
// <div class="px-6">
// 	<p class="font-bold text-xl mb-2">Product name</p>
// 	<p class="text-gray-700 text-base">Price</p>
// 	<p class="text-gray-700 text-base break-words">Description </p>
// </div>
// <div class="px-6 py-2">
// 	<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
// 		Like
// 	</span>
// 	<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
// 		Order
// 	</span>
// </div>
// </div>
