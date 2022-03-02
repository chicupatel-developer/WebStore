import http from "../product-http-common";

class ProductService {

  addProductSold = async (data) => {
    return await http.post(`/addProductSold`, data);
  };
}
export default new ProductService();
