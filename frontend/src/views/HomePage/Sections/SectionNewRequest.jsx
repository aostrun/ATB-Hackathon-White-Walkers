import React from "react";
import ReactDOM from "react-dom";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import Axios from 'axios'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import People from "@material-ui/icons/People";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// @material-ui/icons

import Close from "@material-ui/icons/Close";
// core components

import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import { GET_ALL_USERS_URL } from "../../../constants/constants";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class SectionNewRequest extends React.Component {
  anchorElLeft = null;
  anchorElTop = null;
  anchorElBottom = null;
  anchorElRight = null;
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      contract: '',
      labelWidth:0,
      users: []
    }
  }

  componentDidMount() {
    this.loadUsers();
    this.setState({
      labelWidth: 20
    });
  }

  loadUsers = () => {
    Axios.get(GET_ALL_USERS_URL).then(response => {
      console.log("Users");
      console.log(response.data);
      const result = response.data.filter(user => user.WalletAddress !== this.props.userWalletAddress)
      this.setState({users: result})
      // ! provide this data to DataCard
    });
  }
  

  handleCreateRequest = () => {
    console.log("creating request... " +  this.state.contract+" "+this.state.user)
  }

  handleChange = event => {
    this.setState({ user: event.target.value });
    console.log("current value", event.target.value )
  };

  render() {
    const { classes } = this.props;
    return (
      
          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal
            }}
            open={this.props.classicModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.props.handleClose}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
            
          >
            <DialogTitle
              id="classic-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <IconButton
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.props.handleClose}
              >
                <Close className={classes.modalClose} />
              </IconButton>
              <h4 className={classes.modalTitle}>Create new request</h4>
            </DialogTitle>
            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
                 <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                  >
                    User
                  </InputLabel>
                  <Select
                    value={this.state.user}
                    onChange={this.handleChange}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="user"
                        id="outlined-age-simple"
                      />
                    }
                  >
                  {this.state.users.map((user,index) => {
                      return (
                        <MenuItem key={index} value={user.id}>{user.username}, wallet address: {user.WalletAddress}</MenuItem>
                      )
                  })}
                  </Select>
                </FormControl>
              <CustomInput
                labelText="Contract string"
                id="contract"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={e => this.setState({ contract: e.target.value })}
                inputProps={{
                  type: "contract",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className={classes.inputIconsColor}>
                        lock_outline
                      </Icon>
                    </InputAdornment>
                  )
                }}
              />

            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button
                onClick={this.handleCreateRequest}
                color="danger"
                simple
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
               
    );
  }
}

export default withStyles(javascriptStyles)(SectionNewRequest);
