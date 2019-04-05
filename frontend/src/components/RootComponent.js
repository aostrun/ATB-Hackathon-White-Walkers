import React from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Particles from 'react-particles-js'
import particles_config from './particles-config'
import ReduxToastr from 'react-redux-toastr'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCog, 
} from '@fortawesome/free-solid-svg-icons'
import store from '../store';
import LoginPage from "views/LoginPage/LoginPage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import HomePage from "views/HomePage/HomePage.jsx";

import styles from './index.module.scss'
import Toolbar from './Toolbar';

library.add([
  faCog,
])

class RootComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
            <Switch>
               <Route exact path='/login-page' component={LoginPage} /> 
               <Route exact path='/profile-page' component={ProfilePage} /> 
               <Route exact path='/home-page' component={HomePage} /> 
               <Route exact path='/' component={LandingPage} /> 
            </Switch>
        </BrowserRouter>

        <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick/>
      </React.Fragment>
    )
  }
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().user.isLoginSuccess === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

const mapStateToProps = (state) => {
  return {
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);

