import http from "../product-shopper-http-common";

class ShopperService {

  addProductSold = async (data) => {
    return await http.post(`/addProductSold`, data);
  };
}
export default new ShopperService();
