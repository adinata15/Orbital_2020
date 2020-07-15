//not done: make multiple in one row, image not distorted
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
// import Button from "@material-ui/core/Button";
import FitAssistCard from './FitAssistCard';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    //this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    return (
      <div>
        <button className={'subnavbtn'} onClick={this.handleClickOpen}>
          Fit Assist
        </button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth={'md'}
          scroll={'body'}>
          <FitAssistCard onClose={this.handleClose} />
        </Dialog>
      </div>
    );
  }
}

export default Card;
