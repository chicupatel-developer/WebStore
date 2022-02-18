import { ActionTypes } from "../constants/action-types";

export const setCustomerDetails = (customer) => {
  return {
    type: ActionTypes.SET_CUSTOMER_DETAILS,
    payload: customer,
  };
};