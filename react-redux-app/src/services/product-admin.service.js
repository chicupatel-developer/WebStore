import http from "../product-admin-http-common";

class AdminService {
  addProductDiscount = async (data) => {
    return await http.post(`/addProductDiscount`, data);
  };

}
export default new AdminService();
