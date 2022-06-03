import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Hidden } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';
import Groups from '../groups/Groups';
import { Outlet } from 'react-router-dom';
import UnderGroups from '../under-groups/UnderGroups';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="SPORTS" />
          <Tab label="PARTENAIRES" />
          <Tab label="PUBLIC GROUPS" />
          <Tab label="PRIVATE GROUPS" />
        </Tabs>


        <TabPanel value={value} index={0}>
          Module Already Exist in your Existing Application.
        </TabPanel>
        <TabPanel value={value} index={1}>
          Module Already Exist in your Existing Application.
        </TabPanel>
        <TabPanel value={value} index={2}>
          Module Already Exist in your Existing Application.
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Groups />
        </TabPanel>
      </Grid>
      {/* <Hidden smDown>
      <Grid item xs={12} md={9}>
        <UnderGroups/>
      </Grid>
      </Hidden> */}
    </Grid>
  );
}
