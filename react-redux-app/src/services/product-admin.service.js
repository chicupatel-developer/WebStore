import http from "../product-admin-http-common";

class ShopperService {
  addProductDiscount = async (data) => {
    return await http.post(`/addProductDiscount`, data);
  };

}
export default new ShopperService();
