import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  logoutUser,
  setBasicInfo,
  getSignature,
  uploadSignature
} from "../../redux/actions/authActions";

class AdminPanel extends Component {
  state = {
    dashboard: true,
    des: "",
    dep: "",
    editMode: false,
    dess: this.props.auth.user.designation,
    depp: this.props.auth.user.department,
    file: "",
    fileName: "Choose File",
    UploadedFile: {},
    random: 2
  };

  componentWillReceiveProps(next) {
    this.setState({
      UploadedFile: {
        filePath: next.auth.signature.filePath
      }
    });
  }

  onSubmits = e => {
    e.preventDefault();
    this.setState({
      editMode: false
    });
    const obj = {
      des: this.state.dess,
      dep: this.state.depp
    };
    this.props.setBasicInfo(obj);
  };

  componentDidMount() {
    if (this.props.auth.user.isAdmin === "false") {
      this.props.history.push("/user-panel");
    }
    this.props.getSignature();
  }

  someStuff = () => {
    if (this.props.auth.user.department !== "") {
      if (this.state.editMode) {
        return (
          <form onSubmit={this.onSubmits}>
            <input
              onChange={this.onChange}
              name="dess"
              id="Designation"
              placeholder="Enter Designation"
              value={this.state.dess}
              class="form-control"
            />
            <br />
            <input
              onChange={this.onChange}
              name="depp"
              id="Department"
              placeholder="Enter Department"
              value={this.state.depp}
              class="form-control"
            />
            <br />
            <button
              class="btn btn-md btn-danger"
              onClick={() => this.setState({ editMode: false })}
            >
              Cancel
            </button>{" "}
            <button type="submit" class="pull-right btn btn-md btn-primary">
              Update
            </button>
          </form>
        );
      } else {
        return (
          <div class="pull-left">
            <h3 class="pull-left">
              Your Designation :- {this.props.auth.user.designation}
            </h3>

            <h3 class="pull-left">
              Your Department :- {this.props.auth.user.department}
            </h3>
            <br />
            <button
              class="pull-left btn btn-lg btn-success"
              onClick={this.editmode}
            >
              Edit
            </button>
          </div>
        );
      }
    }
  };

  editmode = () => {
    this.setState({
      editMode: true
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      editMode: false
    });
    const obj = {
      des: this.state.des,
      dep: this.state.dep
    };
    this.props.setBasicInfo(obj);
  };

  render() {
    return (
      <div>
        <div id="wrapper">
          <nav
            class="navbar navbar-default navbar-cls-top "
            role="navigation"
            style={{ marginBottom: " 0" }}
          >
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".sidebar-collapse"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              {/* <a class="navbar-brand" href="index.html"></a> */}
            </div>
            <div
              style={{
                color: "white",
                padding: "15px 50px 5px 50px",
                fontSize: "16px",
                float: "right"
              }}
            >
              <button
                onClick={() => {
                  this.props.logoutUser();
                }}
                class="btn btn-danger square-btn-adjust"
              >
                Logout
              </button>{" "}
            </div>
          </nav>
          {/* /. NAV TOP  --> */}
          <nav class="navbar-default navbar-side" role="navigation">
            <div class="sidebar-collapse">
              <ul class="nav" id="main-menu">
                <li class="text-center">
                  <img
                    src="assets/img/find_user.png"
                    class="user-image img-responsive"
                  />
                </li>

                <li>
                  <Link class="active-menu" to="/admin-panel">
                    <i class="fa fa-dashboard fa-3x"></i> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/approve-lor">
                    <i class="fa fa-desktop fa-3x"></i> Approve LOR(s)
                  </Link>
                </li>
                <li>
                  <Link to="/approved-lors">
                    <i class="fa fa-qrcode fa-3x"></i> Approved LOR(s)
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          {/* /. NAV SIDE  --> */}
          <div id="page-wrapper">
            <div id="page-inner">
              <div class="row">
                <div class="col-md-12">
                  <h2>Admin Dashboard</h2>
                  <h5>Welcome {this.props.auth.user.name}</h5>
                </div>
              </div>
              <hr />
              {/* /. ROW  --> */}
              <div class="row container-fluid">
                <h2>Basic Info</h2>
                <br />
                <div class="pull-left col-md-6">
                  <br />
                  {this.props.auth.user.designation === "" ? (
                    <form onSubmit={this.onSubmit}>
                      <input
                        onChange={this.onChange}
                        name="des"
                        id="Designation"
                        placeholder="Enter Designation"
                        value={this.state.des}
                        class="form-control"
                      />
                      <br />
                      <input
                        onChange={this.onChange}
                        name="dep"
                        id="Department"
                        placeholder="Enter Department"
                        value={this.state.dep}
                        class="form-control"
                      />
                      <br />
                      <button
                        type="submit"
                        class="pull-right btn btn-md btn-primary"
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    ""
                  )}
                  {this.someStuff()}
                  {/* (
                    <div>
                      <h3>
                        Your Designation :- {this.props.auth.user.designation}
                      </h3>

                      <h3>
                        Your Department :- {this.props.auth.user.department}
                      </h3>
                      <button class=" btn btn-md btn-success">Edit</button>
                    </div>
                  ) */}
                </div>
                <div class="pull-right col-md-6">
                  <h2 style={{ fontSize: 15 }} class="pull-left ">
                    Upload you Signature image file
                  </h2>
                  <br />
                  <br />
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      const formData = new FormData();
                      formData.append("file", this.state.file);
                      this.props.uploadSignature(formData);

                      this.setState({
                        UploadedFile: null
                      });
                      this.props.getSignature();
                    }}
                  >
                    <div class=" custom-file">
                      {/* <input
                        value={this.state.sign}
                        id="file-id"
                        class=" pull-left"
                        type="file"
                        name="myImage"
                        onChange={e => {
                          this.setState({
                            sign: document.getElementById("file-id").files[0]
                          });
                        }}
                      />
                      <button class="pull-right btn " type="submit">
                        Upload
                      </button> */}
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        onChange={e => {
                          this.setState({
                            file: e.target.files[0],
                            fileName: e.target.files[0].name
                          });
                        }}
                      />

                      <input
                        type="submit"
                        value="Upload"
                        class="btn pull-left "
                      />
                    </div>
                  </form>
                  {this.state.UploadedFile ? (
                    <div class="row mt-5">
                      <img
                        class="img-responsive img-circle"
                        style={{ height: "50%", width: "50%" }}
                        src={this.state.UploadedFile.filePath}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* /. ROW  --> */}
              <hr />

              {/* /. ROW  --> */}

              {/* /. ROW  -->            */}
            </div>
            {/* /. PAGE INNER  --> */}
          </div>
          {/* /. PAGE WRAPPER  --> */}
        </div>
      </div>
    );
  }
}

AdminPanel.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStatetoProps, {
  logoutUser,
  setBasicInfo,
  getSignature,
  uploadSignature
})(AdminPanel);
