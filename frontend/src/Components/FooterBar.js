//solved: why no css styling? styling name is in old format
import React from "react";

class FooterBar extends React.Component {
	render() {
		return (
			<footer class="bg-gray-800 p-3">
				<div class="sm:flex mb-4">
					<div class="sm:w-1/4 h-auto sm:mt-0 mt-8">
						<div class="text-xl text-orange-500 mb-2">Men</div>
						<ul class="leading-normal ">
							<li class="hover:text-orange-500 hover:underline text-white">
								Pants
							</li>
							<li class="hover:text-orange-500 hover:underline text-white">
								T-shirt
							</li>
							<li class="hover:text-orange-500 hover:underline text-white">
								Shorts
							</li>
						</ul>

						<div class="text-xl text-teal-300 mb-2 mt-4">Kids</div>
						<ul class="leading-normal">
							<li class="hover:text-teal-300 hover:underline  text-white">
								Shirt
							</li>
							<li class="hover:text-teal-300 hover:underline  text-white">
								Pants
							</li>
							<li class="hover:text-teal-300 hover:underline  text-white">
								Cap
							</li>
							<li class="hover:text-teal-300 hover:underline  text-white">
								Diapers
							</li>
						</ul>
					</div>
					<div class="sm:w-1/4 h-auto sm:mt-0 mt-8">
						<div class="text-xl text-blue-300 mb-2">Women</div>
						<ul class=" leading-normal">
							<li class="hover:text-blue-300 hover:underline  text-white">
								Dress
							</li>
							<li class="hover:text-blue-300 hover:underline  text-white">
								Shirt
							</li>
							<li class="hover:text-blue-300 hover:underline  text-white">
								Skirt
							</li>
							<li class="hover:text-blue-300  hover:underline text-white">
								Pants
							</li>
						</ul>
						<div class="text-xl text-green-500 mt-2">Fit Assistant</div>
						<ul class=" leading-normal">
							<li class="hover:text-green-500 hover:underline  text-white">
								Know your size!
							</li>
						</ul>
					</div>

					<div class="sm:w-1/2 sm:mt-0 mt-8 h-auto">
						<div class="text-xl text-red-500 mb-2">Newsletter</div>
						<p class="text-white leading-normal">
							Want to receive daily promotions and offers from us?
						</p>
						<div class="mt-4 flex">
							<input
								type="email"
								class="p-2 border border-white rounded-l-md text-black text-sm h-auto"
								placeholder="Your email address"
							/>
							<button class="bg-red-800 hover:bg-red-600 rounded-r-md text-white h-auto text-xs p-2">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default FooterBar;
