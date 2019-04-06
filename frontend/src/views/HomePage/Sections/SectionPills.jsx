import React from "react";
import Axios from "axios";

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
import GenericCard from 'components/Card/GenericCard.jsx'
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { GET_ALL_REQUESTS_URL } from "../../../constants/constants";

class SectionPills extends React.Component {


  componentDidMount() {
    this.loadRequests();
  }

  loadRequests = () => {
    Axios.get(GET_ALL_REQUESTS_URL).then(response => {
      console.log(response.data);
      // ! provide this data to GenericCard
    });
  }
  


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
                      tabButton: "Received requests",
                      tabIcon: Dashboard,
                      tabContent: (
                        <GenericCard data={
                        [
                          {
                            header: "Contract No.1",
                            title: "Title 1",
                            contract: "I let you using my facebook data",
                            status: "pending"
                          },
                          {
                            header: "Contract No.2",
                            title: "Title 2",
                            contract: "I let you using my twitter data",
                            status: "pending"
                          },
                          { 
                            header: "Contract No.3",
                            title: "Title 3",
                            contract: "I let you using my instagram data",
                            status: "approved"
                          }

                        ]
                        }/>
                      )
                    },
                    {
                      tabButton: "Sent requests",
                      tabIcon: Schedule,

                      tabContent: (
                        <GenericCard data={
                          [
                            { 
                              header: "Contract No.2",
                              title: "Title 2",
                              contract: "I let you using my twitter data",
                              status: "approved"
                            }
                          ]
                          }/>
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
