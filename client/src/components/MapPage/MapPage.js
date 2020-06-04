import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import Sidebar from './Sidebar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center"
  }
}));

export default function SpacingGrid() {
    // const [spacing] = React.useState(2);
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
        <Grid item style={{height:"78vh", width:"66vw", border:"1px solid black", margin:"10px 5px 10px 30px"}}>
        map
        </Grid>
        <Grid item style={{height:"78vh", width:"20vw", border:"1px solid red", margin:"10px 30px 10px 5px"}}>
        <Sidebar />
        </Grid>
        </Grid>
    );
}