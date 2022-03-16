import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    marginTop: "20px",
  },

  img: {
    height: "40px",
    width: "30px",
    verticalAlign: "middle",
  },
  imgDisplay: {
    height: "100px",
    width: "80px",
    verticalAlign: "middle",
  },
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  subHeader: {
    margin: "10px",
    backgroundColor: "lightgrey",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
    color: "brown",
  },
  title: {
    margin: "10px",
  },
  price: {
    color: "skyblue",
    marginBottom: "10px",
  },

  noDiscountData: {
    color: "red",
    fontSize: "x-large",
    padding: "100px",
  },
  chartSize: {
    position: "relative",
    // height: "130vh",
    // width: "170vh",
  },
  totalYearSales: {
    color: "blue",
    fontSize: "x-large",
  },
}));
