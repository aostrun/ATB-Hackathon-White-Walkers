/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { logout } from '../../actions/login_actions'
import PropTypes from 'prop-types'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

class HeaderLinks extends React.Component {

  constructor(props) {
    super(props)
  
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  signOut = () => {
    this.props.logout(this.props.token);
    this.context.router.history.push('/login-page')
  }
  render() {
    const { classes } = this.props;
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
         {!this.props.isLoginSuccess ?
          <Button
            component={ Link } to="/login-page"
            color="transparent"
            className={classes.navLink}
          >
           Login
          </Button>
          :
          <Button
          onClick={this.signOut}
          color="transparent"
          className={classes.navLink}
        >
         Logout
        </Button>
        
        }
        </ListItem>
        {this.props.isLoginSuccess &&
        <ListItem className={classes.listItem}>
          <Tooltip
            title="Profile"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
          
            <Button
              component={ Link } to="/profile-page"
              color="transparent"
              className={classes.navLink}
            >
              <i className={classes.socialIcons + " fas fa-user"} />
            </Button>
          
          </Tooltip>
        </ListItem>
        }
      </List>
    );
  }
  
}

const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.user.isLoginSuccess,
    token: state.user.token
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token) => dispatch(logout(token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(HeaderLinks));
