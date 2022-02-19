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
  category: {
    textAlign: "left",
    marginTop: "5px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  noProduct: {
    color: 'red',
  },
}));

