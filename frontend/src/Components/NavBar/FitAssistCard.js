import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSizeRecommendation } from '../../actions/menuSelect';

class FitAssistCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: null,
      height: null,
      gender: 'male',
      unit: 'cm',
      meatype: 'garmen',
      category: 'shirt',
      sizeTable: [
        {
          index: Math.random(),
          size: '',
          chest: '',
          bl: '',
          waist: '',
          hip: '',
          tl: '',
          bust: '',
          sl: '',
        },
      ],
    };
  }

  handleSubmit = (e) => {
    //for the thing inside target it can be anything!
    this.props.getSizeRecommendation(...this.state);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeTable = (e) => {
    let sizeTable = [...this.state.sizeTable];
    sizeTable[e.target.dataset.id][e.target.name] = e.target.value;
  };

  removeRow = (row) => {
    this.setState({
      sizeTable: this.state.sizeTable.filter((r) => r !== row),
    });
  };

  addRow = () => {
    if (this.state.sizeTable.length === 8) return;
    this.setState((prevState) => ({
      sizeTable: [
        ...prevState.sizeTable,
        {
          index: Math.random(),
          size: '',
          chest: '',
          bl: '',
          waist: '',
          hip: '',
          tl: '',
          bust: '',
          sl: '',
        },
      ],
    }));
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
            className={'w-full rounded-lg shadow-2xl bg-white opacity-75 mx-0'}>
            <div className={'p-4 md:p-12 text-center lg:text-left'}>
              <h1 className={'text-3xl font-bold pt-24 lg:pt-0'}>
                Fit Assistant
              </h1>

              <form
                onSubmit={this.handleSubmit}
                className={'flex justify-center flex-wrap mt-6 -mx-3'}>
                <div className='w-full max-w-md md:w-1/2 px-3 md:mb-0'>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'
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
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'
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

                <div className={'w-1/2 px-3'}>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'
                    }
                    for='grid-gender'>
                    Gender
                  </label>
                  <div className={'relative'}>
                    <select
                      className={
                        'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      }
                      name='gender'
                      onChange={this.handleChange}>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </select>
                    <div
                      className={
                        'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'
                      }>
                      <svg
                        className={'fill-current h-4 w-4'}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={'w-1/2 px-3'}>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'
                    }
                    for='category'>
                    Category
                  </label>
                  <div className={'relative'}>
                    <select
                      className={
                        'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      }
                      name='category'
                      onChange={this.handleChange}>
                      <option value='shirt'>Shirt</option>
                      <option value='skirt'>Skirt</option>
                      <option value='pants'>Pants</option>
                      <option value='shorts'>Shorts</option>
                      <option value='dress'>Dress</option>
                    </select>
                    <div
                      className={
                        'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'
                      }>
                      <svg
                        className={'fill-current h-4 w-4'}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className={'w-1/2 px-3'}>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'
                    }
                    for='unit'>
                    Measurement unit
                  </label>
                  <div className={'relative'}>
                    <select
                      className={
                        'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      }
                      name='unit'
                      onChange={this.handleChange}>
                      <option value='cm'>cm</option>
                      <option value='in'>inches</option>
                    </select>
                    <div
                      className={
                        'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'
                      }>
                      <svg
                        className={'fill-current h-4 w-4'}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className={'w-1/2 px-3'}>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'
                    }
                    for='meatype'>
                    Measurement Type
                  </label>
                  <div className={'relative'}>
                    <select
                      className={
                        'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                      }
                      name='meatype'
                      onChange={this.handleChange}>
                      <option value='garment'>Cloth sizing</option>
                      <option value='body'>Body sizing</option>
                    </select>
                    <div
                      className={
                        'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'
                      }>
                      <svg
                        className={'fill-current h-4 w-4'}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={'w-full'}>
                  <label
                    className={
                      'block uppercase tracking-wide text-gray-700 text-xs font-bold my-2 mx-3'
                    }>
                    Size tabel
                  </label>
                  <table id='tableSizeTable' className='table-fixed mx-3'>
                    <thead>
                      <tr className='bg-gray-500'>
                        <th className={'px-2 py-2'}>Size</th>
                        <th className={'px-2 py-2'}>Chest</th>
                        <th className={'px-2 py-2'}>Body length</th>
                        <th className={'px-2 py-2'}>Waist</th>
                        <th className={'px-2 py-2'}>Shoulder length</th>
                        <th className={'px-2 py-2'}>Hip</th>
                        <th className={'px-2 py-2'}>Top length</th>
                        <th className={'px-2 py-2'}>Bust</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.sizeTable.map((val, idx) => {
                        let size = `size${idx}`,
                          chest = `size${idx}chest`,
                          bl = `size${idx}bl`,
                          waist = `size${idx}waist`,
                          hip = `size${idx}hip`,
                          tl = `size${idx}tl`,
                          bust = `size${idx}bust`,
                          sl = `size${idx}sl`;
                        return (
                          <tr key={val.index}>
                            <td className={'border px-4 py-2'}>
                              <input
                                className='w-full'
                                type='text'
                                name='size'
                                data-id={idx}
                                id={size}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </td>
                            <td className={'border px-4 py-2'}>
                              <input
                                className='w-full'
                                type='number'
                                name='chest'
                                id={chest}
                                data-id={idx}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </td>
                            <td className={'border px-4 py-2'}>
                              <input
                                className='w-full'
                                type='number'
                                name='bl'
                                id={bl}
                                data-id={idx}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </td>
                            <td className={'border px-4 py-2'}>
                              <input
                                className='w-full'
                                type='number'
                                name='waist'
                                id={waist}
                                data-id={idx}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </td>
                            <td className={'border px-4 py-2'}>
                              <input
                                className='w-full'
                                type='number'
                                name='hip'
                                id={hip}
                                data-id={idx}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </td>
                            <td className={'border px-4 py-2'}>
                              <input
                                className='w-full'
                                type='number'
                                name='tl'
                                id={tl}
                                data-id={idx}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </td>
                            <td className={'border px-4 py-2'}>
                              <input
                                className='w-full'
                                type='number'
                                name='bust'
                                id={bust}
                                data-id={idx}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </td>
                            <td className={'border px-4 py-2'}>
                              <input
                                className='w-full'
                                type='number'
                                name='sl'
                                id={sl}
                                data-id={idx}
                                onChange={(e) => this.handleChange(e)}
                              />
                            </td>
                            <td className={'border-l py-2 px-1'}>
                              {idx === 0 ? (
                                <button
                                  type='button'
                                  onClick={() => this.addRow()}>
                                  Add
                                  <i aria-hidden='true'></i>
                                </button>
                              ) : (
                                <button
                                  type='button'
                                  onClick={() => this.removeRow(val)}>
                                  Delete
                                  <i aria-hidden='true'></i>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className={'py-5'}>
                  <button
                    type='submit'
                    className={
                      'bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-8 rounded-full'
                    }>
                    Tell me my size
                  </button>
                </div>
              </form>
              <p className={'text-s italic mt-3'}>
                Your size recommendation is {this.props.sizeRecommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
FitAssistCard.propTypes = {
  getSizeRecommendation: PropTypes.func,
  sizeRecommedation: PropTypes.string,
};

const mapStateToProps = (state) => ({
  getSizeRecommendation: state.menu.getSizeRecommendation,
  sizeRecommedation: state.menu.sizeRecommedation,
});

export default connect(mapStateToProps, {
  getSizeRecommendation,
})(FitAssistCard);

{
  /* <div className={'w-full lg:w-2/5 lg:h-4/5'}>
            <img
              src={Image}
              className={
                'rounded-none h-full w-full lg:rounded-lg shadow-2xl hidden lg:block'
              }
            />
          </div> */
}
