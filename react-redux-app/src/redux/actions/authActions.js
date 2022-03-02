import { ActionTypes } from "../constants/action-types";

export const setCurrentUser = (user) => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: user,
  };
};


export const setRegisterStatus = (rStatus) => {
  return {
    type: ActionTypes.SET_REGISTER_STATUS,
    payload: rStatus,
  };
};
