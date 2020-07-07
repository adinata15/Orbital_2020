//bug: always remove last row only

import React, { Component } from 'react';
import axios from 'axios';
import Image from '../../images/plus.jpg';
import { AddBox, ArrowDownward } from '@material-ui/icons';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { menuSelect } from '../../actions/menuSelect';

export default class SellForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      title: '',
      brand: '',
      size: '', //available size (how to send?)
      category: 'male',
      image: [],
      tempImage: [],
      tableData: [],
      tableSize: 2,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    let data = new FormData();
    data.append('title', this.state.title);
    data.append('category', this.state.category);
    data.append('brand', this.state.brand);
    data.append('price', this.state.price);
    data.append('displayImage', this.state.image[0]);
    data.append('itemImages', this.state.image);

    // console.log(data.get('brand'));

    axios
      .post(`http://localhost:5000/api/users/seller/item`, data, config)
      .then((res) => {
        console.log(res.data);
        alert('Sell data sent');
      })
      .catch((err) => {
        console.error(err);
        alert('Sell data fail');
      });
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  handleImage = (e) => {
    this.setState({
      tempImage: this.state.tempImage.concat(
        URL.createObjectURL(e.target.files[0])
      ),
    });
    this.setState({
      image: this.state.image.concat(e.target.files[0]),
    });
  };

  imageItems = () => {
    let tempImage = this.state.tempImage;
    if (tempImage[0]) {
      return tempImage.map((item) => (
        <img
          class='rounded-full h-64 w-64 my-3 object-cover'
          src={item}
          alt='image not displayed'
        />
      ));
    } else {
      return <p class='text-3xl px-8 font-bold my-3'>No image chosen</p>;
    }
  };

  createTable = () => {
    let rows = [];
    for (var i = 0; i < this.state.tableSize; i++) {
      let cell = [];
      for (var idx = 0; idx < 8; idx++) {
        let self = this;
        cell.push(
          <td
            class='flex-1 border-dashed border-2 border-gray-600'
            contenteditable='true'
            key={`${i}-${idx}`} //row no
            id={idx} //cell no
          >
            <input
              onChange={(e) => {
                this.handleChangeTable(e, i, idx);
              }} //to incorporate event with other params
              key={`${i}-${idx}`} //row no
              id={idx} //cell no
            ></input>
          </td>
        );
      }
      rows.push(
        <tr class='flex bg-red-400 items-center' key={i} id={i}>
          <img
            id={i}
            class='w-4 h-4'
            onClick={() => {
              this.removeRow(i);
            }}
            src={Image}
          />
          {cell}
        </tr>
      );
    }

    return rows;
  };

  handleChangeTable = (e, row, cell) => {
    e.preventDefault();
    this.setState((prevState) => {
      let tableData = [...prevState.tableData];
      tableData[row][cell] = e.target.value;
      return { tableData };
    });
    console.log(this.state.tableData[row][cell]);
  };

  removeRow = (row) => {
    this.setState((prevState) => {
      let tableData = [...prevState.tableData];
      tableData.splice(row, 1);
      return { tableData };
    });
    this.setState((prevState) => {
      let tableSize = prevState.tableSize;
      tableSize--;
      return { tableSize };
    });
    console.log(`removed ${row}`);
  };

  addRow = () => {
    this.setState((prevState) => {
      return { tableSize: prevState.tableSize + 1 };
    });
    console.log('added');
    console.log(this.state.tableSize);
  };

  render() {
    return (
      <form
        action='/'
        onSubmit={this.handleSubmit}
        class='w-9/12 max-w-lg mx-auto my-6'>
        <div class='flex w-full px-3'>
          <p>{this.state.tableData[0]}</p>
          <img
            class='rounded-full h-64 w-64 my-3 object-cover'
            onClick={() => this.fileInput.click()}
            src={Image}
          />
          {this.imageItems()}
        </div>
        <div class='w-full px-3 self-center'>
          <label class='block  mx-5 text-gray-700 text-m mb-2' for='email'>
            Show us your smile :D
          </label>
          <button
            type='button'
            class='bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
            onClick={() => this.fileInput.click()}>
            Choose file
          </button>
        </div>
        <input
          type='file'
          name='image'
          style={{ display: 'none' }}
          onChange={this.handleImage}
          // to link to the button
          ref={(fileInput) => (this.fileInput = fileInput)}
        />
        <div class='flex flex-wrap -mx-3 mb-6'>
          <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-user-id'>
              Title
            </label>
            <input
              name='title'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              id='title'
              type='text'
              placeholder='Jane'
              onChange={this.handleChange}
            />
          </div>
          <div class='w-full px-3'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-gender'>
              Category
            </label>
            <div class='relative'>
              <select
                class='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='category'
                defaultValue={this.state.gender}
                onChange={this.handleChange}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='others'>Others</option>
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
          </div>
          <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-user-id'>
              Brand
            </label>
            <input
              name='brand'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              id='brand'
              type='text'
              placeholder='Jane'
              onChange={this.handleChange}
            />
          </div>
          <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              for='grid-weight'>
              Price
            </label>
            <input
              name='price'
              class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='price'
              type='number'
              placeholder='in kg'
              onChange={this.handleChange}
            />
          </div>

          <div>
            <table id='tableSizeTable'>
              <tr class='flex border-solid bg-gray-400'>
                <th class='w-4'></th>
                <th class='flex-1 border-4 border-gray-600'>Size</th>
                <th class='flex-1 border-4 border-gray-600'>Chest</th>
                <th class='flex-1 border-4 border-gray-600'>Bl</th>
                <th class='flex-1 border-4 border-gray-600'>Waist</th>
                <th class='flex-1 border-4 border-gray-600'>Hip</th>
                <th class='flex-1 border-4 border-gray-600'>Tl</th>
                <th class='flex-1 border-4 border-gray-600'>Bust</th>
                <th class='flex-1 border-4 border-gray-600'>Sl</th>
              </tr>
              <tbody>{this.createTable()}</tbody>
            </table>
          </div>

          <button
            type='button'
            onClick={this.addRow}
            class='bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'>
            Add size
          </button>

          <button
            type='submit'
            class='bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'>
            Submit file
          </button>
        </div>
      </form>
    );
  }
}

SellForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  menuSelect: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  accounttype: state.auth.user.accounttype,
});

export default connect(mapStateToProps, { menuSelect })(SellForm);
