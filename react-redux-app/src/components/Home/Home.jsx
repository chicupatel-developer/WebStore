import React, { useEffect } from "react";
import { Icon } from "semantic-ui-react";

import useStyles from "./styles";
import Container from "@material-ui/core/Container";

const Home = () => {
  const classes = useStyles();

  useEffect(() => {}, []);

  const signin = () => {
    console.log("signin");

    var userUser = {
      userName: "user-user",
      role: "user-role",
      token: "user-token",
    };
    var adminUser = {
      userName: "admin-user",
      role: "admin-role",
      token: "admin-token",
    };
  };

  const signout = () => {
    console.log("signout");
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Home</h1>
        <div onClick={(e) => signin(e)} className="ui button" tabIndex="0">
          <div className="visible content">
            Signin &nbsp;&nbsp;
            <Icon name="sign in alternate" size="large" />
          </div>
        </div>
        <div onClick={(e) => signout(e)} className="ui button" tabIndex="1">
          <div className="visible content">
            Signout &nbsp;&nbsp;
            <Icon name="sign out alternate" size="large" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
