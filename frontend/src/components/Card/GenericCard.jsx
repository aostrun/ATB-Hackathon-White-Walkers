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
          var color = data.status === 'pending' ? 'danger' : 'success'
          return(
              <Card className={classes.textCenter} key={index}> 
                <CardHeader color={color}>{data.header}</CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>{data.title}</h4>
                    <p>
                        {data.contract}
                    </p>
                    <h1>Status: {data.status}</h1>
                    {data.status === 'pending' &&
                    <Button color="primary">Approve</Button>
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