import axios from 'axios'
import {USER_INFO_URL} from '../constants/constants';

export const SET_RETRIEVING_USER_INFO = 'SET_RETRIEVING_USER_INFO';
export const SET_USER_INFO_ERROR = 'USER_INFO_ERROR';
export const SUCCESSFUL_USER_INFO = 'SUCCESSFUL_USER_INFO';


export function getUserInfo(){
    return dispatch => {
        dispatch(setRetrievingUserInfo(true));
        callUserApi((response, error) => {
            if (!error) {
                localStorage.setItem('USERID', response.UserId);
                dispatch(successfulUserInfo(response));   
            } else {
              console.error(error)
              dispatch(setUserInfoError(error));
            }
          });
    }
}


export function setRetrievingUserInfo(isUserInfoPending) {
    return {
      type: SET_RETRIEVING_USER_INFO,
      isUserInfoPending
    };
  }


export function successfulUserInfo(data){
  return {
      type: SUCCESSFUL_USER_INFO,
      payload: data
  }
}


export function setUserInfoError(userInfoError) {
    return {
      type: SET_USER_INFO_ERROR,
      userInfoError
    }
  }


export function callUserApi(callback){
    axios.get(USER_INFO_URL)
      .then(function (response) {
        //console.log(response);
        return callback(response.data, null);
      })
      .catch(function (error) {
        console.error(error);
        return callback(null, new Error('Error while retrieving user info'));
      })
}


export function callLoginApi(username, firstName, lastName, email, callback) {
   
}