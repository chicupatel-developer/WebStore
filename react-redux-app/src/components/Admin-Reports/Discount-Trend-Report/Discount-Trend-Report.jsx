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

import AdminService from "../../../services/product-admin.service";

import Moment from "moment";

// google chart api
import Chart from "react-google-charts";

// chart.js, react-chartjs-2
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

const DiscountTrendReport = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const products = useSelector((state) => state.allProducts.products);

  const [selectedProduct, setSelectedProduct] = useState({});

  const [showChart, setShowChart] = useState(false);

  // google chart api
  // line chart
  const [lineData, setLineData] = useState([]);

  const { id, title, category, price, image } = selectedProduct;

  const [data_, setData_] = useState([]);
  const [labels_, setLabels_] = useState([]);

  // check if api response has data length > 0 or not
  const [emptyApiResponse, setEmptyApiResponse] = useState(true);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  useEffect(() => {}, []);

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

    let discountTrendData = {
      productId: selectedProduct_.id,
    };

    console.log(selectedProduct_);

    getLast5DiscountZoneProductSales(discountTrendData);
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

  const getLast5DiscountZoneProductSales = (discountTrendData) => {
    AdminService.getLast5DiscountZoneProductSales(discountTrendData)
      .then((response) => {
        console.log(response.data);

        if (response.data.length > 0)
          setEmptyApiResponse(false);
        else
          setEmptyApiResponse(true);
        

        var labels = [];
        var discounts = [];
          var data = [];
          var disStartDates = [];
        response.data.forEach(function (salesData) {
          discounts.push(salesData.discountPercentage);
          disStartDates.push(salesData.discountStartDate);
          labels.push(
            salesData.discountPercentage +
              "% [" +
              Moment(salesData.discountStartDate).format("DD MMM") +
              "]"
          );
          data.push(salesData.sales);
        });
        setLabels_(labels);
        setData_(data);

        // google chart api
        // set data for line chart
        converDataToLineData(discounts, data, disStartDates);

        setShowChart(true);
      })
      .catch((error) => {
        console.log(error);
        setEmptyApiResponse(true);
      });
  };

  // google chart api
  // line chart
  const converDataToLineData = (discounts, sales, disStartDates) => {
    let arrDatas = [];
    var arrData = [];
    arrData.push("x");
    arrData.push("Sales");
    arrDatas.push(arrData);

    for (let step = 0; step < discounts.length; step++) {
      var arr = [
        Number(discounts[step]) +
          "% [" +
          Moment(disStartDates[step]).format("DD MMM") +
          "]",
        Number(sales[step]),
      ];
      arrDatas.push(arr);
    }
    setLineData(arrDatas);
  };
  const LineChartOptions = {
    hAxis: {
      title: "Discounts %",
    },
    vAxis: {
      title: "Sales $",
    },
    series: {
      1: { curveType: "function" },
    },
  };

  // chart.js, react-chartjs-2
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
        text: "Discount Trend Data",
      },
    },
  };
  const data = {
    labels: labels_,
    datasets: [
      {
        label: "$ Sales By Discount %",
        data: data_,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 3,
        fill: false,
        borderColor: "green",
      },
    ],
  };

  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <h1>[ Discount - Trend - Report ]</h1>
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

          {showChart && selectedProduct && selectedProduct.id > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className={classes.root}>
                <Card>
                  <CardHeader
                    title={getTitle(image, title, price)}
                    subheader={getSubHeader(category)}
                  />



                  {!emptyApiResponse ? (
                    <div className={classes.chartSize}>
                      <CardContent>
                        <p></p>
                        <div>
                          <Chart
                            // width={"700px"}
                            // height={"410px"}
                            chartType="LineChart"
                            loader={<div>Loading Chart</div>}
                            data={lineData}
                            options={LineChartOptions}
                            rootProps={{ "data-testid": "2" }}
                          />
                        </div>

                        <p></p>
                        <Bar options={options} data={data} />
                      </CardContent>
                  </div>
                  ): (
                      <div className={classes.emptyApiResponse}>
                        <CardContent>
                          <div>
                            Data Not Available !
                          </div>
                        </CardContent>                        
                    </div>
                  )}
                
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

export default DiscountTrendReport;
