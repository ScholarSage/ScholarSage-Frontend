// src/reducers/userReducer.js
const initialState = {
  user: {
    unseenNotificatins: [],
    // add any other default properties that you need
  },
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_USER_SUCCESS":
      return { ...state, isLoading: false, user: action.payload };
    case "FETCH_USER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
