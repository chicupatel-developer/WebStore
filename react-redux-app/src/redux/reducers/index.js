import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./productsReducer";
import { checkoutReducer } from "./checkoutReducer";
import { authReducer } from "./authReducer";
import { historyReducer } from "./historyReducer";
import { adminReducer } from "./adminReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  checkout: checkoutReducer,
  auth: authReducer,
  shopperHistory: historyReducer,
  admin: adminReducer,
});
export default reducers;
