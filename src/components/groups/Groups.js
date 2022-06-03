import React from 'react';
import GroupItem from './GroupItem';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import Box from '@material-ui/core/Box';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Divider, Typography, Grid, TextField, InputAdornment, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { my_groups, other_groups } from "../data"
import { Heading } from '..';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SendIcon from '@material-ui/icons/Send';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    display: 'flex'
  },
  button: {
    // fontSize: "0.8rem",
    // fontWeight: 700,
    // color: "#484848",
    // padding: theme.spacing(1.2)
    marginBottom:"0.5rem",
    background:"#ff3601",
    color:"#fffefe"
},
  modalHeading: {
    fontWeight: 600,
    fontSize: "22px",
    textTransform: "uppercase"
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },

  textField: {
    width: "100%",
    // input label when focused
    "& label.Mui-focused": {
      color: "#ff2e00"
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ff2e00"
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#ff2e00"
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#ff2e00"
      }
    }
  },
 
  
}));

export default function Groups() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showMsgArea, setShowMsgArea] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        label="Filter"
        id="outlined-basic"
        className={classes.textField}
        InputProps={{
          startAdornment: <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        }}
      />
      <List className={classes.root} dense={true}>
        <Heading heading="My group" />
        {my_groups.map((g, index) => <GroupItem groupItem={g} key={index} handleClickOpen={handleClickOpen} />)}
        <Heading heading="Other group" />
        {other_groups.map((g, index) => <GroupItem groupItem={g} other={true} key={index} handleClickOpen={handleClickOpen} />)}

      </List>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={'xs'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>

          <Grid container>
            <Grid item xs={3}>
              <Avatar className={classes.large} >
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h5" className={classes.modalHeading}>unicef sports</Typography>
              <Typography variant="body2">Join unicef sports</Typography>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1}>
            <Grid item xs={12}><TextField className={classes.textField} id="name" size="small" label="Enter Name" variant="outlined" /></Grid>
            <Grid item xs={12}><TextField className={classes.textField} id="family-name" size="small" label="Enter Family Name" variant="outlined" /></Grid>
            <Grid item xs={12}><TextField className={classes.textField} id="code" size="small" label="Enter Verification Code" variant="outlined" /></Grid>

            <Grid container item xs={12}>
              <FormControlLabel
                control={<Checkbox color="default" checked={showMsgArea} onChange={(event) => setShowMsgArea(event.target.checked)} name="joined" />}
                label={<Typography variant='body2'>I don't have a code but would like to join</Typography>}
              />
            </Grid>
            <Grid item xs={12}>
              {showMsgArea ?
                <TextField
                  id="Message"
                  label="Message"
                  multiline
                  className={classes.textField}
                  rows={4}
                  placeholder="Explain your request motivations"
                  variant="outlined"
                /> : null

              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            className={classes.button}
            startIcon={<SendIcon />}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )

}