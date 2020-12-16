import React from 'react';
import {TemplateForm} from '../../common/components/template-form';

class LoginScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleSubmit = (event) => {
    const loginData = this.getLoginData();
    this.props.loginHandler(loginData);

    event.preventDefault();
  };

  handleInputChange = (event) => {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });

    event.preventDefault();
  };

  getLoginData() {
    return {  email: this.state.email
      , password: this.state.password};
  }

  render() {
    const loginData = this.getLoginData();
    const formTemplate = [  {title: "Email:", name:"email", type: "email"}
      , {title: "Password:", name:"password", type: "password"}];

    return (
        <>
          <h2 className="AlignedItem">Log in</h2>
          <form className="AlignedItem Aligner" onSubmit={this.handleSubmit}>
            <TemplateForm formTemplate={formTemplate} onChange={this.handleInputChange} data={loginData}/>
            <input className="FormAlignedItem" type="submit" value="Log in"/>
          </form>
          <button className="AlignedItem" onClick={this.props.onSwitchToRegister}>
            Register
          </button>
          <span className="ErrorSpan">{this.props.errorMsg}</span>
        </>
    );
  }
}

export {LoginScreen};
