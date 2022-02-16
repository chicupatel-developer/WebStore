import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    marginTop: "100px",
  },
  img: {
    height: "50px",
    width: "50px",
  },
  minusBtn: {
    color: "red",
  },
  plusBtn: {
    color: "green",
  },
  actionDiv: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  cartItemsDiv: {
    marginLeft: "100px",
    marginRight: "100px",
    marginTop: "25px",
    marginBottom: "25px",
  },
  itemTotal: {
    backgroundColor: "lightblue",
  },
  cartTotal: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    },
    cartTotalAmount: {
        color: 'blue',
        fontSize: 'large'
  },
}));
