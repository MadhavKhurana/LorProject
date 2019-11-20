import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, registerUser } from "../../redux/actions/authActions.js";
import { withRouter } from "react-router";

class UserAuth extends Component {
  state = {
    login: true,
    login_email: "",
    login_password: "",
    register_email: "",
    register_name: "",
    register_password: "",
    register_cpassword: ""
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/user-panel");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/user-panel");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  LoginSubmit = e => {
    e.preventDefault();
    const loginData = {
      email: this.state.login_email,
      password: this.state.login_password
    };
    // console.log(loginData);

    this.props.loginUser(loginData);
  };

  RegisterSubmit = e => {
    e.preventDefault();
    const registerData = {
      email: this.state.register_email,
      password: this.state.register_password,
      name: this.state.register_name,
      cpassword: this.state.register_cpassword
    };
    // console.log(registerData);
    this.props.registerUser(registerData, this.props.history);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loginInputs = () => {
    return (
      <div>
        <br />
        <br />
        <br />
        <div className="col-md-3"></div>

        <form className="col-md-5" onSubmit={this.LoginSubmit}>
          <h3>Login</h3>
          <br />
          {this.props.errors.email ? (
            <div className="alert alert-danger">
              <strong>{this.props.errors.email}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group ">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user"></i>
            </span>

            <input
              id="login_email"
              type="text"
              className="form-control"
              name="login_email"
              onChange={this.onChange}
              placeholder="Email"
            />
          </div>
          <br />
          {this.props.errors.password ? (
            <div className="alert alert-danger">
              <strong>
                {this.props.errors.password}
                {this.props.errors.LoginUserPasswordErr}
              </strong>
            </div>
          ) : (
            ""
          )}
          {this.props.errors.LoginUserPasswordErr ? (
            <div className="alert alert-danger">
              <strong>{this.props.errors.LoginUserPasswordErr}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-lock"></i>
            </span>

            <input
              id="login_password"
              type="password"
              className="form-control"
              name="login_password"
              onChange={this.onChange}
              placeholder="Password"
            />
          </div>
          <br />
          <span
            onClick={() => this.setState({ login: false })}
            className="pull-left"
            style={{ cursor: "pointer", color: "blue" }}
          >
            Create a account..
          </span>
          <button type="submit" className="pull-right btn btn-lg btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  };

  registerInputs = () => {
    return (
      <div>
        <br />
        <br />
        <br />
        <div className="col-md-3"></div>

        <form className="col-md-5" onSubmit={this.RegisterSubmit}>
          <h3>Register</h3>
          <br />
          {this.props.errors.name ? (
            <div className="alert alert-danger">
              <strong>{this.props.errors.name}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group ">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user"></i>
            </span>
            <input
              id="register_name"
              type="text"
              className="form-control"
              name="register_name"
              onChange={this.onChange}
              placeholder="Full Name"
            />
          </div>
          <br />
          {this.props.errors.email ? (
            <div className="alert alert-danger">
              <strong>{this.props.errors.email}</strong>
            </div>
          ) : (
            ""
          )}{" "}
          {this.props.errors.RegisterUserEmailErr ? (
            <div className="alert alert-danger">
              <strong>{this.props.errors.RegisterUserEmailErr}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group ">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user"></i>
            </span>
            <input
              id="register_email"
              type="text"
              className="form-control"
              name="register_email"
              onChange={this.onChange}
              placeholder="Email"
            />
          </div>
          <br />
          {this.props.errors.password ? (
            <div className="alert alert-danger">
              <strong>{this.props.errors.password}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-lock"></i>
            </span>

            <input
              id="register_password"
              type="password"
              className="form-control"
              name="register_password"
              onChange={this.onChange}
              placeholder="Password"
            />
          </div>
          <br />
          {this.props.errors.password2 ? (
            <div className="alert alert-danger">
              <strong>{this.props.errors.password2}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-lock"></i>
            </span>

            <input
              id="register_cpassword"
              type="password"
              className="form-control"
              name="register_cpassword"
              onChange={this.onChange}
              placeholder="Confirm Password"
            />
          </div>
          <br />
          <span
            onClick={() => this.setState({ login: true })}
            className="pull-left"
            style={{ cursor: "pointer", color: "blue" }}
          >
            Login Here..
          </span>
          <button className="pull-right btn btn-lg btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  };

  render() {
    return (
      <div align="center" className="container">
        <div className="col-md-4"></div>
        <div align="center" className="text-center">
          <br />
          <br />
          <br />
          {this.state.login ? this.loginInputs() : this.registerInputs()}
        </div>
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStatetoProps, { loginUser, registerUser })(
  withRouter(UserAuth)
);
