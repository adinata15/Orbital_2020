import React, { Component } from 'react';
import axios from 'axios';
import Image from '../../images/plus.jpg';
import MaterialTable from 'material-table';
import { AddBox, ArrowDownward } from '@material-ui/icons';

export default class CartBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      price: '',
      title: '',
      brand: '',
      size: '', //available sizes (how to send?)
      category: 'male',
      image: [],
      tempImage: [],
      columns: [
        { title: 'Size', field: 'size' },
        { title: 'Height', field: 'height', type: 'numeric' },
        { title: 'Chest', field: 'chest', type: 'numeric' },
        { title: 'Waist', field: 'waist', type: 'numeric' },
      ],
      data: [
        { size: 'S', height: 12, chest: 1987, waist: 63 },
        { size: 'm', height: 12, chest: 34, waist: 63 },
      ],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': this.state.token,
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
    switch (e.target.id) {
      case 'title':
        this.setState({
          title: e.target.value,
        });
        break;
      case 'price':
        this.setState({
          price: e.target.value,
        });
        break;
      case 'category':
        this.setState({
          category: e.target.value,
        });
        break;
      case 'brand':
        this.setState({
          brand: e.target.value,
        });
        break;
    }
    console.log(this.state);
  };

  handleImage = (e) => {
    let trgt = e.target;
    this.setState(
      {
        tempImage: this.state.tempImage.concat(
          URL.createObjectURL(trgt.files[0])
        ),
      },
      () => console.log(this.state.tempImage)
    );
    this.setState(
      {
        image: this.state.image.concat(trgt.files[0]),
      },
      () => console.log(this.state.image)
    );
  };

  // imageUpload = (e) => {
  //   e.preventDefault();
  //   let self = this;
  //   const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       'x-auth-token': this.state.token,
  //     },
  //   };
  //   const data = new FormData();
  //   data.append('profileImage', this.state.image);
  //   console.log(data.get('profileImage'));

  //   axios
  //     .post(`http://localhost:5000/api/users/seller/item`, data, config)
  //     .then((res) => {
  //       console.log('res data');
  //       console.log(res.data);
  //       self.setState({
  //         user: res.data,
  //       });
  //       alert('Editted profile pic');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert('Edit fail');
  //     });
  // };

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

  render() {
    return (
      <form
        action=''
        onSubmit={this.handleSubmit}
        class='w-9/12 max-w-lg mx-auto my-6'>
        <div class='flex w-full px-3'>
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

          <button
            type='submit'
            class='bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'>
            Submit file
          </button>
        </div>
        <MaterialTable
          title='Size chart'
          columns={this.state.columns}
          data={this.state.data}
          options={{ search: false, paging: false }}
          // components={}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      </form>
    );
  }
}
