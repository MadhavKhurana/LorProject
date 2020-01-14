const initialState = {
  lor: {},
  prevPDF: "",
  submittedpdf: []
};

const pdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PDF":
      return {
        ...state,
        lor: action.payload
      };
    case "GET_PDF":
      return {
        ...state,
        prevPDF: action.payload
      };
    case "UPDATE_PDF_PAGE":
      return {
        ...state,
        lor: action.payload
      };
    case "GET_SUBMITTED_PDF":
      return {
        ...state,
        submittedpdf: action.payload
      };
    // case "UPDATE_LOR_CONTENT":
    //   return {
    //     ...state,
    //     submittedpdf: action.payload
    //   };
    default:
      return state;
  }
};

export default pdfReducer;
