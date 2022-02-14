import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setMyShoppingCart,
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";

const ProductDetails = () => {
  // redux
  // read
  const newShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );

  // cart
  const addToCart = (product) => {
    let item = newShoppingCart.find((x) => x.id === product.id);
    console.log(item);
    if (item === undefined) {
      console.log("add to cart");
      // item not in cart
      // add
      let cartItem = {
        id: product.id,
        qty: 1,
        image: product.image,
        title: product.title,
        category: product.category,
        price: product.price,
      };
      newShoppingCart.push(cartItem);

      // redux
      // write
      dispatch(setMyShoppingCart(newShoppingCart));
    } else {
      console.log("edit to cart");
      // item already in cart
      // edit qty
      var index = newShoppingCart.findIndex((x) => x.id === product.id);
      var qty_ = newShoppingCart[index].qty;
      const newCart = [...newShoppingCart];
      newCart[index] = { ...product, qty: qty_ + 1 };

      // redux
      // write
      dispatch(setMyShoppingCart(newCart));
    }
  };
  /*
  const addToCart = (product) => {
  
    let item = newShoppingCart.find((x) => x.id === product.id);
    console.log(item);
    if (item === undefined) {
      console.log("add to cart");
      // item not in cart
      // add
      let cartItem = {
        id: product.id,
        qty: 1,
        image: product.image,
        title: product.title,
        category: product.category,
        price: product.price,
      };
      newShoppingCart.push(cartItem);
      
      // redux
      // write
      dispatch(setMyShoppingCart(newShoppingCart));    
    } else {
      console.log("edit to cart");
      // item already in cart
      // edit qty
      var index = newShoppingCart.findIndex((x) => x.id === product.id);
      var qty_ = newShoppingCart[index].qty;
      const newCart = [...newShoppingCart];
      newCart[index] = { ...product, qty: qty_ + 1 };
     
      // redux
      // write
      dispatch(setMyShoppingCart(newCart));
    }
  };
  */

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

    // cart
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
