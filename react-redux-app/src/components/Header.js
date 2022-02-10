import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../redux/actions/productsActions";

const Header = () => {
  const dispatch = useDispatch();

  const onChangeSearchText = (evt) => {
    dispatch(setSearchText(evt.target.value));
  };

  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <h2>Web Store</h2>
      </div>

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
    </div>
  );
};

export default Header;
