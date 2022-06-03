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
import { Link, useParams } from "react-router-dom"
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import { createBrowserHistory } from 'history';
import { my_groups } from "../data"
import UnderGroupItem from './UnderGroupItem';
import { InputAdornment, List, TextField } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 1,  
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: theme.spacing(0.5),
    }, 
    small:{
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: theme.spacing(0.5),
    },
    title: {
        display: 'block'
    },
    menubar: {
        background: "#fff",
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

export default function UnderGroups() {
    const classes = useStyles();
    let { id } = useParams();
    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.menubar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        component={Link}
                        to="/group"
                        aria-label="open drawer"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    {my_groups.find(s => s.id == id)?.image !== "" ?
                        <Avatar src={my_groups.find(s => s.id == id)?.image} className={classes.small}>
                            <ImageIcon />
                        </Avatar>
                        :
                        <Avatar className={classes.small}>
                            <ImageIcon />
                        </Avatar>
                    }
                    <Typography className={classes.title} variant="h6" noWrap>
                        {my_groups.find(s => s.id == id)?.title}
                    </Typography>

                    <div className={classes.grow} />

                    <Avatar alt="img" src={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                        className={classes.large} />

                </Toolbar>
            </AppBar>
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
                {my_groups.find(s => s.id == id)?.sports.map((s, i) => {
                    return <UnderGroupItem sportItem={{...s,...{group:id}}} key={i} />
                })}
            </List>

        </div>
    );
}
