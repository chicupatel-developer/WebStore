import React, { useEffect } from "react";
import useStyles from "./styles";
import {
  Container,
  Typography,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";

const AdminProductSales = () => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>Admin Area [ Product Sales ]</h1>      
      </Container>
    </div>
  );
};

export default AdminProductSales;
