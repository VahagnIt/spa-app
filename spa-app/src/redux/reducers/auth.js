import {
  AUTH_SUCCESS,
  LOGOUT,
  REGISTER_ERROR,
  LOGIN_ERROR
} from "../actions/actionTypes";

const initialState = {
  token: null,
  registerError: "",
  loginError: ""
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        registerError: "",
        loginError: ""
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        registerError: "",
        loginError: ""
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registerError: "Something goes wrong, try later",
        loginError: ""
      };
    case LOGIN_ERROR:
      return {
        ...state,
        registerError: "",
        loginError: "Incorrect email or password"
      };
    default:
      return state;
  }
}
