import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { getApprovedPdf, previewPDF } from "../../redux/actions/pdfActions";
import { Document, Page } from "react-pdf/dist/entry.webpack";

class AdminPanel extends Component {
  state = {
    dashboard: true,
    Document: "",
    show: false,
    loading: true
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
    this.props.getApprovedPdf();
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
              <div class="row container-fluid">
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
                                    {this.state.show ? (
                                      ""
                                    ) : (
                                      <a
                                        target="_blank"
                                        href={`https://alllor.s3.ap-south-1.amazonaws.com/${item.pdf}`}
                                      >
                                        <button
                                          class="btn btn-success"
                                          id={`${item.content}`}
                                          // onClick={this.previewPDFs}
                                          to={`${item.to}`}
                                        >
                                          Preview
                                        </button>
                                      </a>
                                    )}
                                  </td>
                                  <td>
                                    {/* {this.state.show ? (
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
                                    )} */}
                                  </td>
                                </tr>
                              );
                            }
                          }
                        })}
                  </tbody>
                </table>
              </div>
              <div align="center" class="container-fluid">
                {this.state.show ? (
                  <div>
                    <Document
                      file={`./${this.state.Document}`}
                      onLoadError={console.error}
                    >
                      <Page pageNumber={1} />
                    </Document>
                    <button
                      class="btn btn-lg btn-primary"
                      onClick={() => {
                        this.setState({ show: false });
                      }}
                    >
                      Done
                    </button>{" "}
                    {/* <button
                      class="btn btn-lg btn-danger"
                      onClick={this.onPdfSubmit}
                    >
                      Submit
                    </button> */}
                  </div>
                ) : (
                  ""
                )}
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
  errors: state.errors,
  pdf: state.pdf
});

export default connect(mapStatetoProps, {
  logoutUser,
  getApprovedPdf,
  previewPDF
})(AdminPanel);
