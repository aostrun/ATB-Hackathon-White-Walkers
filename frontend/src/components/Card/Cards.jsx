import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

import { cardTitle } from "assets/jss/material-kit-react.jsx";

const style = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textMuted: {
    color: "#6c757d"
  },
};

class Cards extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        <Card className={classes.textCenter}>
            <CardHeader color="danger">Featured</CardHeader>
            <CardBody>
            <h4 className={classes.cardTitle}>Special title treatment</h4>
            <p>
                With supporting text below as a
                natural lead-in to additional content.
            </p>
            <Button color="primary">Do something</Button>
            </CardBody>
            <CardFooter className={classes.textMuted}>
            2 days ago
            </CardFooter>
      </Card>
     
    );
  }
}

export default withStyles(style)(Cards);