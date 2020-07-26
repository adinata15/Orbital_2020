//cannot upload profile pic (error 500)

import React from 'react';
import Image from '../../images/plus.svg';
import omit from 'lodash/omit';
import queryString from 'query-string';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editProfile,
  uploadProfilePic,
  getStripeSeller,
} from '../../actions/profileActions';
import { setAlert } from '../../actions/alertActions';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.user,
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      tempImg: null,
      isLoading: false,
      ...queryString.parse(this.props.location.search),
    };
    console.log(this.state);
  }

  componentWillMount() {
    if (this.props.token && !this.props.isAuthenticated) {
      this.props.loadUser();
    }
  }

  imageUpload = (e) => {
    e.preventDefault();

    let pictureData = new FormData();
    pictureData.append('profileImage', this.state.image);
    this.props.uploadProfilePic(pictureData);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let userData = {
      ...this.state,
    };
    userData = omit(userData, 'image', 'tempImg', 'isLoading');

    if (this.state.password) {
      userData = omit(userData, 'oldPassword', 'newPassword', 'newPassword2');
    }

    this.props.editProfile(userData);
  };

  redirectStripe = () => {
    return (window.location.href =
      'https://connect.stripe.com/express/oauth/authorize?client_id=ca_HXZPcyjn3M0xNIlKrMFE79On9n9GQJ6t&state=9j5fjsSFCh7smqNCRpQMYSYZ&suggested_capabilities[]=transfers');
  };

  handleChange = (e) => {
    switch (e.target.name) {
      case 'image':
        this.props.setAlert('Loading...', 'success');
        this.setState({
          tempImg: URL.createObjectURL(e.target.files[0]),
          image: e.target.files[0],
        });
        break;
      case 'name':
      case 'email':
      case 'oldPassword':
      case 'newPassword':
      case 'newPassword2':
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value,
        });
        break;
      default:
        console.log('Something is weird');
        break;
    }
  };

  render() {
    if (this.state.code) {
      this.props.getStripeSeller(this.state.state, this.state.code);
    }
    return (
      <form
        onSubmit={this.handleSubmit}
        className={'w-full max-w-lg mx-auto my-6'}>
        <h1 className={'text-center text-3xl mb-3'}>My Profile</h1>

        <div className={'w-full content-center'}>
          <div className={'w-full px-3'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }>
              Profile picture
            </label>
          </div>
          <div className={'flex w-full px-3'}>
            <img
              className={'rounded-full h-64 w-64 my-3 object-cover'}
              onClick={() => this.fileInput.click()}
              src={this.state.tempImg ? this.state.tempImg : this.state.image}
              alt={Image}
            />
            <div className={'w-full pl-3 self-center'}>
              <label
                className={'block  mx-5 text-gray-700 text-m mb-2'}
                for='email'>
                Show us your smile :D
              </label>
              <button
                type='button'
                className={
                  'bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
                }
                onClick={() => this.fileInput.click()}>
                Choose file
              </button>
              <button
                type='button'
                className={
                  'bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded'
                }
                onClick={this.imageUpload}>
                Upload
              </button>
            </div>
            <input
              type='file'
              name='image'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={this.handleChange}
              // to link to the button
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
          </div>
        </div>

        <div className={'flex flex-wrap mx-3 mb-6'}>
          <div className={'w-1/2'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-user-id'>
              User ID
            </label>
            <input
              name='name'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              }
              id='name'
              value={this.state.name}
              type='text'
              placeholder='Jane'
              onChange={this.handleChange}
            />
          </div>

          <div className={'w-1/2 pl-3 mb-0'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-email'>
              Email
            </label>
            <input
              name='email'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
              }
              id='email'
              type='email'
              value={this.state.email}
              placeholder='jane@gmail.com'
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className={'flex flex-wrap mx-3 mb-6'}>
          <div className={'w-full'}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-password'>
              Edit password
            </label>
            <input
              name='oldPassword'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              }
              id='oldPassword'
              type='password'
              placeholder='Leave blank if no edit required'
              minlength='8'
              onChange={this.handleChange}
            />
          </div>
          <div className={'w-full'} hidden={!this.state.oldPassword}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-password'>
              New password
            </label>
            <input
              name='newPassword'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              }
              id='newPassword'
              type='password'
              placeholder='******************'
              minlength='8'
              onChange={this.handleChange}
            />
          </div>
          <div className={'w-full'} hidden={!this.state.oldPassword}>
            <label
              className={
                'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              }
              for='grid-password'>
              Confirm new password
            </label>
            <input
              name='newPassword2'
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              }
              id='newPassword2'
              type='password'
              placeholder='******************'
              minlength='8'
              onChange={this.handleChange}
            />
          </div>
        </div>
        <button
          className={
            'bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded'
          }
          onClick={() => this.redirectStripe()}
          type='button'
          disabled={this.props.user.stripeseller}>
          {this.props.user.stripeseller
            ? `Already registered in Stripe`
            : `Create Stripe Account`}
        </button>

        <button
          className={
            'float-right bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded'
          }
          type='submit'
          id='button'>
          Save Changes
        </button>
      </form>
    );
  }
}

EditProfile.propTypes = {
  setAlert: PropTypes.func,
  editProfile: PropTypes.func,
  uploadProfilePic: PropTypes.func,
  getStripeSeller: PropTypes.func,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  setAlert,
  editProfile,
  uploadProfilePic,
  getStripeSeller,
})(EditProfile);
