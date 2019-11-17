import axios from "axios";
import setAuthToken from "../../utils/setAuthToken.js";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register-user", userData)
    .then(res => history.push("/login-user"))
    .catch(err => {
      console.log(err);

      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login-user", userData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtTokenMujLor", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const loginAdmin = userData => dispatch => {
  axios
    .post("/api/users/login-admin", userData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtTokenMujLor", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtTokenMujLor");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setBasicInfo = userData => dispatch => {
  axios
    .post("/api/users/setAdminInfo", userData)
    .then(res => {
      dispatch({
        type: "BASIC_ADMIN_INFO",
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

export const getFaculty = () => dispatch => {
  axios
    .get("/api/users/getFaculty")
    .then(res => {
      dispatch({
        type: "GET_FACULTY",
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

export const uploadSignature = userData => dispatch => {
  axios
    .post("/api/users/upload", userData, {
      header: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      dispatch({
        type: "SET_SIGNATURE",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const getSignature = () => dispatch => {
  axios
    .get("/api/users/getSignature")
    .then(res => {
      dispatch({
        type: "SET_SIGNATURE",
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};
