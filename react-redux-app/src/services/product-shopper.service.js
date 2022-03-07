import http from "../product-shopper-http-common";

class ShopperService {
  addProductSold = async (data) => {
    return await http.post(`/addProductSold`, data);
  };

  getTodayHistory = async (userName) => {
    return await http.get(`/getTodayHistory?userName=${userName}`);
  };

  getWeekHistory = async (userName) => {
    return await http.get(`/getCurrentWeekHistory?userName=${userName}`);
  };

  getMonthHistory = async (userName) => {
    return await http.get(`/getCurrentMonthHistory?userName=${userName}`);
  };
}
export default new ShopperService();
