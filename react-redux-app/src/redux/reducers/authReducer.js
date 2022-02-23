import { ActionTypes } from "../constants/action-types";

const intialState = {
  currentUser: {},
};

export const authReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: payload };   
    default:
      return state;
  }
};
