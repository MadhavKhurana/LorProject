import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.isAdmin === "true") {
        this.props.history.push("/admin-panel");
      } else {
        this.props.history.push("/user-panel");
      }
    }
  }

  render() {
    return (
      <div>
        <nav
          style={{ position: "relative" }}
          class="navbar navbar-default navbar-fixed-top"
        >
          <div class="container">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>

              <a
                class="navbar-brand"
                style={{ height: "50%", backgroundColor: "white" }}
              >
                <img src={require("./Assets/logo.png")} />
              </a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav navbar-right">
                <li>
                  <a
                    style={{ fontSize: "18px", paddingTop: "30px" }}
                    href="#services"
                  >
                    SERVICES
                  </a>
                </li>

                <li>
                  <a
                    style={{ fontSize: "18px", paddingTop: "30px" }}
                    href="#contact"
                  >
                    CONTACT
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="jumbotron text-center row">
          <div className="col-md-4"></div>
          <div className="col-md-2">
            <Link to="/student-login">
              <img
                src={require("./Assets/student.png")}
                style={{ height: "150px" }}
              />
              <br />
              <br />
              <h2>Student Portal</h2>
            </Link>
          </div>
          <div className="col-md-2">
            <Link to="/admin-login">
              <img
                src={require("./Assets/school.png")}
                style={{ height: "150px" }}
              />
              <br />
              <br />
              <h2>Admin Portal</h2>
            </Link>
          </div>
        </div>

        {/* <!-- Container (Services Section) --> */}
        <div id="services" class="container-fluid text-center">
          <h2>SERVICES</h2>
          <h4>What we offer</h4>
          <br />
          <div class="row slideanim">
            <div class="col-sm-4">
              {/* <span class="glyphicon glyphicon-off logo-small"></span>
              <h4>POWER</h4>
              <p>Lorem ipsum dolor sit amet..</p> */}
            </div>
            <div class="col-sm-4">
              <img
                src={require("./Assets/recommend.png")}
                style={{ height: "100px" }}
              />
              <h4>Letter of Recommendation</h4>
              <p>Submit your info and get approved by Faculty...</p>
            </div>
            <div class="col-sm-4">
              {/* <span class="glyphicon glyphicon-lock logo-small"></span>
              <h4>JOB DONE</h4>
              <p>Lorem ipsum dolor sit amet..</p> */}
            </div>
          </div>
          <br />
          <br />
        </div>

        {/* <!-- Container (Portfolio Section) --> */}

        {/* <!-- Container (Contact Section) --> */}
        <div id="contact" class="container-fluid bg-grey">
          <h2 class="text-center">CONTACT</h2>
          <div class="row">
            <div class="col-sm-5">
              <p>Contact us and we'll get back to you within 24 hours.</p>
              <p>
                <span class="glyphicon glyphicon-map-marker"></span> Technical
                Support, Manipal university Jaipur
              </p>
              <p>
                <span class="glyphicon glyphicon-envelope"></span>{" "}
                myemail@something.com
              </p>
            </div>
            <div class="col-sm-7 slideanim">
              <div class="row">
                <div class="col-sm-6 form-group">
                  <input
                    class="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    required
                  />
                </div>
                <div class="col-sm-6 form-group">
                  <input
                    class="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                  />
                </div>
              </div>
              <textarea
                class="form-control"
                id="comments"
                name="comments"
                placeholder="Comment"
                rows="5"
              ></textarea>
              <br />
              <div class="row">
                <div class="col-sm-12 form-group">
                  <button class="btn btn-default pull-right" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStatetoProps)(Home);
