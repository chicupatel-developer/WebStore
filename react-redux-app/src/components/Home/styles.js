import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  main: {
    marginTop: "100px",
  },
  homePageHeader: {
    textAlign: "center",
    verticalAlign: "middle",
    color: "blue",
    backgroundColor: "lightyellow",
    paddingBottom: "10px",
    paddingTop: "10px",
    border: "2px solid red",
    borderRadius: "20px",
  },
  leftColumn: {
    padding: "20px",
    margin: "5",
  },
  rightColumn: {
    padding: "20px",
    margin: "5",
  },
  cardContent: {
    marginLeft: "20px",
    marginTop: "-20px",
  },
  indent1: {
    marginLeft: "20px",
    fontSize: "medium",
  },
  indent2: {
    marginLeft: "40px",
  },
  indent3: {
    marginLeft: "60px",
  },
  titleSpan: {
    fontSize: "large",
    margin: "10px",
  },
}));
