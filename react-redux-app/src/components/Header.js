import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../redux/actions/productsActions";

import { Icon } from "semantic-ui-react";

import { useNavigate } from "react-router-dom";


const Header = () => {
  const dispatch = useDispatch();

const navigate = useNavigate();

  const onChangeSearchText = (evt) => {
    dispatch(setSearchText(evt.target.value));
  };

  const onClick = (item, optionName) => {
    console.log(optionName);
    navigate("/"+optionName);
  };

  return (
    <div className="ui menu">
      <div className="item">
        <h2>Web-Store</h2>
      </div>

      <div className="item">
        <div
          className="ui icon buttons"
          onClick={(item) => onClick(item, "home")}
        >
          <div className="ui button">
            <h4>Home</h4>
          </div>
        </div>
      </div>
      <div className="item">
        <div
          className="ui icon buttons"
          onClick={(item) => onClick(item, "products")}
        >
          <div className="ui button">
            <h4>Products</h4>
          </div>
        </div>
      </div>
      <div className="right menu">
        <div className="item">
          <div className="ui icon buttons">
            <div
              className="ui button"
              onClick={(item) => onClick(item, "cart")}
            >
              <Icon name="cart arrow down" size="big" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
