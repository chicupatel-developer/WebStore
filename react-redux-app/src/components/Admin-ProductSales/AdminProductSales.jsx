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

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const AdminProductSales = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const products = useSelector((state) => state.allProducts.products);
  const years = [2018, 2019, 2020, 2021, 2022];

  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedYear, setSelectedYear] = useState(0);
  useEffect(() => {
    console.log(products);
  }, []);

  // product
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

    let monthlyProductSales = {
      productId: selectedProduct_.id,
      year: Number(selectedYear),
    };
    getMonthlyProductSalesData(monthlyProductSales);
  };

  // year
  const renderOptionsForYear = () => {
    return years.map((dt, i) => {
      return (
        <MenuItem value={Number(dt)} key={i} name={dt}>
          <div>{dt}</div>
        </MenuItem>
      );
    });
  };
  const onYearChange = (e) => {
    setSelectedYear(e.target.value);  
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

  const [data_, setData_] = useState([]);
  const [labels_, setLabels_] = useState([]);

  const getMonthlyProductSalesData = (monthlyProductSales) => {
    AdminService.getMonthlyProductSales(monthlyProductSales)
      .then((response) => {
        setLabels_(response.data.months);
        setData_(response.data.sales);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
  };

  const data = {
    labels: labels_,
    datasets: [
      {
        label: "Monthly Sales $",
        data: data_,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>[ Product Sales ]</h1>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            Year : &nbsp;&nbsp;
            <Select onChange={(e) => onYearChange(e)} value={selectedYear}>
              {renderOptionsForYear()}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            Product : &nbsp;&nbsp;
            <Select
              onChange={(e) => onProductChange(e)}
              value={selectedProduct}
            >
              {renderOptionsForProduct()}
            </Select>
          </Grid>

          {(selectedProduct && selectedProduct.id > 0) ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className={classes.root}>
                <Card>
                  <CardHeader
                    title={getTitle(image, title, price)}
                    subheader={getSubHeader(category)}
                  />
                  <div className={classes.chartSize}>
                    <CardContent>
                      <Bar options={options} data={data} />
                    </CardContent>
                  </div>
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
