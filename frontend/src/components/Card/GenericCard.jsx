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

class GenericCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        this.props.data.map((data,index) => {
          var color = !data.issueTx  ? 'danger' : 'success'
          return(
              <Card className={classes.textCenter} key={index}> 
                <CardHeader color={color}>IssuerId: {data.issuerId} </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>AllowedId: {data.allowedId}</h4>
                    <p >Contract text: {data.contract}</p>
                    {!data.issueTx &&
                    <Button color="primary" onClick={this.props.callApproveContract(data)}>Approve</Button>
                    }
                  </CardBody>
                  <CardFooter className={classes.textMuted}>
                  2 days ago
                  </CardFooter>
              </Card>
          )
        })
       
     
    );
  }
}

export default withStyles(style)(GenericCard);