import React from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
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

// @material-ui/icons

import Close from "@material-ui/icons/Close";
// core components

import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";

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
  }

  handleCreateRequest = () => {
    console.log("creating request..." + this.state.username + " " +  this.state.contract)
  }

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
              <CustomInput
                labelText="User..."
                id="username"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={e => this.setState({ username: e.target.value })}
                inputProps={{
                  type: "username",
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  )
                }}
              />
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
