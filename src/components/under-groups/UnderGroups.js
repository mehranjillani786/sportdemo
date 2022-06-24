import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'; 
import { Link, useParams } from "react-router-dom" 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar'; 
// import { my_groups } from "../data"
import UnderGroupItem from './UnderGroupItem';
import { InputAdornment, List, TextField } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { getGroupDetail } from '../../services/GroupService';


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
    const [group,setGroup] = React.useState(null)
    const [all_group,setAllGroup] = React.useState(null)
  const [searchText, setSearchText] = React.useState("")

    React.useEffect(() => {
        async function fetchData() {
          let group = await getGroupDetail(id)
          setGroup(group)
          setAllGroup(group?.subgroups)
        }
        fetchData()
      }, [id]) 
      const findGroup = (e) => { 
        if (group !== undefined) {
          setSearchText(e.target.value)
          const results = all_group.filter(group =>
            group.description.toLowerCase().includes(e.target.value.toLocaleLowerCase())
          ) 
          setGroup({...group,...{subgroups:results}}) 
        }
      }
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
                    {group?.picture ?
                        <Avatar src={"https://docker81177-sportlink.hidora.com"+group?.picture?.url} className={classes.small}>
                        </Avatar>
                        :
                        <Avatar className={classes.small}>
                            <ImageIcon />
                        </Avatar>
                    }
                    <Typography className={classes.title} variant="h6" noWrap>
                        {group?.name}
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
                value={searchText}
                className={classes.textField}
                onChange={e => findGroup(e)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <SearchOutlinedIcon />
                    </InputAdornment>
                }}
            />
            <List className={classes.root} dense={true}>
                {group?.subgroups.map((s, i) => {
                    return <UnderGroupItem sportItem={{...s,...{group:id}}} key={i} />
                })}
            </List>

        </div>
    );
}
