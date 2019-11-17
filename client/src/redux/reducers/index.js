import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer.js";
import pdfReducer from "./pdfReducer.js";
// import postReducer from "./postReducer.js";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  pdf: pdfReducer
  //   post: postReducer
});
