import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";

class AdminPanel extends Component {
  state = {
    dashboard: true
  };

  componentDidMount() {
    if (this.props.auth.user.isAdmin === "false") {
      this.props.history.push("/user-panel");
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
                  <Link to="/admin-panel">
                    <i class="fa fa-dashboard fa-3x"></i> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/approve-lor">
                    <i class="fa fa-desktop fa-3x"></i> Approve LOR(s)
                  </Link>
                </li>
                <li>
                  <Link to="/approved-lors" class="active-menu">
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
              {/* /. ROW  --> */}
              <hr />
              <div class="row">
                <div class="col-md-3 col-sm-6 col-xs-6">
                  <div class="panel panel-back noti-box">
                    <span class="icon-box bg-color-red set-icon">
                      <i class="fa fa-envelope-o"></i>
                    </span>
                    <div class="text-box">
                      <p class="main-text">120 New</p>
                      <p class="text-muted">Messages</p>
                    </div>
                  </div>
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

export default connect(mapStatetoProps, { logoutUser })(AdminPanel);
