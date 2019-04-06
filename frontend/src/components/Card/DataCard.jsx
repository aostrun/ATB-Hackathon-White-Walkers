import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import { cardTitle } from "assets/jss/material-kit-react.jsx";

const style = {
  cardTitle,
};

class DataCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        <GridContainer >
            {this.props.data.map((data, index) => {
                return(
                    <GridItem xs={12} sm={6} md={6} lg={4} key={index}>
                    <Card style={{width: "20rem"}}>
                        <CardHeader color="warning">{data.title}</CardHeader>
                        <CardBody>
                        <h4 className={classes.cardTitle}>Id: {data.id}</h4>
                        <p>
                           {data.content}
                        </p>
                        </CardBody>
                    </Card>
                </GridItem>
                )
               
            })
        }
        </GridContainer>
    );
  }
}

export default withStyles(style)(DataCard);