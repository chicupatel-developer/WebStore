import http from "../product-admin-http-common";

class AdminService {
  addProductDiscount = async (data) => {
    return await http.post(`/addProductDiscount`, data);
  };

  getProductDiscountData = async (productId) => {
    return await http.get(`/getProductDiscountData?productId=${productId}`);
  };

  getMonthlyProductSales = async (data) => {
    return await http.post(`/getMonthlyProductSales`, data);
  };

  getQuarterlyProductSales = async (data) => {
    return await http.post(`/getQuarterlyProductSales`, data);
  };

  getDiscountZoneProductSales = async (data) => {
    return await http.post(`/getDiscountZoneProductSales`, data);
  };
}
export default new AdminService();
