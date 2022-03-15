import React, { useState, useEffect } from "react";

import {
  MenuItem,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardHeader,
  IconButton,
  TextField,
  Select,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import AdminService from "../../services/product-admin.service";

import Moment from "moment";

const AdminProductSales = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const products = useSelector((state) => state.allProducts.products);

  const [selectedProduct, setSelectedProduct] = useState({});
  useEffect(() => {
    console.log(products);
  }, []);

  const renderOptionsForProduct = () => {
    return products.map((dt, i) => {
      return (
        <MenuItem value={Number(dt.id)} key={i} name={dt.title}>
          <div>
            <img src={dt.image} className={classes.img} />
            &nbsp;&nbsp;
            {dt.title} - [{dt.category}]
          </div>
        </MenuItem>
      );
    });
  };
  const onProductChange = (e) => {
    let selectedProduct_ = {};
    products.forEach((pr) => {
      if (e.target.value === pr.id) selectedProduct_ = pr;
    });
    setSelectedProduct(selectedProduct_);
  };

  const getSubHeader = (subHeaderString) => {
    return <div className={classes.subHeader}>{subHeaderString}</div>;
  };
  const getTitle = (image, titleString, priceString) => {
    return (
      <div className={classes.title}>
        <div className={classes.price}>
          <img src={image} className={classes.imgDisplay} />
          &nbsp;&nbsp;
          <b>$ {priceString}</b>
        </div>
        {titleString}
      </div>
    );
  };

  const { id, title, category, price, image } = selectedProduct;
  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>[ Product Sales ]</h1>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            Product : &nbsp;&nbsp;
            <Select
              onChange={(e) => onProductChange(e)}
              value={selectedProduct}
            >
              {renderOptionsForProduct()}
            </Select>
          </Grid>

          {selectedProduct && selectedProduct.id > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className={classes.root}>
                <Card>               
                  <CardHeader                  
                    title={getTitle(image, title, price)}
                    subheader={getSubHeader(category)}
                  />
                  <CardContent>
                    <div>product sales report by chart</div>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ) : (
            <span></span>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default AdminProductSales;
