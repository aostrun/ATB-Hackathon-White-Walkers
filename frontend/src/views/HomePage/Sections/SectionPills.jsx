import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Cards from 'components/Card/Cards.jsx'
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";

class SectionPills extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
              <h3>Navigation Pills</h3>
            </div>
            <div className={classes.title}>
              <h3>
                <small>Welcome, </small>
              </h3>
            </div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <NavPills
                  color="primary"
                  alignCenter
                  tabs={[
                    {
                      tabButton: "Requests",
                      tabIcon: Dashboard,
                      tabContent: (
                        <Cards />
                      )
                    },
                    {
                      tabButton: "Approved",
                      tabIcon: Schedule,

                      tabContent: (
                        <Cards />
                      )
                    }
                
                  ]}
                />
              </GridItem>
              
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(pillsStyle)(SectionPills);
