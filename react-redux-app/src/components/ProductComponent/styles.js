import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    textAlign: "left",
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
    textDecoration: 'line-through',
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
    marginTop: "10px",
  },
  priceDiv: {
    display: "flex",
    justifyContent: "left",
  },
  category: {
    textAlign: "left",
    marginTop: "5px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  noProduct: {
    color: "red",
  },
}));

