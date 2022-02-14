import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setMyShoppingCart,
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";

const ProductComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux
  // read
   const newShoppingCart = useSelector(
     (state) => state.allProducts.myShoppingCart
   );


  const products = useSelector((state) => state.allProducts.products);
  const searchText = useSelector((state) => state.allProducts.searchText);
  let filterProducts = [];
  if (searchText !== "") {
    filterProducts = products.filter((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else {
    filterProducts = products;
  }

    const onClick = (e, product) => {
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
  const onDetailsClick = (e, product) => {
    navigate(`/product/${product.id}`);
  };

  const renderList =
    filterProducts.length > 0 ? (
      filterProducts.map((product) => {
        const { id, title, image, price, category } = product;
        return (
          <div className="five wide column" key={id}>
            <div>
              <div className="ui cards">
                <div className="card">
                  <div className="image">
                    <img src={image} alt={title} />
                  </div>
                  <div className="content">
                    <div className="header">{title}</div>
                    <div className="meta price">$ {price}</div>
                    <div className="meta">{category}</div>
                    <div
                      onClick={(e) => onClick(e, product)}
                      className="ui vertical animated button leftAlign"
                      tabIndex="0"
                    >
                      <div className="hidden content">
                        <i className="shop icon"></i>
                      </div>
                      <div className="visible content">+ Cart</div>
                    </div>
                    <div
                      onClick={(e) => onDetailsClick(e, product)}
                      className="ui button rightAlign"
                      tabIndex="1"
                    >
                      <div className="visible content">Details</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="ui div empty">
        <h3>Products Not Found!</h3>
      </div>
    );

  return <>{renderList}</>;
};

export default ProductComponent;
