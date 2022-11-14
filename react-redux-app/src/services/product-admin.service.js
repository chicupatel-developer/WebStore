import http from "../product-admin-http-common";
import authHeader from "./auth-header";

class AdminService {
  addProductDiscount = async (data) => {
    return await http.post(`/addProductDiscount`, data, {
      headers: authHeader(),
    });
  };

  getProductDiscountData = async (productId) => {
    return await http.get(`/getProductDiscountData?productId=${productId}`, {
      headers: authHeader(),
    });
  };

  getMonthlyProductSales = async (data) => {
    return await http.post(`/getMonthlyProductSales`, data, {
      headers: authHeader(),
    });
  };

  getQuarterlyProductSales = async (data) => {
    return await http.post(`/getQuarterlyProductSales`, data, {
      headers: authHeader(),
    });
  };

  getDiscountZoneProductSales = async (data) => {
    return await http.post(`/getDiscountZoneProductSales`, data, {
      headers: authHeader(),
    });
  };

  getLast5DiscountZoneProductSales = async (data) => {
    return await http.post(`/getLast5DiscountZoneProductSales`, data, {
      headers: authHeader(),
    });
  };
}
export default new AdminService();
