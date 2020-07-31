//not done:slide 1->2->3->1,make pic center on large page
//solved:remove three dot on top and bottom (make the radio input hidden)

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import Image from "../images/sale.jpg";
import Image2 from "../images/sale2.jpg";
import Image3 from "../images/clothes.jpg";

class DemoCarousel extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {};
	// 	//can bind function here! (we didnt bind here because we use arrow function below)
	// }
	render() {
		return (
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
				<div>
					<img
						className={"object-fill w-full"}
						style={{ height: "30em" }}
						src={Image}
						alt=""
					/>
				</div>
				<div>
					<img
						className={"object-fill w-full"}
						style={{ height: "30em" }}
						src={Image2}
						alt=""
					/>
				</div>
				<div>
					<img
						className={"object-fill w-full"}
						style={{ height: "30em" }}
						src={Image3}
						alt=""
					/>
				</div>
			</Carousel>
		);
	}
}

export default DemoCarousel;
