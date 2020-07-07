//not done: make multiple in one row, image not distorted
import React from 'react';
import heartImg from '../../images/heart.png';
import ClothesDetail from './ClothesDetail';
import Dialog from '@material-ui/core/Dialog';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      size: '',
    };
    // this.handleClickOpen
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

  handleChange = (e) => {
    this.setState({
      size: e.target.value.toUpperCase(),
    });
  };

  render() {
    return (
      <div class=' w-56 bg-white justify-center border rounded-lg overflow-hidden mt-2 ml-2'>
        <img
          onClick={this.handleClickOpen}
          class='h-48 w-full justify-center'
          src={this.props.item.images[0]}
          alt=''
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
          fullWidth={true}
          maxWidth={'md'}
          scroll={'body'}>
          <ClothesDetail
            item={this.props.item}
            onClose={this.handleClose}
            // addWishlist={this.props.addWishlist}
          />
        </Dialog>

        <div class='p-2'>
          <div class='flex items-baseline'>
            <div class='text-gray-600 text-xs uppercase font-semibold tracking-wide'>
              {this.props.item.brand}
            </div>
          </div>
          <h4 class='mt-1 font-semibold text-lg leading-tight truncate'>
            {this.props.item.title}
          </h4>
          <div>${this.props.item.price}</div>
        </div>
      </div>
    );
  }
}

export default Card;
