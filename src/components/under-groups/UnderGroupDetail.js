import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link, useParams } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import { Box, Button, Grid, Slide, TextField } from '@material-ui/core';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ApartmentOutlinedIcon from '@material-ui/icons/ApartmentOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SessionItem from '../sessions/SessionItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddCircle from '@material-ui/icons/AddCircle';
import { addSession, getSessionsByUnderGroupId } from '../../services/GroupService';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 1,
        margin: "-8px",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: theme.spacing(0.5),
    },
    iconList: {
        marginTop: theme.spacing(5),
    },
    addBtn: {
        marginBottom: "0.5rem",
        background: "#ff3601",
        color: "#fffefe"
    },
    avatarIcon: {
        backgroundColor: "#fff",
        border: `1px solid #5f5f5f`,
        color: "#5f5f5f",
        padding: theme.spacing(0.7)
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: theme.spacing(0.5),
    },
    title: {
        display: 'block'
    },
    button: {
        marginBottom: "0.5rem",
        background: "#ff3601",
        color: "#fffefe",
        position: "absolute",
        bottom: "-25px",
        right: "15px"
    },
    menubar: {
        background: "#d9d9d9",
        color: "#000",
        border: "none",
        boxShadow: "0 2px 0px 0 rgb(0 0 0 / 12%)"
    },
    modalHeading: {
        fontWeight: 600,
        fontSize: "22px",
        textTransform: "uppercase"
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
    dateSubtitle: {
        fontSize: "11px",
        textAlign: "center",
        fontWeight: "700",
        paddingLeft: "10px"

    },
    subtitle: {
        // fontSize: "0.8rem",
        textAlign: "center",
        margin: "4px -4px",
        fontWeight: "600",
        width: "55px",
        padding: "5px",
        fontSize: "9px",
        borderRadius: "10px",
        lineHeight: "1"
    },
    green: {
        background: "#73d131"
    },
    blue: {
        background: "#b4dceb"
    },
    purple: {
        background: "#d9d9d9"
    },
    orange: {
        background: "#ffbd59",
    },
    red: {
        background: "#ff5757"
    },
    headingSubtitle: {
        width: "90px",
        padding: "2px",
        fontSize: "11px",
        textAlign: "center",
        fontWeight: "500",
        borderRadius: "10px"
    }
}));

export default function UnderGroupDetail() {
    const classes = useStyles();
    let { id } = useParams();
    const [open, setOpen] = useState(false);
    const [group, setGroup] = useState(null);
    const [state, setState] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const onChange = (event) => {
        let { name, value } = event.target;
        if(name ==='datetime'){
            value = new Date(value).toISOString()
        }
        setState({
          ...state,
          [name]: value
        });
      }

    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        async function fetchData() {
            let sportGroups = await getSessionsByUnderGroupId(id)
            setGroup(sportGroups)
        }
        fetchData()
    }, [id])

    const createSession = async() => { 
        let res = await addSession({...state,...{creator:"3018", group:group?.private_group?.id, sport_group:group?.id, private:true}})
        let groups = group;
        groups.sessions.push(res);
        setGroup(groups)
        setState(null)
        handleClose()
    }
    return (
        <>
            <div className={classes.grow}>
                <AppBar position="static" className={classes.menubar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            component={Link}
                            to={`/group/${group?.private_group?.id}`}
                            aria-label="open drawer"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        {group?.private_group?.picture ?
                            <Avatar src={group?.private_group?.picture?.url} className={classes.small}>
                                <ImageIcon />
                            </Avatar>
                            :
                            <Avatar className={classes.small}>
                                <ImageIcon />
                            </Avatar>
                        }
                        <Typography className={classes.title} variant="h6" noWrap>
                            {group?.private_group?.name}
                        </Typography>

                        <div className={classes.grow} />

                        <Avatar alt="img" src={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                            className={classes.large} />

                    </Toolbar>
                    <Toolbar>

                        {group?.sport?.icon ?
                            <Avatar src={group?.sport?.icon?.url} className={classes.large}>
                                <ImageIcon />
                            </Avatar>
                            :
                            <Avatar className={classes.large}>
                                <ImageIcon />
                            </Avatar>
                        }
                        <Typography variant="h6" noWrap>
                            {group?.sport?.name}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClickOpen}
                            className={classes.button}
                        >
                            Create a Session
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>

            <Grid container display="flex" justifyContent="center" alignItems="center" className={classes.iconList}>
                <Grid item xs>
                    <Avatar className={classes.avatarIcon}>
                        <CalendarTodayOutlinedIcon fontSize='medium' />
                    </Avatar>
                    <Typography variant="caption" component={"div"} className={`${classes.subtitle} ${classes.green}`}>Free Sessions</Typography>
                </Grid>
                <Grid item xs>
                    <Avatar className={classes.avatarIcon}>
                        <EventOutlinedIcon fontSize='medium' />
                    </Avatar>
                    <Typography variant="caption" component={"div"} className={`${classes.subtitle} ${classes.blue}`}>Paid Sessions</Typography>
                </Grid>
                <Grid item xs>
                    <Avatar className={classes.avatarIcon}>
                        <FlashOnIcon fontSize='medium' />
                    </Avatar>
                    <Typography variant="caption" component={"div"} className={`${classes.subtitle} ${classes.purple}`}>Events Tournaments</Typography>
                </Grid>
                <Grid item xs>
                    <Avatar className={classes.avatarIcon}>
                        <ApartmentOutlinedIcon fontSize='medium' />
                    </Avatar>
                    <Typography variant="caption" component={"div"} className={`${classes.subtitle} ${classes.orange}`}>Hall Rental</Typography>
                </Grid>
                <Grid item xs>
                    <Avatar className={classes.avatarIcon}>
                        <ConfirmationNumberOutlinedIcon fontSize='medium' />
                    </Avatar>
                    <Typography variant="caption" component={"div"} className={`${classes.subtitle} ${classes.red}`}>Coupons Vouchers</Typography>
                </Grid>
            </Grid>
            <Box display="flex" spacing={1} alignItems="center">
                <FiberManualRecordIcon style={{ color: "#ff3601" }} />
                <Typography variant="caption" component={"div"} className={`${classes.dateSubtitle}`}>{new Date().toDateString()}</Typography>
            </Box>
            <div className={classes.flexGrow}></div>
            <Typography variant="caption" component={"div"} className={`${classes.headingSubtitle} ${classes.green}`}>Free Sessions</Typography>

            {group?.sessions.length > 0 && group?.sessions.map((s, i) => {
                return <SessionItem session={{ ...s, ...{ group: group } }} key={i} />
            })}

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
                            <Avatar className={classes.large} src={group?.private_group?.picture?.url}>
                                <ImageIcon />
                            </Avatar>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h5" className={classes.modalHeading}>{group?.private_group?.name}</Typography>
                            <Typography variant="body2">{group?.sport?.name}</Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={1}>
                        <Grid item xs={12}><TextField className={classes.textField} onChange={onChange} id="name" size="small" name="name" label="Enter Name" variant="outlined" /></Grid>
                        <Grid item xs={12}><TextField
                            id="datetime-local"
                            label="Date"
                            type="datetime-local"
                            onChange={onChange}
                            defaultValue={new Date()}
                            className={classes.textField}
                            name="datetime"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /></Grid>
                        <Grid item xs={12}><TextField className={classes.textField} name='address' onChange={onChange} id="address" size="small" label="Enter Address" variant="outlined" /></Grid>
                        <Grid item xs={12}><TextField className={classes.textField} name='duration' onChange={onChange} type="number" inputProps={{ min: 1 }} id="duration" size="small" label="duration" variant="outlined" /></Grid>
                        <Grid item xs={12}><TextField className={classes.textField} name='personCount' onChange={onChange} type="number" inputProps={{ min: 1 }} id="max_limit" size="small" label="Max. People Allowed" variant="outlined" /></Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="info"
                                label="Sport Info"
                                multiline
                                name="spotInformation"
                                onChange={onChange}
                                className={classes.textField}
                                rows={4}
                                placeholder="Write Information about session"
                                variant="outlined"
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={createSession}
                        className={classes.addBtn}
                        startIcon={<AddCircle />}
                    >
                        Create Session
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
