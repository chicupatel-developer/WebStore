import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const [myCart, setMyCart] = useState([]);

  const getMyCart = () => {
    setMyCart(JSON.parse(localStorage.getItem("myCart") || "[]"));
  };

  useEffect(() => {
    getMyCart();
  }, []);

  const renderCart =
    myCart.length > 0 ? (
      myCart.map((product) => {
        const { id, title, category, price, image, qty } = product;

        return (
          <div className="text container" key={id}>
            <span >
              <div className="ui cards">
                <div
                  className="card"
                  style={{
                    width: "800px",
                    // backgroundImage: `url(https://cdn.pixabay.com/photo/2017/05/13/15/18/dear-2309801_1280.jpg)`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="content">
                    <div className="header">
                      <img src={image} className="ui mini rounded image" />{" "}
                      {title}
                    </div>
                    <div className="meta">[{category}]</div>
                    <div className="meta">Price $ {price}</div>
                    <div className="meta">Qty : {qty}</div>
                    <div className="meta">
                      Total $ {qty * price}
                      <span className="actionSpan">-Qty</span>
                      <span className="actionSpan">+Qty</span>
                      <span className="actionSpan">Remove Item</span>
                    </div>
                  </div>
                </div>
              </div>
            </span>
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
