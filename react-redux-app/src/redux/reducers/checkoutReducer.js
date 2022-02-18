import { ActionTypes } from "../constants/action-types";
const intialState = {
  customerDetails: {},
};

export const checkoutReducer = (state = intialState, { type, payload }) => {
  switch (type) {  
    case ActionTypes.SET_CUSTOMER_DETAILS:
      return { ...state, customerDetails: payload };
    default:
      return state;
  }
};
