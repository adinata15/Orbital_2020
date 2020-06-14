//not done: make multiple in one row, image not distorted
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import FitAssistCard from "./FitAssistCard";

class Card extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		open: false,
	// 	};
	// 	// this.handleClickOpen
	// }

	// handleClickOpen = () => {
	// 	this.setState({
	// 		open: true,
	// 	});
	// };

	// handleClose = () => {
	// 	this.setState({
	// 		open: false,
	// 	});
	// };
	render() {
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.props.handleClose}
					aria-labelledby="form-dialog-title"
					fullWidth={true}
					maxWidth={"md"}
					scroll={"body"}
				>
					<FitAssistCard onClose={this.props.handleClose} />
				</Dialog>
			</div>
		);
	}
}

export default Card;
