import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './index.module.scss'
import { logout } from '../../actions/login_actions';



class Toolbar extends Component {

  constructor(props) {
    super(props)

    this.redirectToHome = this.redirectToHome.bind(this)
    this.redirectToProfile = this.redirectToProfile.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  redirectToProfile = () => {
    this.context.router.history.push('/profile')
  }

  redirectToHome = () => {
    this.context.router.history.push('/main')
  }

  signOut = () => {
    this.props.logout(this.props.token);
    this.context.router.history.push('/login')
  }

  openAdminPage = () =>{
    this.context.router.history.push('/admin')
  }

  render() {

    let signOut = (
      <div className={styles.menuItem} onClick={this.signOut} title='Logout'>
        <FontAwesomeIcon icon='sign-out-alt' className={styles.menuIcon} />
      </div>
    )

    let adminPage = (
      <div className={styles.menuItem} onClick={this.openAdminPage} title='Admin'>
        <FontAwesomeIcon icon='tools' className={styles.menuIcon} />
      </div>
    )

    let profilePage = (
      <div className={styles.menuItem} onClick={this.redirectToProfile} title='Profile'>
        <FontAwesomeIcon icon='user' className={styles.menuIcon} />
      </div>
    )

    let notifications = (
      <div className={styles.menuItem} title='Notifications'>
        <FontAwesomeIcon icon='bell' className={styles.menuIcon} />
      </div>
    )

    return (
      <div>

        <AppBar position='relative' className={styles.toolbarContainer}>
          <div className={styles.titleContainer}>
          <img className={styles.titleLogo} src='/img/logo.png'  alt='Quiz app' onClick={this.redirectToHome} />
            {/*<img className={styles.titleLogo} src='./images/sideview_logo.png' alt='Sideview Logo' onClick={this.redirectToHome} />*/}

            <div className={styles.toolbarMenu}>
              

              

              {/* actually this.props.isAdmin */}
              {this.props.isLoginSuccess ? adminPage : null}

              {this.props.isLoginSuccess ? notifications : null}
              {this.props.isLoginSuccess ? profilePage : null}
              {this.props.isLoginSuccess ? signOut : null}

            </div>

          </div>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.user.isLoginPending,
    isLoginSuccess: state.user.isLoginSuccess,
    loginError: state.user.loginError,
    token: state.user.token
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token) => dispatch(logout(token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);