import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";
import { Button } from "semantic-ui-react";

const ProductDetails = () => {
  // cart
  const [shoppingCart, setShoppingCart] = useState([]);

  const addToCart = (product) => {
    let newShoppingCart = JSON.parse(localStorage.getItem("myCart") || "[]");

    let item = newShoppingCart.find((x) => x.id === product.id);
    console.log(item);
    if (item === undefined) {
      console.log("add to cart");
      // item not in cart
      // add
      let cartItem = {
        id: product.id,
        qty: 1,
      };
      newShoppingCart.push(cartItem);
      setShoppingCart(newShoppingCart);
      localStorage.setItem("myCart", JSON.stringify(newShoppingCart));
    } else {
      console.log("edit to cart");
      // item already in cart
      // edit qty
      var index = newShoppingCart.findIndex((x) => x.id === product.id);
      var qty_ = newShoppingCart[index].qty;
      const newCart = [...newShoppingCart];
      newCart[index] = { id: product.id, qty: qty_ + 1 };
      setShoppingCart(newCart);
      localStorage.setItem("myCart", JSON.stringify(newCart));
    }   
  };

  const { productId } = useParams();

  let product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;

  const dispatch = useDispatch();

  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);

    var myCart = JSON.parse(localStorage.getItem("myCart") || "[]");
    console.log(myCart);

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider"></div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <span className="ui teal tag label">$ {price}</span>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div
                  onClick={() => addToCart(product)}
                  className="ui vertical animated button"
                  tabIndex="0"
                >
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
