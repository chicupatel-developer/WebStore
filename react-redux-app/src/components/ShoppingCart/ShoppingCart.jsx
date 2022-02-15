import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "semantic-ui-react";
import { setMyShoppingCart } from "../../redux/actions/productsActions";
import { Icon } from "semantic-ui-react";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  // redux
  // read
  const myShoppingCart = useSelector(
    (state) => state.allProducts.myShoppingCart
  );

  useEffect(() => {}, []);

  const onMinus = (e, id, product) => {
    let item = myShoppingCart.find((x) => x.id === id);
    if (item !== undefined) {
      var index = myShoppingCart.findIndex((x) => x.id === id);
      var qty_ = myShoppingCart[index].qty;
      let newCart = [...myShoppingCart];
      if (qty_ > 1) {
        // - qty of item from cart
        newCart[index] = { ...product, qty: qty_ - 1 };
      } else {
        // remove item from cart
        newCart = newCart.filter((t) => t.id !== id);
      }
      // redux
      // write
      dispatch(setMyShoppingCart(newCart));
    }
  };
  const onPlus = (e, id, product) => {
    let item = myShoppingCart.find((x) => x.id === id);
    if (item !== undefined) {
      var index = myShoppingCart.findIndex((x) => x.id === id);
      var qty_ = myShoppingCart[index].qty;
      let newCart = [...myShoppingCart];
      newCart[index] = { ...product, qty: qty_ + 1 };
      // redux
      // write
      dispatch(setMyShoppingCart(newCart));
    }
  };

  const getCartTotal = () => {
    let cartTotal = 0.0;
    myShoppingCart.map((item) => {
      cartTotal = cartTotal + item.qty * item.price;
    });
    var paymentAmount = cartTotal.toFixed(2);
    var paymentAmountRounded = (
      Math.ceil(paymentAmount * 20 - 0.5) / 20
    ).toFixed(2);
    // return cartTotal + '  [$ ' + paymentAmountRounded + ']';
    return 'Cart Total : $ '+paymentAmountRounded;
  };

  const onPayment = () => {
    console.log("payment!");
  };

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
              Total $ {qty * price}
              <Divider />
            </div>
            <div className="six wide column">
              <span>
                <div
                  onClick={(e) => onMinus(e, id, product)}
                  className="ui button minusBtn"
                >
                  <div className="visible content">
                    <Icon name="cart arrow down" size="big" />
                  </div>
                </div>
              </span>
              <span>&nbsp;{qty}&nbsp;&nbsp;</span>
              <span>
                <div
                  onClick={(e) => onPlus(e, id, product)}
                  className="ui button plusBtn"
                >
                  <div className="visible content">
                    <Icon name="cart plus" size="big" />
                  </div>
                </div>
              </span>
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
        <h4>
          {myShoppingCart.length > 0 && (
            <span className="cartTotal">
              {getCartTotal()}
              &nbsp;&nbsp;&nbsp;
              <div onClick={(e) => onPayment(e)} className="ui button">
                <div className="visible content">
                  Pay By  <Icon name="cc visa" size="big" />
                </div>
              </div>
            </span>
          )}
        </h4>
      </div>
      <p></p>
      <div>{renderCart}</div>
    </div>
  );
};

export default ShoppingCart;
