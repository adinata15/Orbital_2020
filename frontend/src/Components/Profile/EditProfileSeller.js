//left shipping and billing address
//gender cant update
//editting file upload

import React from 'react';
import axios from 'axios';
import Image from '../../images/plus.jpg';
import omit from 'lodash/omit';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props, password: '', tempImg: null };
  }

  imageUpload = (e) => {
    e.preventDefault();
    let self = this;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': this.state.token,
      },
    };
    const data = new FormData();
    data.append('profileImage', this.state.user.image);
    console.log(data.get('profileImage'));

    axios
      .post(`http://localhost:5000/api/users/seller/profile_pict`, data, config)
      .then((res) => {
        console.log('res data');
        console.log(res.data);
        self.setState({
          user: res.data,
        });
        alert('Editted profile pic');
      })
      .catch((err) => {
        console.error(err);
        alert('Edit fail');
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let self = this;
    const config = {
      headers: {
        'Content-Type': ' application/json',
        'x-auth-token': this.state.token,
      },
    };
    let user = {
      ...this.state.user,
    };
    user = omit(user, 'image');
    user = JSON.stringify(user);
    console.log(user);

    axios
      .put(`http://localhost:5000/api/users/seller`, user, config)
      .then((res) => {
        self.setState({
          user: res.data,
        });
        console.log(res.data);
        alert('Editted user data');
      })
      .catch((err) => {
        console.error(err);
        alert('Edit fail');
      });
  };

  handleChange = (e) => {
    let val = e.target.value;
    let trgt = e.target;
    switch (e.target.name) {
      case 'name':
        this.setState((prevState) => {
          let user = { ...prevState.user }; // creating copy of state variable jasper
          user.name = val; // update the name property, assign a new value
          return { user }; // return new object jasper object
        });
        break;
      case 'image':
        this.setState({
          tempImg: URL.createObjectURL(trgt.files[0]),
        });
        this.setState((prevState) => {
          let user = { ...prevState.user }; // creating copy of state variable jasper
          user.image = trgt.files[0]; // update the name property, assign a new value
          return { user }; // return new object jasper object
        });
        break;
      case 'email':
        this.setState((prevState) => {
          let user = { ...prevState.user }; // creating copy of state variable jasper
          user.email = val; // update the name property, assign a new value
          return { user }; // return new object jasper object
        });
        break;

      default:
        console.error();
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} class='w-full max-w-lg mx-auto my-6'>
          <h1 class='text-center text-3xl mb-3'>Edit Profile</h1>

          <div class='w-full content-center'>
            <div class='w-full px-3'>
              <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Profile picture
              </label>
            </div>
            <div class='flex w-full px-3'>
              <img
                class='rounded-full h-64 w-64 my-3 object-cover'
                onClick={() => this.fileInput.click()}
                src={this.state.tempImg || this.state.user.image}
                alt={Image}
              />
              <div class='w-full px-3 self-center'>
                <label
                  class='block  mx-5 text-gray-700 text-m mb-2'
                  for='email'>
                  Show us your smile :D
                </label>
                <button
                  type='button'
                  class='bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
                  onClick={() => this.fileInput.click()}>
                  Choose file
                </button>
                <button
                  type='button'
                  class='bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
                  onClick={this.imageUpload}>
                  Upload
                </button>
              </div>
              <input
                type='file'
                name='image'
                style={{ display: 'none' }}
                onChange={this.handleChange}
                // to link to the button
                ref={(fileInput) => (this.fileInput = fileInput)}
              />
            </div>
          </div>

          <div class='flex flex-wrap -mx-3 mb-6'>
            <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                for='grid-user-id'>
                User ID
              </label>
              <input
                name='name'
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                id='name'
                value={this.state.user.name}
                type='text'
                placeholder='Jane'
                onChange={this.handleChange}
              />
            </div>

            <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <label
                class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                for='grid-email'>
                Email
              </label>
              <input
                name='email'
                class='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                id='email'
                type='email'
                value={this.state.user.email}
                placeholder='jane@gmail.com'
                onChange={this.handleChange}
              />
            </div>
          </div>

          <button
            class='bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded'
            type='submit'
            id='button'>
            Save Changes
          </button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
