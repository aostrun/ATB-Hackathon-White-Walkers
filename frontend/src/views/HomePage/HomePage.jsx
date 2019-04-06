import React from "react";
import { connect } from 'react-redux'
// nodejs library that concatenates classes
import classNames from "classnames";
import Web3 from 'web3';
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Slide from "@material-ui/core/Slide";

// @material-ui/icons
// core components
import homeStyle from "assets/jss/material-kit-react/views/home.jsx";
import SectionPills from "./Sections/SectionPills";
import styles from "./index.module.scss";
import SectionNewRequest from "./Sections/SectionNewRequest";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants/constants";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}


const dashboardRoutes = [];
var userWalletAddress = '';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      classicModal: false,
    }
  }

  handleOpenCreateRequestModal = () =>  {
      this.setState({classicModal: true})
  }

  handleCloseCreateRequestModal = () =>  {
    this.setState({classicModal: false})
  }

  componentDidMount() {
    
     this.loadWeb3();
    
  }

  async loadWeb3 () {
    // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            window.web3.eth.getAccounts((error, result) => { 
              console.log(result)
              userWalletAddress = result[0]
            }
            )

        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        // Acccounts always exposed
        //web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  callApproveContract(){
    var option={from: userWalletAddress};
        /*
    var myContract = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);

    myContract.methods.ApproveRequest('nest', 'nesto')
    .send(option,function(error,result){
        if (! error)
            console.log(result);
        else
            console.log(error);
    });
    */
  }
  

  

  render() {
    const { classes, ...rest } = this.props;
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

        <div className={classNames(classes.main, classes.mainRaised)}>
          <SectionPills />
          <div className={styles.bottomRightMenu}>
            <Tooltip
              title="Create new request"
              aria-label="Add"
              onClick={this.handleOpenCreateRequestModal}
            >
              <Fab color="secondary" size="large">
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        </div>

        <SectionNewRequest classicModal={this.state.classicModal} handleClose={this.handleCloseCreateRequestModal} handleCreateRequest={this.handleCreateRequest}/>
        
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(homeStyle)(HomePage));
