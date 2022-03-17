import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    marginTop: "100px",
  },
  img: {
    height: 120,
    width: "100%",
  },
  root: {
    paddingLeft : '50px',
    height: "100%",
    width: "100%",
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
  runningDiscount: {
    color: "green",
  },
  expiredDiscount: {
    color: "red",
  },
  comingSoonDiscount: {
    color: "blue",
  },
  noDiscountData: {
    color: "red",
    fontSize: "x-large",
    padding: "100px",
  },
}));
