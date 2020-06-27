import React from 'react';
import Image from '../../images/green.jpg';

class ClothesDetail extends React.Component {
  // constructor(props) {
  // 	super(props);
  // 	this.state = {};
  // 	//can bind function here! (we didnt bind here because we use arrow function below)
  // }

  // handleClick = (e) => {
  // 	//for the thing inside target it can be anything!
  // 	this.setState({});
  // };

  render() {
    return (
      <div class="font-sans antialiased text-gray-900 leading-normal tracking-wider">
        <div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
          <div
            id="profile"
            class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
          >
            <div class="p-4 md:p-12 text-center lg:text-left">
              <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
                <img
                  class="block h-full w-full lg:hidden rounded-lg"
                  src={this.props.item.images[0]}
                />
              </div>

              <h1 class="text-3xl font-bold pt-24 lg:pt-0">
                {this.props.item.title}
              </h1>
              <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-teal-500 opacity-25"></div>
              <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                ${this.props.item.price}
              </p>
              <p class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                Your size recommendation : S
              </p>
              <p class="pt-8 text-sm">Description: {this.props.item.desc} </p>

              <div class="pt-12 pb-8">
                <button class="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full">
                  Add to cart
                </button>
                <button
                  onClick={this.props.onClose}
                  class="bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full"
                >
                  Back to shop
                </button>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-2/5 lg:h-4/5">
            <img
              src={this.props.item.images[0]}
              class="rounded-none h-full w-full lg:rounded-lg shadow-2xl hidden lg:block"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ClothesDetail;
