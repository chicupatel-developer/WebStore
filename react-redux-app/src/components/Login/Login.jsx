import React, { useEffect } from "react";
import useStyles from "./styles";
import {
  Container,
  Typography,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";

const Login = () => {
  const classes = useStyles();

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

    // api check for user
    // if success, returns with token and user's other info like role etc.
    let apiResponse = {
      userName: loginUser.userName,
      role: "shopper-role",
      token: "shopper-token",
    };

      
      
      
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Home</h1>
        <div onClick={(e) => signin(e)} className="ui button" tabIndex="0">
          <div className="visible content">Signin &nbsp;&nbsp;</div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
