import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import {Link} from "react-router-dom"
import NotificationsIcon from '@material-ui/icons/Notifications';
import EventIcon from '@material-ui/icons/Event';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    title: {
        color: "#484848",
        fontWeight: 800
    },
    button: {
        fontSize: "0.8rem",
        fontWeight: 700,
        color: "#484848",
        padding: theme.spacing(0.2)
    },
    subtitle: {
        fontWeight: 600,
        textTransform: "uppercase",
        color:"#484848",
        textDecoration:"none"
    },
    list: {
        background: "#d9d9d9",
        margin: "0px 0px 0.5rem 0px",
        padding: "5px 0px 5px 5px",
        borderRadius: '5px'
    },
    icon: {
        fontSize: "1.2rem",
        color: "#ff2e00"
    },
    iconsList: {
        background: "#eeeeee",
        padding: "0.2rem",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
        color: "#555"
    }
}));

export default function UnderGroupItem({ sportItem }) {
    const classes = useStyles(); 
    
    return (
        <ListItem className={classes.list}>
            <ListItemAvatar>
                {sportItem?.picture ?
                    <Avatar alt="img" src={"https://docker81177-sportlink.hidora.com"+sportItem?.picture?.url} className={classes.large} /> :
                    <Avatar className={classes.large} >
                        <ImageIcon />
                    </Avatar>
                }
            </ListItemAvatar>
            <ListItemText className={classes.title}
                primary={<Typography variant='subtitle1' className={classes.subtitle} component={"h6"} >
                        <Link component={Link} className={classes.subtitle} to={`/sports/${sportItem.id}`}>
                            {sportItem?.description}
                        </Link>
                    </Typography>
                }
                // secondary={<Typography variant='caption' component={"h6"}  >{sportItem.under_groups}
                //       <Box display="flex" alignItems="center">
                //         <AddCircleIcon className={classes.icon} />
                //         <Button  className={classes.button} >
                //             Join Group
                //         </Button>
                //     </Box>   
                // </Typography>}
                 />
            <Box display="flex" className={classes.iconsList} alignItems="center" justifyContent="flex-end">
                <NotificationsIcon fontSize='small' />
                <EventIcon fontSize='small' />
                <FlashOnIcon fontSize='small' />
                <EmailIcon fontSize='small' />
            </Box>
        </ListItem>
    );
}
