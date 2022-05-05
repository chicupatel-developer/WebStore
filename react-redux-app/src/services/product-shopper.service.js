import http from "../product-shopper-http-common";
import authHeader from "./auth-header";

class ShopperService {
  addProductSold = async (data) => {
    return await http.post(`/addProductSold`, data, { headers: authHeader() });
  };

  getTodayHistory = async (userName) => {
    return await http.get(`/getTodayHistory?userName=${userName}`, {
      headers: authHeader(),
    });
  };

  getWeekHistory = async (userName) => {
    return await http.get(`/getCurrentWeekHistory?userName=${userName}`, {
      headers: authHeader(),
    });
  };

  getMonthHistory = async (userName) => {
    return await http.get(`/getCurrentMonthHistory?userName=${userName}`, {
      headers: authHeader(),
    });
  };

  getProductDiscountData = async (userName) => {
    return await http.get(`/getProductDiscountData?userName=${userName}`, {
      headers: authHeader(),
    });
  };
}
export default new ShopperService();
