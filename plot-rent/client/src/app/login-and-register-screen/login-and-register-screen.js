import React from 'react';

import API from '../api';

import {AuthorizedEnum} from '../authorized-enum.js';
import {LoginScreen} from './login/login';
import {RegisterScreen} from './register/register';

import './login-and-register-screen.scss';

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  showRegister: false
                  , errorMsg: ""};
  }

  handleLogin = async (loginData) => {
    try {
      const response = await API.post(`login`, loginData,
        { headers: { "Content-Type": "application/json"}});

      if (!response.data.error) {
        const token = response.data.token;
        const currentUser = response.data.currentUser;
        const userSettings = response.data.userSettings;
        this.setState({errorMsg: ""});
        this.props.authHandler(AuthorizedEnum.authorized, currentUser, userSettings, token);
      } else {
        this.setState({errorMsg: response.data.error});
      }

    } catch(err) {
      this.setState({errorMsg: "Sorry, something went wrong on server :("});
    }
  };

  handleRegister = async (registerData) => {
    registerData.latitude = 1;
    registerData.longitude = 1;

    try {
      const response = await API.post(`users/create`, registerData,
      { headers: {
          "Content-Type": "application/json"}});
      if (!response.data.error) {
        this.handleLogin({email: registerData.email, password: registerData.password})
        this.setState({errorMsg: ""});
      }
      else {
        this.setState({errorMsg: response.data.error});
      }

    } catch(err) {
      this.setState({errorMsg: "Sorry, something went wrong on server :("});
    }
  };

  handleSwitchToRegister = () => {
    this.setState({  showRegister: true
                   , });
  };

  handleSwitchToLogin = () => {
    this.setState({  showRegister: false
                   , });
  };

  render() {
    return (
      <div className="authAligner">
        <div className="authScreen">
          {this.state.showRegister ?
              <RegisterScreen registerHandler={this.handleRegister} onSwitchToLogin={this.handleSwitchToLogin} errorMsg={this.state.errorMsg}/>
            : <LoginScreen loginHandler={this.handleLogin} onSwitchToRegister={this.handleSwitchToRegister} errorMsg={this.state.errorMsg}/>
          }
        </div>
      </div>
    );
  }
}

export {AuthScreen}
