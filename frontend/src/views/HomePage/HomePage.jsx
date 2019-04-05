import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

// @material-ui/icons
// core components
import homeStyle from "assets/jss/material-kit-react/views/home.jsx";
import SectionPills from "./Sections/SectionPills";

const dashboardRoutes = [];

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      mainAnimation: "mainHidden"
    };
  }

  componentDidMount = () => {
    setTimeout(
      function() {
        this.setState({ mainAnimation: "" });
      }.bind(this),
      700
    );
  }
  
  
  render() {
    const { classes, ...rest } = this.props;
    console.log(classes);
    return (
      <div>
        <Header
          color="dark"
          routes={dashboardRoutes}
          brand="Loopback-react template"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />

        <div className={classNames(classes.main, classes.mainRaised, classes[this.state.mainAnimation])}>
          <SectionPills />
        </div>
        
      </div>
    );
  }
}

export default withStyles(homeStyle)(HomePage);
