import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {Link} from "react-router-dom"
import { Avatar, Box, Divider } from '@material-ui/core';
import SportsVolleyballOutlinedIcon from '@material-ui/icons/SportsVolleyballOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    background: "#d9d9d9",
    marginTop: "0.5rem"
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
  p5: {
    padding: "5px"
  },
  title: {
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    lineHeight: "0"
  },
  icon: {
    paddingLeft: "2px",
    fontSize: "larger"
  },
  sessionDetails: {
    display: "flex",
    paddingTop: "5px",
    alignItems: "center",
    fontSize: "11px"
  },
  sessionIcon: {
    paddingRight: "2px",
    fontSize: "26px"
  },
  mainSection: {
    marginTop: "0.8rem"
  }, 
  subtitle: {
    fontWeight: 600,
    textTransform: "uppercase",
    color:"#484848",
    textDecoration:"none"
},
}));

export default function SessionItem({ session }) {
  const classes = useStyles();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
  let { id, title, author, img, date, time, max_people, location, sport } = session;
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={4} className={classes.image}>
            <img className={classes.img} alt="complex" src={img} />
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container direction="column" >
              <Grid item xs className={classes.p5}>
                <Typography variant="subtitle1" className={classes.title}>
                  <Link component={Link} className={classes.subtitle} to={`/session/${id}`} state={session}>
                    {title}
                  </Link>
                  <SportsVolleyballOutlinedIcon className={classes.icon} />
                </Typography>
                <Typography variant="body2" gutterBottom>
                  by {author}
                </Typography>
                <Divider />
                <Grid container className={classes.mainSection}>
                  <Grid item xs={6}>
                    <Typography variant="caption" className={classes.sessionDetails} >
                      <EventAvailableOutlinedIcon className={classes.sessionIcon} />
                      {`${days[date.getUTCDay()]}. ${date.toLocaleDateString()}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" className={classes.sessionDetails} >
                      <QueryBuilderIcon className={classes.sessionIcon} />
                      {time.toLocaleTimeString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" className={classes.sessionDetails} >
                      <RoomOutlinedIcon className={classes.sessionIcon} />
                      {location}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" className={classes.sessionDetails} >
                      <ConfirmationNumberOutlinedIcon className={classes.sessionIcon} />
                      0 - $
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" className={classes.sessionDetails} >
                      <GroupOutlinedIcon className={classes.sessionIcon} />
                      {max_people}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" className={classes.sessionDetails} >
                      <PlayArrowOutlinedIcon className={classes.sessionIcon} />
                      {sport}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
