import axios from "axios";
import {
  AUTH_SUCCESS,
  LOGOUT,
  REGISTER_ERROR,
  LOGIN_ERROR
} from "./actionTypes";

export function auth(email, password, isLogin) {
  return async dispatch => {
    const member = {
      email,
      password,
      returnSecureToken: true
    };
    try {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCIcoYnWemuaZWU8NaCrbAZgQLSjg5Tqyk";
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCIcoYnWemuaZWU8NaCrbAZgQLSjg5Tqyk";
      }
      const response = await axios.post(url, member);
      const data = response.data;
      const expiresDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      localStorage.setItem("expiresDate", expiresDate);
      dispatch(authSuccess(data.idToken));
      dispatch(autoLogout(data.expiresIn));
    } catch (e) {
      if (isLogin) {
        dispatch(loginError());
      } else {
        dispatch(registerError());
      }
    }
  };
}

export function loginError() {
  return {
    type: LOGIN_ERROR
  };
}

export function registerError() {
  return {
    type: REGISTER_ERROR
  };
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiresDate = new Date(localStorage.getItem("expiresDate"));
      if (expiresDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(autoLogout((expiresDate.getTime() - new Date()) / 1000));
      }
    }
  };
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiresDate");
  return {
    type: LOGOUT
  };
}
export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  };
}
