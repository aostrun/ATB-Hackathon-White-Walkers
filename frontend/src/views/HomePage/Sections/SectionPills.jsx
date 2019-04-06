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
import DataCard from 'components/Card/DataCard.jsx'
import pillsStyle from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.jsx";
import { GET_ALL_REQUESTS_URL, GET_ALL_DATA_URL } from "../../../constants/constants";

class SectionPills extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       blogPosts: [],
       accessRequests: []
    }
  }
  

  componentDidMount() {
    this.loadRequests();
    this.loadData();
  }

  loadRequests = () => {
    Axios.get(GET_ALL_REQUESTS_URL).then(response => {
      console.log(response.data);
      this.setState({
        accessRequests: response.data
      })
      // ! provide this data to GenericCard
    });
  }

  loadData = () => {
    Axios.get(GET_ALL_DATA_URL).then(response => {
      //console.log(response.data);
      this.setState({
        blogPosts: response.data
      })
      console.log(this.state.blogPosts);
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
                        <GenericCard data={this.state.accessRequests} callApproveContract={this.props.callApproveContract}/>
                      )
                    },
                    {
                      tabButton: "Sent requests",
                      tabIcon: Schedule,

                      tabContent: (
                        <p>nešto</p>
                      )
                    },
                    {
                      tabButton: "Your data",
                      tabIcon: List,

                      tabContent: (
                        <DataCard data ={this.state.blogPosts}/>
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
