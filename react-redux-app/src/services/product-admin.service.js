import http from "../product-admin-http-common";

class AdminService {
  addProductDiscount = async (data) => {
    return await http.post(`/addProductDiscount`, data);
  };

  getProductDiscountData = async (productId) => {
    return await http.get(`/getProductDiscountData?productId=${productId}`);
  };
}
export default new AdminService();
