//Press alt+click to edit multiple lines at once

import React, { useState } from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import NavBar from './Components/NavBar/NavBar';
import SellForm from './Components/NavBar/SellForm';
import ClothesDetail from './Components/Shop/ClothesDetail';
import Carousel from './Components/Carousel';
import EditProfileSeller from './Components/Profile/EditProfileSeller';
import EditProfileBuyer from './Components/Profile/EditProfileBuyer';
import Shop from './Components/Shop/Shop';
import FooterBar from './Components/FooterBar';
import FitAssistCard from './Components/NavBar/FitAssistCard';
import Home from './Components/Home.js';

import PostItem from './Components/Shop/PostItem.js';
import { withProps, setupConfig } from './utils/functions.js';
import PrivateRoute from './utils/PrivateRoute.js';
import SignupForm from './Components/SignIn/SignupForm.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      isLogged: false, //change to false later
      user: {},
      category: 'men-shirt',
    };
    //can bind function here! (we didnt bind here because we use arrow function below)
  }

  getUserInfo = (token) => {
    let self = this;
    let config = setupConfig(token);
    axios.get('http://localhost:5000/api/users/me', config).then((res) => {
      self.setState({
        user: res.data,
      });
    });
  };

  login = (inputToken) => {
    this.setState({
      isLogged: true,
      token: inputToken, //update token
    });
    this.props.history.push(`/`); //redirect to home page
  };

  logout = () => {
    this.setState({
      isLogged: false,
      token: '',
    });
    this.props.history.push(`/`);
  };

  menuSelect = (cat) => {
    this.setState({
      category: cat,
    });
    console.log(this.state.category);
  };
  render() {
    return (
      <div>
        <p>Login is {this.state.isLogged ? 'true' : 'false'}</p>
        <p>Token is {this.state.token}</p>
        <NavBar
          menuSelect={this.menuSelect}
          isLogged={this.state.isLogged}
          token={this.state.token}
          user={this.state.user}
          login={this.login}
          logout={this.logout}
          getUserInfo={this.getUserInfo}
          logout={this.logout}
        />
        <Switch>
          <Route
            path='/signup'
            component={() => (
              <SignupForm getUserInfo={this.getUserInfo} login={this.login} />
            )}
          />
          <Route
            path='/'
            exact
            component={() => <Home menuSelect={this.menuSelect} />}
          />
          <Route
            exact
            path='/shop'
            component={() => (
              <Shop
                items={this.state.items}
                token={this.state.token}
                category={this.state.category}
              />
            )}
          />

          <PrivateRoute
            isLogged={this.state.isLogged}
            component={withProps(EditProfileSeller, {
              ...this.state,
            })}
            path='/edit/profile/seller'
          />
          <PrivateRoute
            isLogged={this.state.isLogged}
            component={withProps(SellForm, {
              ...this.state,
            })}
            path='/sell'
          />
          <PrivateRoute
            isLogged={this.state.isLogged}
            component={withProps(EditProfileBuyer, {
              ...this.state,
            })}
            path='/edit/profile/buyer'
          />
        </Switch>
        <FooterBar />
      </div>
    );
  }
}

export default withRouter(App);
/* Components
-------------------------------
Not done:
<FitAssistCard />
<Form />
<Dialog />
<Sidebar />
<ClothesDetail />
<TrialAPI />
<PersonInput />

Done:
<FooterBar />
-------------------------------
*/

/*
Template costructor
--------------------------------
constructor(props) {
	super(props);
	this.state = {
		
	};
	//can bind function here! (we didnt bind here because we use arrow function below)
}

handleClick = (e) => {
	//for the thing inside target it can be anything!
	this.setState({
		
	});
};
---------------------------------
*/

/* 

*/

// axios
// 	.get("http://localhost:5000")
// 	.then((res) => {
// 		console.log(res.data);
// 		// data = res.data;
// 		alert("Hi succeedd");
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		alert("Try again");
// 		console.log("hello");
// 	});

{
  /* To include upload pic button
	<input
	type="file"
	style={{ display: "none" }}
	onChange={this.handleChange}
	// to link to the button
	ref={(fileInput) => (this.fileInput = fileInput)}
/>

<button
	type="button"
	class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
	onClick={() => this.fileInput.click()}
>
	Choose file
</button>
<button onClick={this.fileUpload}>Upload</button> */
}

// const formData = new FormData();
//     formData.append('file',file)
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//     return  post(url, formData,config)
//   }
