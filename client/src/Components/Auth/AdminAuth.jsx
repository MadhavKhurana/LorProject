import React, { Component } from "react";
import { loginAdmin, registerAdmin } from "../../redux/actions/authActions";
import { connect } from "react-redux";

class AdminAuth extends Component {
  state = {
    login: true,
    email: "",
    password: "",
    register_email: "",
    register_name: "",
    register_password: "",
    register_cpassword: ""
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
    this.props.registerAdmin(registerData, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin-panel");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/admin-panel");
    }
    // console.log("lol");

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  LoginSubmit = e => {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    // console.log(loginData);

    this.props.loginAdmin(loginData);
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

        <form onSubmit={this.LoginSubmit} className="col-md-5">
          <h3>Login</h3>
          <br />
          {this.props.errors.LoginAdminEmailErr ? (
            <div class="alert alert-danger">
              <strong>{this.props.errors.LoginAdminEmailErr}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group ">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user"></i>
            </span>
            <input
              id="email"
              type="text"
              className="form-control"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
              placeholder="Email"
            />
          </div>
          <br />
          {this.props.errors.LoginAdminPasswordErr ? (
            <div class="alert alert-danger">
              <strong>{this.props.errors.LoginAdminPasswordErr}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-lock"></i>
            </span>

            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
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

        <form onSubmit={this.RegisterSubmit} className="col-md-5">
          <h3>Register</h3>
          <br />
          {this.props.errors.RegisterAdminNameErr ? (
            <div class="alert alert-danger">
              <strong>{this.props.errors.RegisterAdminNameErr}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group ">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user"></i>
            </span>
            <input
              id="name"
              type="text"
              className="form-control"
              name="register_name"
              onChange={this.onChange}
              placeholder="Full Name"
            />
          </div>
          <br />
          {this.props.errors.RegisterAdminEmailErr ? (
            <div class="alert alert-danger">
              <strong>{this.props.errors.RegisterAdminEmailErr}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group ">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user"></i>
            </span>
            <input
              id="email"
              type="text"
              className="form-control"
              name="register_email"
              onChange={this.onChange}
              placeholder="Email"
            />
          </div>
          <br />
          {this.props.errors.RegisterAdminPasswordErr ? (
            <div class="alert alert-danger">
              <strong>{this.props.errors.RegisterAdminPasswordErr}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-lock"></i>
            </span>

            <input
              id="password"
              type="password"
              className="form-control"
              name="register_password"
              onChange={this.onChange}
              placeholder="Password"
            />
          </div>
          <br />
          {this.props.errors.RegisterAdminCPasswordErr ? (
            <div class="alert alert-danger">
              <strong>{this.props.errors.RegisterAdminCPasswordErr}</strong>
            </div>
          ) : (
            ""
          )}
          <div className="input-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-lock"></i>
            </span>

            <input
              id="password"
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

export default connect(mapStatetoProps, { registerAdmin, loginAdmin })(
  AdminAuth
);
