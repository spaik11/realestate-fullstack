import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import Sidebar from './Sidebar';
import './MapPage.css';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center"
  }
}));

export default function SpacingGrid() {
    const classes = useStyles();

    return (
        <Grid container id="main" className={classes.root} spacing={2}>
        <Grid item id="map">
        map
        </Grid>
        <Grid item id="sidebar">
        <Sidebar />
        </Grid>
        </Grid>
    );
}