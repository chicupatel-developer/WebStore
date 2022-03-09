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
  controlInvalid: {
    color: "red",
  },
  discountedPrice: {
    color: "green",
    fontSize: "x-large",
  },
  apiError: {
    color: "red",
  },
  apiSuccess: {
    color: "green",
  },
}));
