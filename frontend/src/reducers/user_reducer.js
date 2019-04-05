import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, SUCCESSFUL_LOGIN, SUCCESSFUL_LOGOUT} from "../actions/login_actions";
import {  SET_RETRIEVING_USER_INFO, SET_USER_INFO_ERROR,SUCCESSFUL_USER_INFO} from "../actions/user_actions";


export default function reducer(state = {
  isLoginSuccess: localStorage.getItem('TOKEN') ? true : false,
  isUserInfoSuccess: false,
  isLoginPending: false,
  isRetrievingUserInfo: false,
  loginError: null,
  userInfoError: null,
  token: localStorage.getItem('TOKEN'),
  userId: localStorage.getItem('USERID'),
  userInfo: null,
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending,
        loginError: null,
      });


    case SET_RETRIEVING_USER_INFO:
      return Object.assign({}, state, {
        isRetrievingUserInfo: action.isRetrievingUserInfo,
        userInfoError: null,
      });


    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SUCCESSFUL_LOGIN:
      //console.log(action.payload);
      return Object.assign({}, state, {
        isLoginSuccess: true,
        token: action.payload.id,
        userId: action.payload.userId
    });


    case SUCCESSFUL_USER_INFO:
      //console.log(action.payload);
      return Object.assign({}, state, {
        isUserInfoSuccess: true,
        userInfo: action.payload
      });


    case SUCCESSFUL_LOGOUT:
      return Object.assign({}, state, {
        isLoginSuccess: false,
        token: null
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
    });


    case SET_USER_INFO_ERROR:
      return Object.assign({}, state, {
        userInfoError: action.userInfoError
      });

    default:
      return state;
  }
}