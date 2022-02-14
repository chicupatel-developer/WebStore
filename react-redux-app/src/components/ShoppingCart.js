import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "semantic-ui-react";

const ShoppingCart = () => {
  // redux
  // read
  const myShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );
  
    
  useEffect(() => {}, []);

  const renderCart =
    myShoppingCart.length > 0 ? (
      myShoppingCart.map((product) => {
        const { id, title, category, price, image, qty } = product;

        return (
          <div className="ui grid" key={id}>
            <div className="two wide column"></div>
            <div className="eight wide column">
              <img src={image} className="ui mini rounded image" /> {title}
              <br />[{category}]<br />
              Price $ {price}
              <br />
              Qty : {qty}
              <br />
              Total $ {qty * price}
              <Divider />
            </div>
            <div className="six wide column">
              <span>-Qty</span>
              <span>+Qty</span>
              <span>Remove Item</span>
            </div>
          </div>
        );
      })
    ) : (
      <div className="ui div empty">
        <h3>Cart is Empty!</h3>
      </div>
    );
  return (
    <div className="ui container">
      <div>
        <h2>Shopping Cart</h2>
      </div>
      <p></p>
      <div>{renderCart}</div>
    </div>
  );
};

export default ShoppingCart;
