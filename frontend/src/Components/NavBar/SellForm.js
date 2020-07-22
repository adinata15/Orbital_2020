//handleChangeTable(others havent try) not working
//picture upload with 2 to 3 rows of size error->itemImageA&this.state.image becomes undefined/not loaded
//error code 500 for postItems
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Image from '../../images/plus.svg';
import TableRow from './TableRow';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postItems } from '../../actions/shopActions';

class SellForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      price: '',
      title: '',
      brand: '',
      category: 'male',
      image: [],
      tempImage: [],
      outofstock: {}, //put the out of stock items in comma
      sizeTable: [
        {
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

  appendData = (data) => {
    //insert image
    let displayImage = this.state.image.shift();
    this.state.image.forEach((image) => {
      data.append('itemImages', image); //problem here
    });

    //inserting size datas
    this.state.sizeTable.forEach((sizeOne, idx) => {
      data.append(`size${idx + 1}`, sizeOne.size);
      data.append(`size${idx + 1}chest`, sizeOne.chest);
      data.append(`size${idx + 1}bl`, sizeOne.bl);
      data.append(`size${idx + 1}waist`, sizeOne.waist);
      data.append(`size${idx + 1}hip`, sizeOne.hip);
      data.append(`size${idx + 1}tl`, sizeOne.tl);
      data.append(`size${idx + 1}bust`, sizeOne.bust);
      data.append(`size${idx + 1}sl`, sizeOne.sl);
    });

    data.append('title', this.state.title);
    data.append('category', this.state.category);
    data.append('brand', this.state.brand);
    data.append('price', this.state.price);
    data.append('displayImage', displayImage);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    try {
      this.appendData(data);
      this.props.postItems(data);
      console.log(...data);
      console.log(this.state.image);
      this.setState({ isSubmitted: true });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  handleImage = (e) => {
    this.setState({
      tempImage: [
        ...this.state.tempImage,
        URL.createObjectURL(e.target.files[0]),
      ],
      image: [...this.state.image, e.target.files[0]],
    });
  };

  imageItems = () => {
    let tempImage = this.state.tempImage;
    if (tempImage[0]) {
      return tempImage.map((item, index) =>
        index === 0 ? (
          <div
            className={
              'flex flex-col flex bg-gray-400 border-dotted border-green-800 border-2'
            }>
            <img
              key={index}
              className={'h-32 w-32 mx-1 my-3 object-cover'}
              src={item}
              alt='image not displayed'
            />
            <p className={'text-center'}>Display image</p>
          </div>
        ) : (
          <img
            key={index}
            className={'mx-1 h-32 w-32 my-3 object-cover'}
            src={item}
            alt='image not displayed'
          />
        )
      );
    } else {
      return (
        <p className={'text-3xl text-center w-full px-8 font-bold my-3'}>
          No image chosen
        </p>
      );
    }
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
    this.setState((prevState) => ({
      sizeTable: [
        ...prevState.sizeTable,
        {
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
    if (this.state.isSubmitted) {
      return <Redirect to='/store' />;
    } else {
      let { sizeTable } = this.state;
      return (
        <form
          action='/'
          onSubmit={this.handleSubmit}
          className={'w-9/12 max-w-lg mx-auto my-6'}>
          <div className={'w-full'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }>
              Listing picture
            </label>
            <div className={'flex flex-col rounded border-2 border-dashed'}>
              <img
                className={
                  'self-center rounded-full h-16 w-16 my-3 object-cover'
                }
                onClick={() => this.fileInput.click()}
                src={Image}
              />
              <p
                className={
                  'text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }>
                Click here to add item picture
              </p>
            </div>
            <div
              className={
                'flex flex-row flex-wrap justify-around border-2 rounded border-dashed'
              }>
              {this.imageItems()}
            </div>
          </div>

          <input
            type='file'
            name='image'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={this.handleImage}
            // to link to the button
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <div className={'flex flex-wrap -mx-3'}>
            <div className={'w-full px-3 my-3 '}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for='grid-user-id'>
                Title
              </label>
              <input
                name='title'
                className={
                  'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required'
                }
                id='title'
                type='text'
                placeholder='Nike DryFit Pro'
                onChange={this.handleChange}
              />
            </div>
            <div className={'w-full px-3'}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for='grid-gender'>
                Category
              </label>
              <div
                className={
                  'flex flex-row flex-wrap justify-around border-2 rounded border-dashed'
                }>
                {this.imageItems()}
              </div>
            </div>
            <div className={'w-full md:w-1/2 px-3 mb-6 md:mb-0'}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for='grid-user-id'>
                Brand
              </label>
              <input
                name='brand'
                className={' required'}
                id='brand'
                type='text'
                placeholder='Jane'
                onChange={this.handleChange}
              />
            </div>
            <div className={'w-full md:w-1/2 px-3 mb-6 md:mb-0'}>
              <label
                className={
                  'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                }
                for='grid-weight'>
                Price
              </label>
              <input
                name='price'
                className={' required focus:border-gray-500'}
                id='price'
                type='number'
                placeholder='$45.7'
                onChange={this.handleChange}
              />
            </div>

            <div>
              <table id='tableSizeTable' className='table-fixed'>
                <thead>
                  <tr className='bg-gray-500'>
                    <th className={'px-2 py-2'}>Size</th>
                    <th className={'px-2 py-2'}>Chest</th>
                    <th className={'px-2 py-2'}>Bl</th>
                    <th className={'px-2 py-2'}>Waist</th>
                    <th className={'px-2 py-2'}>Sl</th>
                    <th className={'px-2 py-2'}>Hip</th>
                    <th className={'px-2 py-2'}>Tl</th>
                    <th className={'px-2 py-2'}>Bust</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow
                    handleChange={this.handleChangeTable.bind(this)}
                    add={this.addRow}
                    delete={this.removeRow.bind(this)}
                    sizeData={sizeTable}
                  />
                </tbody>
              </table>
            </div>

            <button
              type='submit'
              className={
                'bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
              }>
              Submit file
            </button>
          </div>
        </form>
      );
    }
  }
}

SellForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  postItems: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, { postItems })(SellForm);

{
  /* <div className={'w-full self-center'}>
            <button
              type='button'
              className={
                'bg-gray-800 my-2 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
              }
              onClick={() => this.fileInput.click()}>
              Choose file
            </button>
          </div> */
}
{
  /* <div className='relative'>
                <select
                  className={
                    'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  }
                  id='category'
                  defaultValue={this.state.gender}
                  onChange={this.handleChange}>
                  <option value='men'>Men</option>
                  <option value='women'>Women</option>
                  <option value='others'>Others</option>
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
              </div> */
}
