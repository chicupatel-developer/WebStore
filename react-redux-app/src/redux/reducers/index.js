import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./productsReducer";
import { checkoutReducer } from "./checkoutReducer";
import { authReducer } from "./authReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  checkout: checkoutReducer,
  auth: authReducer,
});
export default reducers;
