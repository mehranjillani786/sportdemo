import React from 'react';
import { Grid, Typography, Divider } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    headings:{
        fontWeight:600,
        fontSize:'0.8rem'
    }
}));
export default function Headings({ heading }) { 
    const classes = useStyles();

    return (

        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid container item xs={3}>
                <Typography variant="h6" component="div" className={classes.headings} >
                    {heading}
                </Typography>
            </Grid>
            <Grid  item xs={9}>
                <Divider />
            </Grid>
        </Grid>

    )

}