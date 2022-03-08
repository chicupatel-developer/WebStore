import { ActionTypes } from "../constants/action-types";

export const setProductForDiscount = (product) => {
  return {
    type: ActionTypes.SET_PRODUCT_FOR_DISCOUNT,
    payload: product,
  };
};

