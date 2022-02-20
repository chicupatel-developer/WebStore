import { ActionTypes } from "../constants/action-types";

export const setCustomerDetails = (customer) => {
  return {
    type: ActionTypes.SET_CUSTOMER_DETAILS,
    payload: customer,
  };
};

export const setShippingDetails = (shipping) => {
  return {
    type: ActionTypes.SET_SHIPPING_DETAILS,
    payload: shipping,
  };
};