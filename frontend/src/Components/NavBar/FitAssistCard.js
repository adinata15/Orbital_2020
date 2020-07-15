import React from 'react';
import Image from '../../images/clothes.jpg';

class FitAssistCard extends React.Component {
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

              <div className={'flex justify-center flex-wrap mt-6 -mx-3'}>
                <div className='w-full max-w-md md:w-1/2 px-3 md:mb-0'>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    }
                    for='grid-height'>
                    Weight
                  </label>
                  <input
                    name='height'
                    className={
                      'appearance-none block max-w-md w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id='grid-height'
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
                    className={
                      'appearance-none block max-w-md w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    }
                    id='grid-height'
                    type='number'
                    placeholder='in cm'
                    required
                  />
                </div>
              </div>
              <p className={'text-s italic mt-3'}>
                Your size recommendation is <u>unknown</u>
              </p>

              <div className='pt-3 pb-8'>
                <button
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

export default FitAssistCard;
