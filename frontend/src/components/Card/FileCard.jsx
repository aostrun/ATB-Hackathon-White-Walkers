import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.jsx";

import { cardTitle } from "assets/jss/material-kit-react.jsx";

const style = {
  ...imagesStyles,
  cardTitle,
};

class FileCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card style={{width: "20rem"}}>
        <img
          style={{height: "180px", width: "100%", display: "block"}}
          className={classes.imgCardTop}
          src={require("assets/img/profile-bg.jpg")}
          alt="Card-img-cap"
        />
        <CardBody>
          <h4 className={classes.cardTitle}>{this.props.title}</h4>
          <p>{this.props.description}</p>
          <Button color="primary">Download</Button>
        </CardBody>
      </Card>
    );
  }
}

export default withStyles(style)(FileCard);