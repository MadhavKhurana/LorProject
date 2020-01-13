import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, getSignature } from "../../redux/actions/authActions";
import { getSubmitedPdf, previewPDF } from "../../redux/actions/pdfActions";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import axios from "axios";

class AdminPanel extends Component {
  state = {
    dashboard: true,
    loading: true,
    Document: "",
    show: false,
    editMode: false,
    count: 0,
    lorcontent: "a"
  };
  EditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
      lorcontent: this.props.pdf.submittedpdf.content
    });
  };
  onPdfSubmit = e => {
    let a;
    let studentEmail;
    this.props.pdf.submittedpdf.find(lor => {
      if (lor.to === this.props.auth.user.email) {
        a = lor.content;
        studentEmail = lor.from;
      }
    });
    const data = {
      filename: e.target.id,
      teacherName: this.props.auth.user.name,
      facultyDesignation: this.props.auth.user.designation,
      facultyDepartment: this.props.auth.user.department,
      content: a,
      sign: this.props.auth.signature.fileName,
      from: studentEmail
    };
    axios
      .post("/api/pdf/ApproveLor", data)
      .then(res => {})
      .catch(err => console.log(err));
  };

  onChanges = e => {
    let str = this.state.lorcontent;
    // console.log(str.);

    this.setState({
      [e.target.name]: e.target.value,
      count: e.target.value.length
    });
  };

  previewPDFs = e => {
    const pdffile = this.props.pdf.submittedpdf.filter(item => {
      return item.pdf == e.target.id;
    });
    // const array = pdffile[0].location.split("/");
    const path = `${pdffile[0].pdf}`;

    this.setState({ Document: path });
    this.setState({ show: !this.state.show });
  };

  componentDidMount() {
    if (this.props.auth.user.isAdmin === "false") {
      this.props.history.push("/user-panel");
    }
    this.props.getSubmitedPdf();
    this.props.getSignature();
  }

  componentWillReceiveProps(next) {
    this.setState({
      loading: false
    });
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
                  <Link to="/admin-panel">
                    <i class="fa fa-dashboard fa-3x"></i> Dashboard
                  </Link>
                </li>
                <li>
                  <Link class="active-menu" to="/approve-lor">
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
              {/* /. ROW  --> */}
              <h2>Approve LOR(s)</h2>
              <hr />
              <div class="row container-fluid">
                {this.state.editMode == false ? (
                  <table class="table table-hover">
                    <tbody>
                      {this.state.loading
                        ? "Loading"
                        : this.props.pdf.submittedpdf.map((item, i) => {
                            if (
                              item.pdfName ===
                              "No LOR(s) found. Please create one..."
                            ) {
                              return (
                                <tr>
                                  <td>{item.pdf}</td>
                                </tr>
                              );
                            } else {
                              if (this.state.show) {
                                return <div></div>;
                              } else {
                                return (
                                  <tr>
                                    <td>{item.pdf}</td>
                                    <td>
                                      <a
                                        target="_blank"
                                        href={`https://alllor.s3.ap-south-1.amazonaws.com/${item.pdf}`}
                                      >
                                        <button
                                          class="btn btn-success"
                                          id={`${item.pdf}`}
                                          // onClick={this.previewPDFs}
                                          to={`${item.to}`}
                                        >
                                          Preview
                                        </button>
                                      </a>
                                    </td>
                                    <td>
                                      <button
                                        class="btn btn-primary"
                                        id={`${item.pdf}`}
                                        onClick={this.EditMode}
                                        to={`${item.to}`}
                                      >
                                        &nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;
                                      </button>
                                    </td>
                                    <td>
                                      {this.state.show ? (
                                        ""
                                      ) : (
                                        <button
                                          to={`${item.to}`}
                                          class="btn btn-danger"
                                          id={`${item.pdf}`}
                                          onClick={this.onPdfSubmit}
                                        >
                                          Approve
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              }
                            }
                          })}
                    </tbody>
                  </table>
                ) : (
                  <div>
                    <h3>
                      <label class="pull-left" for="lorcontent">
                        LOR Content<h6> (max 1650 characters)</h6>
                      </label>
                      <h6 class="pull-right">
                        <b>count: {this.state.count}</b>
                      </h6>
                    </h3>
                    {this.state.count > 1650 ? (
                      <div class="alert alert-danger">
                        <strong>
                          Max number of characters are 1650. Please check the
                          count.
                        </strong>
                      </div>
                    ) : (
                      ""
                    )}
                    <textarea
                      class="form-control"
                      id="lorcontent"
                      onChange={this.onChanges}
                      placeholder="Enter Content"
                      rows="15"
                      name="lorcontent"
                      value={this.state.lorcontent}
                    ></textarea>
                    <br />
                    <button onClick={this.EditMode} className="btn btn-warning">
                      Update
                    </button>
                  </div>
                )}
              </div>
              <div align="center" class="container-fluid"></div>
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
  pdf: state.pdf,
  errors: state.errors
});

export default connect(mapStatetoProps, {
  logoutUser,
  getSubmitedPdf,
  previewPDF,
  getSignature
})(AdminPanel);
