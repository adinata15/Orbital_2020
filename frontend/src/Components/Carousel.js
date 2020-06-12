//not done:slide 1->2->3->1,make pic center on large page
//solved:remove three dot on top and bottom (make the radio input hidden)

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ImageSign from "../images/signature.jpeg";

import Image from "../images/green.jpg";

class DemoCarousel extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		carouselPage: "carousel-1",
	// 	};
	// 	//can bind function here! (we didnt bind here because we use arrow function below)
	// }

	// handleClick = (e) => {
	// 	//for the thing inside target it can be anything!
	// 	this.setState({
	// 		option: e.target.id,
	// 	});
	// };
	render() {
		return (
			<Carousel
				axis="horizontal"
				showThumbs={false}
				showArrows={true}
				// onChange={onChange}
				// onClickItem={onClickItem}
				// onClickThumb={onClickThumb}
			>
				<div>
					<img src={Image} />
					<p className="legend">Legend 1</p>
				</div>
				<div>
					<img src={ImageSign} />
					<p className="legend">Legend 2</p>
				</div>
				<div>
					<img src={Image} />
					<p className="legend">Legend 3</p>
				</div>
			</Carousel>
		);
	}
}

export default DemoCarousel;

// render() {
// 	return (
// 		<div class="carousel relative shadow-2xl bg-white">
// 			<div class="carousel-inner relative rounded-lg overflow-hidden object-cover w-full">
// 				<input
// 					class="carousel-open"
// 					type="radio"
// 					id="carousel-1"
// 					name="carousel"
// 					aria-hidden="true"
// 					hidden="true"
// 					checked="true"
// 				/>
// 				<div
// 					class="carousel-item absolute opacity-0"
// 					style={{ height: "50vh" }}
// 				>
// 					<div>
// 						<div class="text-black text-5xl text-center centered">
// 							Slide 1
// 						</div>
// 						<img class="block h-full w-full object-center" src={Image} />
// 					</div>
// 				</div>
// 				<label
// 					for="carousel-2"
// 					class="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
// 				>
// 					‹
// 				</label>
// 				<label
// 					for="carousel-2"
// 					class="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
// 				>
// 					›
// 				</label>

// 				<input
// 					class="carousel-open"
// 					type="radio"
// 					id="carousel-2"
// 					name="carousel"
// 					aria-hidden="true"
// 					hidden="true"
// 					checked=""
// 				/>
// 				<div
// 					class="carousel-item absolute opacity-0"
// 					style={{ height: "50vh" }}
// 				>
// 					<div class="text-black text-5xl text-center centered">Slide 2</div>
// 				</div>
// 				<label
// 					for="carousel-1"
// 					class="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
// 				>
// 					‹
// 				</label>
// 				<label
// 					for="carousel-1"
// 					class="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
// 				>
// 					›
// 				</label>
// 				{/*
// 				<input
// 					class="carousel-open"
// 					type="radio"
// 					id="carousel-3"
// 					name="carousel"
// 					aria-hidden="true"
// 					hidden="true"
// 					checked=""
// 				/>
// 				<div
// 					class="carousel-item absolute opacity-0"
// 					style={{ height: "50vh" }}
// 				>
// 					<div class="text-black text-5xl text-center centered">Slide 3</div>
// 				</div>
// 				<label
// 					for="carousel-2"
// 					class="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
// 				>
// 					‹
// 				</label>
// 				<label
// 					for="carousel-1"
// 					class="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
// 				>
// 					›
// 				</label> */}

// 				<ol class="carousel-indicators">
// 					<li class="inline-block mr-3">
// 						<label
// 							for="carousel-1"
// 							class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700"
// 						>
// 							•
// 						</label>
// 					</li>
// 					<li class="inline-block mr-3">
// 						<label
// 							for="carousel-2"
// 							class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700"
// 						>
// 							•
// 						</label>
// 					</li>
// 					{/* <li class="inline-block mr-3">
// 						<label
// 							for="carousel-3"
// 							class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700"
// 						>
// 							•
// 						</label>
// 					</li> */}
// 				</ol>
// 			</div>
// 		</div>
// 	);
// }
// }
// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls
