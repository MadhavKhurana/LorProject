import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, getFaculty } from "../../redux/actions/authActions";
import { createPDF } from "../../redux/actions/pdfActions";
import { withRouter } from "react-router";

class LorPage extends Component {
  state = {
    name: this.props.auth.user.name,
    lorcontent: "",
    teacherName: "",
    temail: "",
    dep: "",
    des: "",
    faculty: []
  };

  componentWillReceiveProps(next) {
    // console.log(next.auth.faculty);
    this.setState({
      faculty: next.auth.faculty
    });
  }

  faculties = () => {
    this.state.faculty.map(admin => {
      return (
        <option
          id={admin.designation}
          dep={admin.department}
          value={`${admin.name}`}
        >
          {admin.name}({admin.department})
        </option>
      );
    });
  };

  onChangeteacher = e => {
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index];
    let a = optionElement.getAttribute("id");
    let v = optionElement.getAttribute("dep");
    let email = optionElement.getAttribute("email");
    // console.log(v);

    this.setState({
      temail: email,
      teacherName: e.target.value,
      dep: v,
      des: a
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const content = {
      studentName: this.state.name,
      content: this.state.lorcontent,
      teacherName: this.state.teacherName,
      email: this.props.auth.user.email,
      facultyDesignation: this.state.des,
      facultyDepartment: this.state.dep,
      temail: this.state.temail
    };
    // console.log(content);

    this.props.createPDF(content, this.props.history);
  };

  componentDidMount() {
    this.props.getFaculty();
    if (this.props.auth.user.isAdmin == "true") {
      this.props.history.push("/admin-panel");
    }
  }

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
              <a class="navbar-brand" href="index.html"></a>
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
                  <Link to="/user-panel">
                    <i class="fa fa-dashboard fa-3x"></i> Dashboard
                  </Link>
                </li>
                <li>
                  <Link class="active-menu">
                    <i class="fa fa-desktop fa-3x"></i> Generate LOR
                  </Link>
                </li>
                <li>
                  <Link to="/submitted-lors">
                    <i class="fa fa-qrcode fa-3x"></i> Submitted Lor's
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
                  <h2>Create Your LOR</h2>
                </div>
              </div>
              {/* /. ROW  --> */}
              <hr />
              <div class="row">
                <div class="container-fluid">
                  <form onSubmit={this.onSubmit}>
                    <h3>
                      <label class="pull-left" for="formGroupName">
                        Student Name
                      </label>
                    </h3>

                    <input
                      type="text"
                      class="form-control"
                      id="formGroupName"
                      onChange={this.onChange}
                      placeholder="Enter Name"
                      value={this.props.auth.user.name}
                      name="studentName"
                    />
                    <br />
                    <h3>
                      <label class="pull-left" for="lorcontent">
                        LOR Content
                      </label>
                    </h3>
                    <textarea
                      class="form-control"
                      id="lorcontent"
                      onChange={this.onChange}
                      placeholder="Enter Content"
                      rows="15"
                      name="lorcontent"
                    ></textarea>
                    <br />
                    <h3>
                      <label class="pull-left" for="teacherName">
                        Faculty Name
                      </label>
                    </h3>
                    {/* <input
                      type="text"
                      class="form-control"
                      id="teacherName"
                      onChange={this.onChange}
                      placeholder="Teacher Name"
                      name="teacherName"
                    /> */}

                    <select
                      onChange={this.onChangeteacher}
                      name="teacherName"
                      class="form-control"
                    >
                      <option selected>Select Faculty</option>
                      {this.state.faculty.map(admin => {
                        return (
                          <option
                            email={admin.email}
                            id={admin.designation}
                            dep={admin.department}
                            value={`${admin.name}`}
                          >
                            {admin.name} ({admin.department})
                          </option>
                        );
                      })}
                      {/* <option selected>Teacher Name</option>
                      <option value="volvo">Volvo</option>
                      <option value="fiat">Fiat</option>
                      <option value="audi">Audi</option> */}
                    </select>
                    <br />

                    <button
                      type="submit"
                      class="btn btn-primary"
                      value="submit"
                    >
                      Submit
                    </button>
                  </form>
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

LorPage.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStatetoProps, { logoutUser, createPDF, getFaculty })(
  withRouter(LorPage)
);
