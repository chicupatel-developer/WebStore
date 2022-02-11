import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../redux/actions/productsActions";

import { Icon, Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onChangeSearchText = (evt) => {
    dispatch(setSearchText(evt.target.value));
  };

  const onClick = (item, optionName) => {
    console.log(optionName);
    navigate("/" + optionName);
  };

  return (
    <div className="ui menu">
      <Menu stackable>
        <Menu.Item>
          <img alt="logo" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>

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

        <Menu.Item>
          <div className="ui category search">
            <div className="ui icon input">
              <input
                onChange={(evt) => onChangeSearchText(evt)}
                className="prompt"
                type="text"
                placeholder="Search categories..."
              />
              <i className="search icon"></i>
            </div>
            <div className="results"></div>
          </div>
        </Menu.Item>
        
        <Menu.Menu position="right">
          <Menu.Item>
            <div className="ui icon buttons">
              <div
                className="ui button"
                onClick={(item) => onClick(item, "cart")}
              >
                <Icon name="cart arrow down" size="big" />
              </div>
            </div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default Header;
