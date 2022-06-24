import React from 'react';
import GroupItem from './GroupItem';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Typography, Grid, TextField, InputAdornment, Button, FormControlLabel, Checkbox, Dialog, DialogActions, Slide, DialogContent } from '@material-ui/core';
// import { my_groups as myGroups, other_groups } from "../data"
import { Heading } from '..';
import SendIcon from '@material-ui/icons/Send';
import { getGroups, joinGroup, saveRequest } from "../../services/GroupService"
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
    marginBottom: "0.5rem",
    background: "#ff3601",
    color: "#fffefe"
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
  const [state, setState] = React.useState({ code: "", message: "" });
  const [my_groups, setMyGroup] = React.useState([])
  const [other_groups, setOtherGroup] = React.useState([])
  const [all_groups, setAllGroup] = React.useState([])
  const [currentGroup, setCurrentGroup] = React.useState(null)
  const [searchText, setSearchText] = React.useState("")
  let userId = 3004//JSON.parse(localStorage.getItem("authState"))?.user?.id || 3004;  //get login userId when user is loggedin

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const findGroup = (e) => {
    if (my_groups !== undefined) {
      setSearchText(e.target.value)
      const results = all_groups.filter(group =>
        group.name.toLowerCase().includes(e.target.value.toLocaleLowerCase())
      )
      setMyGroup(results.filter(g => g.members.some(m => m.id === userId)))
      setOtherGroup(results.filter(g => !g.members.some(m => m.id === userId)))
    }
  }

  const sendRequest = async () => {
    if (state && state.code === "" && !showMsgArea) {
      alert("PLease Add Code.")
      return
    } else if (showMsgArea && state.message === '') {
      alert("PLease Enter Message.")
      return
    }
    else if (state && state.code !== "" && !showMsgArea) {
      if (state && currentGroup && state?.code === currentGroup?.code) {
        // check code and group code and add memeber in to members array
        joinGroup(userId, currentGroup)

      } else {
        alert("Code is incorrect")
      }
    } else if (state && state.message !== "" && showMsgArea) {
      saveRequest({ message: state.message, privateGroup: currentGroup, user: userId })
    }
    let groups = await getGroups()
    setMyGroup(groups.filter(g => g.members.some(m => m.id === userId)))
    setOtherGroup(groups.filter(g => !g.members.some(m => m.id === userId)))
    setAllGroup(groups)
    handleClose()
    setState({ code: "", messsage: "" })
  }


  React.useEffect(() => {
    async function fetchData() {
      let groups = await getGroups()
      setMyGroup(groups.filter(g => g.members.some(m => m.id === userId)))
      setOtherGroup(groups.filter(g => !g.members.some(m => m.id === userId)))
      setAllGroup(groups)
    }
    fetchData()
  }, [userId])
  const onChange = (event) => {
    let { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  }

  return (
    <div>
      {all_groups && all_groups.length > 2 ? <TextField
        variant="outlined"
        size="small"
        label="Filter"
        id="outlined-basic"
        value={searchText}
        className={classes.textField}
        onChange={e => findGroup(e)}
        InputProps={{
          startAdornment: <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        }}
      /> : null}
      <List className={classes.root} dense={true}>
        {my_groups.length > 0 && <Heading heading="My group" />}
        {my_groups.map((g, index) => <GroupItem groupItem={g} key={index} handleClickOpen={handleClickOpen} />)}
        {other_groups.length > 0 && <Heading heading="Other group" />}
        {other_groups.map((g, index) => <GroupItem groupItem={g} other={true} key={index} setCurrentGroup={setCurrentGroup} handleClickOpen={handleClickOpen} />)}

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
              <Avatar className={classes.large} src={currentGroup?.picture?.url}>
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h5" className={classes.modalHeading}>{currentGroup?.name}</Typography>
              <Typography variant="body2">Join {currentGroup?.name}</Typography>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1}>
            {/* <Grid item xs={12}><TextField className={classes.textField} id="name" size="small" label="Enter Name" variant="outlined" /></Grid>
            <Grid item xs={12}><TextField className={classes.textField} id="family-name" size="small" label="Enter Family Name" variant="outlined" /></Grid> */}
            <Grid item xs={12}><TextField className={classes.textField} onChange={onChange} name="code" id="code" size="small" label="Enter Verification Code" variant="outlined" /></Grid>

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
                  name='message'
                  onChange={onChange}
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
            onClick={sendRequest}
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