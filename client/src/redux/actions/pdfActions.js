import axios from "axios";

export const createPDF = (userData, history) => dispatch => {
  axios
    .post("/api/pdf/generate-pdfsxsx-of-lor", userData)
    .then(res => {
      history.push("/submitted-lors");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const getPDF = () => dispatch => {
  axios
    .get("/api/pdf/submLorss")
    .then(res => {
      dispatch({
        type: "GET_PDF",
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const previewPDF = userData => dispatch => {
  axios
    .post("/api/pdf/prevPDF", userData)
    .then(res => {
      dispatch({
        type: "PREV_PDF",
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const submitPdf = userData => dispatch => {
  axios
    .post("/api/pdf/submitPdf", userData)
    .then(res => {
      dispatch({
        type: "UPDATE_PDF_PAGE",
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const getSubmitedPdf = () => dispatch => {
  axios
    .get("/api/pdf/getSubmitedPdf")
    .then(res => {
      dispatch({
        type: "GET_SUBMITTED_PDF",
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const getApprovedPdf = () => dispatch => {
  axios
    .get("/api/pdf/getApprovedPdf")
    .then(res => {
      dispatch({
        type: "GET_SUBMITTED_PDF",
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const getsApprovedPdf = () => dispatch => {
  axios
    .get("/api/pdf/getsApprovedPdf")
    .then(res => {
      dispatch({
        type: "GET_SUBMITTED_PDF",
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const updateContent = content => dispatch => {
  axios
    .post("/api/pdf/updateContent", content)
    .then(res => {
      // dispatch({
      //   type: "UPDATE_LOR_CONTENT",
      //   payload: res.data
      // });
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};
