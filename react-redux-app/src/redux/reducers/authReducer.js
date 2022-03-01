import { ActionTypes } from "../constants/action-types";

const intialState = {
  currentUser: {},
  loginStatus: false,
};

export const authReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    case ActionTypes.SET_LOGIN_STATUS:
      return { ...state, loginStatus: payload };
    default:
      return state;
  }
};
