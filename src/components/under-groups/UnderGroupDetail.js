import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, useLocation, useParams } from "react-router-dom"
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import { createBrowserHistory } from 'history';
import { my_groups } from "../data"
import UnderGroupItem from './UnderGroupItem';
import { Button, InputAdornment, List, TextField } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


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
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: theme.spacing(0.5),
    },
    title: {
        display: 'block'
    },
    button: {
        marginBottom:"0.5rem",
        background:"#ff3601",
        color:"#fffefe",
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

export default function UnderGroupDetail() {
    const classes = useStyles();
    let { id } = useParams();
    const location = useLocation()
    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.menubar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        component={Link}
                        to={`/group/${location?.state?.group}`}
                        aria-label="open drawer"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    {my_groups.find(s => s.id == id)?.image !== "" ?
                        <Avatar src={my_groups.find(s => s.id == location?.state?.group)?.image} className={classes.small}>
                            <ImageIcon />
                        </Avatar>
                        :
                        <Avatar className={classes.small}>
                            <ImageIcon />
                        </Avatar>
                    }
                    <Typography className={classes.title} variant="h6" noWrap>
                        {my_groups.find(s => s.id == location?.state?.group)?.title}
                    </Typography>

                    <div className={classes.grow} />

                    <Avatar alt="img" src={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                        className={classes.large} />

                </Toolbar>
                <Toolbar>

                    {location?.state?.image !== "" ?
                        <Avatar src={location?.state?.image} className={classes.large}>
                            <ImageIcon />
                        </Avatar>
                        :
                        <Avatar className={classes.large}>
                            <ImageIcon />
                        </Avatar>
                    }
                    <Typography variant="h5" noWrap>
                        {location?.state?.name}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary" 
                        className={classes.button} 
                    >
                        Create a Session
                    </Button>
                </Toolbar>
            </AppBar>

        </div>
    );
}
