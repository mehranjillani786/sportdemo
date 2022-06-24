import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link, useLocation } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import SessionItem from "./SessionItem"
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import { Alert } from '@material-ui/lab'; 

const useStyles = makeStyles((theme) => ({

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
    menubar: {
        background: "#d9d9d9",
        color: "#000",
        border: "none",
        boxShadow: "0 2px 0px 0 rgb(0 0 0 / 12%)"
    },

    marginTopSessionCard: {
        marginTop: "-0.5rem"
    },
    alert: {
        background: '#d9d9d9'
    },
    alertIcon: {
        color: "#000",
        fontSize: "28px",
        alignSelf: "center",
    },
    image: {
        width: "100%",
        height: "100%",
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },

}));

export default function SessionDetail() {
    const classes = useStyles(); 
    const location = useLocation() 
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
                            to={`/sports/${location?.state?.sport_group}`} 
                            aria-label="open drawer"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        {location?.state?.group?.private_group?.picture !== "" ?
                            <Avatar src={"https://docker81177-sportlink.hidora.com"+location?.state?.group?.private_group?.picture?.url} className={classes.small}>
                                <ImageIcon />
                            </Avatar>
                            :
                            <Avatar className={classes.small}>
                                <ImageIcon />
                            </Avatar>
                        }
                        <Typography className={classes.title} variant="h6" noWrap>
                            {location?.state?.group?.private_group?.name}
                        </Typography>

                        <div className={classes.grow} />

                        <Avatar alt="img" src={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                            className={classes.large} />

                    </Toolbar>

                </AppBar>
                <div className={classes.marginTopSessionCard}>
                    <SessionItem session={location?.state} />
                </div>
                <Alert className={classes.alert} icon={<ModeCommentOutlinedIcon className={classes.alertIcon} />} severity="success">
                    Bring your soccer clits, some water and let's enjoy all together !
                </Alert>
                
                    {/* Map compoent please add here and remove this grid item */}
                    <h6>Please Add Map component that are already developed in you existing application</h6>
                    <h6>Please Add Chat component that are already developed in you existing application</h6>
            </div>

        </>
    );
}
