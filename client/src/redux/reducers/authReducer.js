const initialState = {
  isAuthenticated: false,
  user: {},
  faculty: [],
  signature: {}
};

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "BASIC_ADMIN_INFO":
      return {
        ...state,
        user: action.payload
      };
    case "GET_FACULTY":
      return {
        ...state,
        faculty: action.payload
      };
    case "SET_SIGNATURE":
      return {
        ...state,
        signature: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
