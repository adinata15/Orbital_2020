import React from 'react';
import Image from '../../images/clothes.jpg';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/loginActions';

class FitAssistCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '',
      height: '',
    };
  }

  handleSubmit = (e) => {
    //for the thing inside target it can be anything!
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.traget.value,
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
            id='profile'
            className={
              'w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0'
            }>
            <div className={'p-4 md:p-12 text-center lg:text-left'}>
              <div
                className={
                  'block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center'
                }>
                <img
                  className={'block h-full w-full lg:hidden rounded-lg'}
                  src={Image}
                />
              </div>

              <h1 className={'text-3xl font-bold pt-24 lg:pt-0'}>
                Fit Assistant
              </h1>

              <p
                className={
                  'pt-4 text-base flex items-center justify-center lg:justify-start'
                }>
                Let us know you a bit more :)
              </p>

              <form
                onSubmit={this.handleSubmit}
                className={'flex justify-center flex-wrap mt-6 -mx-3'}>
                <div className='w-full max-w-md md:w-1/2 px-3 md:mb-0'>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    }
                    for='grid-height'>
                    Weight
                  </label>
                  <input
                    name='weight'
                    className={
                      'appearance-none block max-w-md w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id='grid-height'
                    onChange={this.handleChange}
                    type='number'
                    placeholder='in cm'
                    required
                  />
                </div>

                <div className='w-full max-w-md md:w-1/2 px-3 md:mb-0'>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    }
                    for='grid-height'>
                    Height
                  </label>
                  <input
                    name='height'
                    onChange={this.handleChange}
                    className={
                      'appearance-none block max-w-md w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id='grid-height'
                    type='number'
                    placeholder='in cm'
                    required
                  />
                </div>

                <div class='w-full px-3'>
                  <label
                    class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    for='grid-gender'>
                    Gender
                  </label>

                  <select
                    class='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    name='gender'
                    onChange={this.handleChange}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                  <div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      class='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'>
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
                <div className='pt-3 pb-8'>
                  <button
                    type='submit'
                    className={
                      'bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                    }>
                    Tell me my size
                  </button>
                  <button
                    onClick={this.props.onClose}
                    className={
                      'bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                    }>
                    Back to shop
                  </button>
                </div>
              </form>
              <p className={'text-s italic mt-3'}>
                Your size recommendation is <u>unknown</u>
              </p>
            </div>
          </div>

          <div className={'w-full lg:w-2/5 lg:h-4/5'}>
            <img
              src={Image}
              className={
                'rounded-none h-full w-full lg:rounded-lg shadow-2xl hidden lg:block'
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
FitAssistCard.propTypes = {
  loadUser: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loadUser: state.auth.loadUser,
  orders: state.auth.orders,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {
  loadUser,
})(FitAssistCard);
