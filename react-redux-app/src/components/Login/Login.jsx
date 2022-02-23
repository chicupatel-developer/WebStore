import React, { useEffect } from "react";
import useStyles from "./styles";
import {
  Container,
  Typography,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../redux/actions/authActions";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const signin = () => {
    console.log("signin");

    // user as shopper
    var shopperUser = {
      userName: "shopper-user",
      password: "shopper-password",
    };

    // user as admin
    var adminUser = {
      userName: "admin-user",
      password: "admin-password",
    };

    let loginUser = shopperUser;
    // let loginUser = adminUser;

    // api check for user
    // if success, returns with token and user's other info like role etc.
    let apiResponse = {
      userName: loginUser.userName,
      role: "shopper-role",
      token: "shopper-token",
    };

    // store current user @ redux store
    dispatch(setCurrentUser(apiResponse));

    // store current user @ browser local storage
    localStorage.setItem("currentUser", JSON.stringify(apiResponse));
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Login</h1>
        <div onClick={(e) => signin(e)} className="ui button" tabIndex="0">
          <div className="visible content">Signin &nbsp;&nbsp;</div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
