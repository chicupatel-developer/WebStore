import React, { useEffect, useState } from "react";

import useStyles from "./styles";
import {
  TextField,
  Container,
  Typography,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Home</h1>
      </Container>
    </div>
  );
};

export default Home;
