import React from 'react';
import {UserDataForm} from '../../common/components/user-data-form';

class RegisterScreen extends React.Component{
  render() {
    return (
        <>
          <h2 className="AlignedItem">Register</h2>
          <UserDataForm submitText="Register" onSubmit={this.props.registerHandler} userData={{}}/>
          <button className="AlignedItem" onClick={this.props.onSwitchToLogin}>
            Back to log in
          </button>
          <span className="ErrorSpan">{this.props.errorMsg}</span>
        </>
    );
  }
}

export {RegisterScreen};
