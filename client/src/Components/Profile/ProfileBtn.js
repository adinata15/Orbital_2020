import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/loginActions";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import UserImage from "../../images/user.svg";
import SellerImage from "../../images/seller.svg";

function ProfileBtn(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const differentOptions = () => {
		if (props.accounttype === "buyer") {
			return (
				<span>
					<MenuItem onClick={handleClose}>
						<Link to="/address">My address</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Link to="/order">My order</Link>
					</MenuItem>
				</span>
			);
		} else {
			return (
				<span>
					<MenuItem onClick={handleClose}>
						<Link to="/store">My store</Link>
					</MenuItem>
				</span>
			);
		}
	};

	return (
		<Fragment>
			<img
				className={"h-8 w-8 my-3 mr-3 float-right"}
				onClick={handleClick}
				src={props.accounttype === "buyer" ? UserImage : SellerImage}
				alt=""
				hidden={!props.isAuthenticated}
			/>

			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>
					<Link
						to={() => {
							return `/edit/profile/${props.accounttype}`;
						}}
					>
						My profile
					</Link>
				</MenuItem>

				{differentOptions()}

				<MenuItem
					onClick={() => {
						props.logout();
						handleClose();
					}}
				>
					Log out
				</MenuItem>
			</Menu>
		</Fragment>
	);
}

ProfileBtn.propTypes = {
	isAuthenticated: PropTypes.bool,
	logout: PropTypes.func.isRequired,
	accounttype: PropTypes.string,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, { logout })(ProfileBtn);
