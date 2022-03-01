import { ActionTypes } from "../constants/action-types";

export const setCurrentUser = (user) => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: user,
  };
};

export const setLoginStatus = (loginStatus) => {
  return {
    type: ActionTypes.SET_LOGIN_STATUS,
    payload: loginStatus,
  };
};
