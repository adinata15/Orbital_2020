import React from "react";
import { Route, Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Image from "../../images/plus.jpg";

export default function SimpleMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	// super(props);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<img
				class="h-8 w-8 my-3 ml-3 float-right"
				onClick={handleClick}
				src={Image}
				hidden={!props.isLogged}
			/>

			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>
					<Link to="/edit/profile">Edit profile</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link to="/myaccount">My account</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link to="/logout">Log out</Link>
				</MenuItem>
			</Menu>
		</div>
	);
}
