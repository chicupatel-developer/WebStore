import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 1100px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
  linkStyle: {
    margin: ".5rem",
    textDecoration: "none",
    color: "blue",
  },
  margin: {
    margin: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  searchText: {
    height: "35px",
    marginLeft: "5px",
    paddingLeft: "30px",
    border: "2px solid #00B200",
    borderRadius: "18px",
  },
  searchSymbol: {
    position: "absolute",
    paddingleft: "35px",
    marginLeft: "10px",
    marginTop: "22px",
    color: "green",
  },
  logoutSymbol: {
    position: "absolute",
    marginTop: "1px",
  },
  shopperSpan: {
    color: "white",
    backgroundColor: "black",
  },
  adminSpan: {
    color: "red",
    backgroundColor: "white",
  },
  shopperHeader: {
    backgroundColor: "brown",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 1100px)": {
      paddingLeft: 0,
    },
  },
  adminHeader: {
    backgroundColor: "lightgreen",
    color: 'black',
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 1100px)": {
      paddingLeft: 0,
    },
  },
  defaultHeader: {
    backgroundColor: "black",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 1100px)": {
      paddingLeft: 0,
    },
  },
}));
