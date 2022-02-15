import React from 'react'
import useStyles from "./styles";
import Container from "@material-ui/core/Container";

const NotFound = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.main}>
      <Container maxWidth="md">
        <div className={classes.notFoundDiv}>
          <h1>Page Not Found!</h1>
        </div>
      </Container>
    </div>
  );
}

export default NotFound
