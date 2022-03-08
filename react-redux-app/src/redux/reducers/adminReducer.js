import { ActionTypes } from "../constants/action-types";
const intialState = {
  productForDiscount: {},
};

export const adminReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCT_FOR_DISCOUNT:
      return { ...state, products: payload }; 
    default:
      return state;
  }
};