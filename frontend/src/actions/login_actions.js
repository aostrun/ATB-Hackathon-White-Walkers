import axios from 'axios'
import { LOGIN_URL } from '../constants/constants';

export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN';
export const SUCCESSFUL_LOGOUT = 'SUCCESSFUL_LOGOUT';

export const SUCCESSFUL_REGISTRATION = 'SUCCESSFUL_REGISTRATION';
export const FAILED_REGISTRATION = 'FAILED_REGISTRATION';


var qs = require('querystring');


export function login(username, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(username, password, (response, error) => {
      dispatch(setLoginPending(false));
      if (!error) {
        localStorage.setItem('TOKEN', response.access_token);
        localStorage.setItem('USERID', response.userId);
        dispatch(successfulLogin(response));
      } else {
        //console.log(error)
        dispatch(setLoginError(error));
      }
    });
  }
}



export function logout(token) {
  return dispatch => {
    dispatch(setLoginPending(false));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USERID');
  }
}

export function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

export function successfulLogin(data) {
  return {
    type: SUCCESSFUL_LOGIN,
    payload: data
  }
}

export function successfulLogout() {
  return {
    type: SUCCESSFUL_LOGOUT
  }
}

export function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

export function registrationFailed(){
  return {
    type: FAILED_REGISTRATION
  }
}

export function registrationSuccess(){
  return {
    type: SUCCESSFUL_REGISTRATION
  }
}

/*
export function callLogoutApi(token, callback) {
  axios.post(LOGOUT_URL, {
    query: {
      accessToken: token
    }
  }).then(response => {
    return callback(null, null);
  }).catch(error => {
    console.log(error);
    return callback(null, new Error('Invalid token provided'));
  })
}
*/

export function callLoginApi(username, password, callback) {
  axios.post(LOGIN_URL, qs.stringify({
    username: username,
    password: password,
    grant_type: 'password'
    //ttl: TWO_WEEKS
  }),
  {
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (response) {
    return callback(response.data, null);
  }).catch(function (error) {
    //console.log(error)
    return callback(null, new Error('Invalid email and password'));
  })
}