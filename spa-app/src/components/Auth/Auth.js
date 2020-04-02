import React, { Component } from "react";
import Input from "../Input/Input";
import "./Auth.css";

import { connect } from "react-redux";
import { auth } from "../../redux/actions/auth";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      login: {
        type: "text",
        value: "",
        touched: false,
        errorMessage: "Incorrect Login",
        valid: false,
        label: "Login",
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        type: "password",
        value: "",
        touched: false,
        errorMessage: "Incorrect Password",
        valid: false,
        label: "Password",
        validation: {
          required: true,
          minlength: 6
        }
      }
    }
  };
  onLogin = () => {
    const login = this.state.formControls.login.value;
    const password = this.state.formControls.password.value;
    this.props.auth(login, password, true);
  };

  onRegister = () => {
    const login = this.state.formControls.login.value;
    const password = this.state.formControls.password.value;
    this.props.auth(login, password, false);
  };
  submitForm = event => {
    event.preventDefault();
  };
  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    if (validation.minlength) {
      isValid = value.length >= validation.minlength && isValid;
    }
    return isValid;
  };
  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;
    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });
    this.setState({
      formControls,
      isFormValid
    });
  };
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          touched={control.touched}
          errorMessage={control.errorMessage}
          valid={control.valid}
          label={control.label}
          validation={control.validation}
          onChange={event => {
            this.onChangeHandler(event, controlName);
          }}
        />
      );
    });
  }
  render() {
    return (
      <div className="container-fluid pt-5 Auth">
        <div className="row justify-content-center pt-5">
          <div className="col-12 col-md-8 col-lg-6 pt-5">
            <form onSubmit={this.submitForm}>
              {this.renderInputs()}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "50px auto"
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={this.onLogin}
                  disabled={!this.state.isFormValid}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.onRegister}
                  disabled={!this.state.isFormValid}
                >
                  Register Now
                </button>
              </div>
              <p style={{ color: "red" }}>{this.props.loginError}</p>
              <p style={{ color: "red" }}>{this.props.registerError}</p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    registerError: state.auth.registerError
  };
}
function mapDispatchToProps(dispatch) {
  return {
    auth: (login, password, isLogin) => dispatch(auth(login, password, isLogin))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
