import React from 'react';

import Alert from '../Alert.js';

class ClothesDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      size: 'S',
      quantity: '',
      alert: '',
      height: this.props.user.height,
      weight: this.props.user.weight,
      gender: this.props.user.gender,
    };
    //can bind function here! (we didnt bind here because we use arrow function below)
  }

  openDialog = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  likeItem = () => {
    let data = { size: this.state.size };
    this.props.likeItem(data, this.props.item._id);
  };

  cartItem = () => {
    if (!this.state.quantity) {
      this.setState({ alert: 'Please add desired quantity to add cart' });
    } else {
      let data = {
        size: this.state.size,
        quantity: this.state.quantity,
      };
      this.props.cartItem(data, this.props.item._id);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  getSizeRecommendation = e => {
    e.preventDefault();
    if (this.state.weight && this.state.height && this.state.gender) {
      let userData = {
        height: this.state.height,
        weight: this.state.weight,
        gender: this.state.gender,
      };

      this.props.getSizeRecommendation(userData);
    } else {
      this.openDialog();
    }
  };

  render() {
    return (
      <div
        className={
          'font-sans antialiased text-gray-900 leading-normal tracking-wider'
        }
      >
        <Alert />
        <div
          className={
            'max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0'
          }
        >
          <div
            className={
              'w-full lg:w-4/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0'
            }
          >
            <div className={'p-4 md:p-12 text-center lg:text-left'}>
              <h1 className={'text-3xl font-bold pt-24 lg:pt-0'}>
                Give us more information!
              </h1>

              <div className={'flex flex-wrap -mx-3 '}>
                {this.props.gender ? null : (
                  <div className={'w-full  md:w-1/2 px-3 md:mb-0'}>
                    <label
                      className={
                        'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      }
                      for="gender"
                    >
                      Gender
                    </label>
                    <div>
                      <select
                        className={
                          'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        }
                        id="gender"
                        onChange={e => this.handleChange(e)}
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </div>
                  </div>
                )}

                {this.props.weight ? null : (
                  <div className={'w-full md:w-1/2 px-3 mb-6 md:mb-0'}>
                    <label
                      className={
                        'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      }
                      for="weight"
                    >
                      Weight
                    </label>
                    <input
                      name="weight"
                      className={
                        'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      }
                      id="weight"
                      type="number"
                      placeholder="in kg"
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                )}
                {this.props.height ? null : (
                  <div className={'w-full md:w-1/2 px-3 mb-6 md:mb-0'}>
                    <label
                      className={
                        'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                      }
                      for="height"
                    >
                      Height
                    </label>
                    <input
                      name="height"
                      className={
                        'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      }
                      id="height"
                      type="number"
                      placeholder="in cm"
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                )}
              </div>

              <div className={'flex pt-8 pb-8'}>
                <button
                  onClick={() => this.onClose()}
                  className={
                    'flex-1 bg-teal-700 mx-2 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                  }
                >
                  Submit data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClothesDetail;
