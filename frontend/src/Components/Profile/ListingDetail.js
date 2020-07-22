//items edit need size and item picture

import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editListing, deleteListing } from '../../actions/profileActions';
// import { setAlert } from '../../actions/alertActions';

class ListingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.itemInfo,
    };
    console.log(this.props.itemInfo);
  }

  editItem = () => {
    let data = { ...this.state };
    this.props.editListing(data, this.props.itemInfo._id);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div
        className={
          'font-sans antialiased text-gray-900 leading-normal tracking-wider'
        }>
        <div
          className={
            'max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0'
          }>
          <div
            className={
              'w-full lg:w-4/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0'
            }>
            <div className={'p-4 text-center '}>
              <div className={'w-full px-3 mb-6'}>
                <label
                  className={
                    'block uppercase tracking-wide text-black text-xs font-bold mb-2'
                  }
                  for='quantity'>
                  Title
                </label>
                <input
                  name='title'
                  className={
                    'appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  }
                  id='title'
                  type='text'
                  value={this.props.itemInfo.title}
                  onChange={this.handleChange}
                />
              </div>

              <div className={'w-1/2 px-3 mb-6 '}>
                <label
                  className={
                    'block uppercase tracking-wide text-black text-xs font-bold mb-2'
                  }
                  for='quantity'>
                  Price
                </label>
                <input
                  name='price'
                  className={
                    'appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  }
                  id='title'
                  type='number'
                  value={this.props.itemInfo.price}
                  onChange={this.handleChange}
                />
              </div>
              <div className={'w-1/2 px-3 mb-6 '}>
                <label
                  className={
                    'block uppercase tracking-wide text-black text-xs font-bold mb-2'
                  }
                  for='quantity'>
                  Brand
                </label>
                <input
                  name='brand'
                  className={
                    'appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  }
                  id='quantity'
                  type='text'
                  value={this.props.itemInfo.brand}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className={'flex flex-wrap -mx-3 '}>
              <div className={'w-full  md:w-1/2 px-3 md:mb-0'}>
                <label
                  className={
                    'block uppercase tracking-wide text-black text-xs font-bold mb-2'
                  }
                  for='size'>
                  Category
                </label>
                <div>
                  <select
                    value={this.props.itemInfo.category}
                    className={
                      'block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id='size'
                    onChange={this.handleChange}>
                    <option value='man'>Man</option>
                    <option value='woman'>Woman</option>
                    <option value='others'>Others</option>
                  </select>
                </div>
              </div>
            </div>

            {/* <p
                name='sizes'
                className={
                  'pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start'
                }>
                Available sizes
              </p> */}

            <div className={'flex pt-8 pb-8'}>
              <button
                onClick={this.editItem}
                className={
                  'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                }>
                Save edit
              </button>
              <button
                onClick={() =>
                  this.props.deleteListing(this.props.itemInfo._id)
                }
                className={
                  'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                }>
                Delete listing
              </button>
              <button
                onClick={this.props.onClose}
                className={
                  'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                }>
                Back
              </button>
            </div>
            <p className={'text-sm text-red-600'}>{this.state.alert}</p>
          </div>
        </div>
        <div className={'lg:w-1/5 lg:h-auto inset-y-0 right-0'}>
          <img
            src={this.props.itemInfo.images[0]}
            className={
              'rounded-none w-auto h-auto lg:rounded-lg shadow-2xl hidden lg:block'
            }
          />
        </div>
      </div>
    );
  }
}

ListingDetail.propTypes = {
  editListing: PropTypes.func,
  deleteListing: PropTypes.func,
};

export default connect(null, { editListing, deleteListing })(ListingDetail);
