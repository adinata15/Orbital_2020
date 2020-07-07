import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../../actions/shopActions';

import Carousel from '../Carousel';
import Card from './Card.js';

class ShopMenu extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   items: [],
    // };
  }
  componentWillMount() {
    this.props.getItems(this.props.menuChosen);
  }

  render() {
    let item = this.props.itemDisplayed;

    return (
      <div>
        <Carousel />
        <div class='flex flex-wrap justify-center mb-3 border-solid border-2 rounded'>
          {item.map((item) => (
            <Card key={item._id} item={item} class='flex-none' />
          ))}
        </div>
      </div>
    );
  }
}

ShopMenu.propTypes = {
  getItems: PropTypes.func.isRequired,
  menuChosen: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  menuChosen: state.menu.menuChosen,
  itemDisplayed: state.shop.itemDisplayed,
});

export default connect(mapStateToProps, { getItems })(ShopMenu);
