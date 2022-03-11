import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    marginTop: "100px",
  },
  img: {
    height: 550,
    width: "100%",
  },
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(3),
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
  price: {
    textAlign: "left",
    color: "blue",
    fontSize: "large",
    marginTop: "10px",
  },
  erasePrice: {
    textAlign: "left",
    color: "blue",
    fontSize: "large",
    marginTop: "10px",
    textDecoration: "line-through",
  },
  discountedPrice: {
    textAlign: "left",
    color: "red",
    fontSize: "large",
    marginTop: "10px",
  },
  was: {
    fontSize: "small",
    marginTop: "15px",
  },
  now: { fontSize: "small", marginTop: "15px" },
  discounterPriceDiv: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  priceDiv: {
    display: "flex",
    justifyContent: "left",
    marginBottom: "20px",
  },
}));
