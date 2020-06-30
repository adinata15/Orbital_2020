import React from "react";
import { Link } from "react-router-dom";
import Men from "../images/men.png";
import Women from "../images/women.png";
// import Men from "../images/men.png";

class ShopBar extends React.Component {
	render() {
		return (
			<div class=" bg-gray-200">
				<div class=" text-gray-700 text-center bg-gray-400 m-2">
					<Link
						onClick={(e) => this.props.menuSelect(e.target.name)}
						name="men"
						to="/shop"
					>
						<img class="object-cover" src={Men} />
					</Link>
				</div>
				<div class=" text-gray-700 text-center bg-gray-400 m-2">
					<Link
						onClick={(e) => this.props.menuSelect(e.target.name)}
						name="women"
						to="/shop"
					>
						<img class="object-cover" src={Women} />
					</Link>
				</div>
			</div>
		);
	}
}

export default ShopBar;
