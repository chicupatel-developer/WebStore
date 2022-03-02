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
        <p></p>
        <div>
          <ul>
            <li>Select Product from list</li>
            <li>
              Display Bar chart of selected product for current year's total
              sales
            </li>
            <li>Select Year from list</li>
            <li>
              Display Bar chart of selected product for selected year's total
              sales
            </li>
            <li>Select 5 years Sales from list</li>
            <li>
              Display Bar chart of selected product for 5 years' total
              sales
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default AdminProductSales;
