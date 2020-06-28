import React from 'react';
import Image from '../../images/green.jpg';
import Card from '../Shop/Card.js';
import axios from 'axios';

class ShopForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="font-sans antialiased text-gray-900 leading-normal tracking-wider">
        <div class="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 lg:my-10">
          <div
            id="profile"
            class="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl mx-6 lg:mx-0"
          >
            <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              {this.props.item.brand}
            </p>
            <h1 class="text-3xl font-bold pt-24 lg:pt-0">
              {this.props.item.title}
            </h1>
            <div class="ml-3 mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-teal-500 ">
              <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                ${this.props.item.price}
              </p>
              <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                {this.props.item.size}
              </p>
              <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                {this.props.item.quantity}
              </p>
              <img src={this.props.item.image} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShopForm;
