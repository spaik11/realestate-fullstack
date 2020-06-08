import React, { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Sidebar from "../Sidebar/Sidebar";
import texasProperty from "../../lib/API/texas.json";
import Map from "./Map/Map";
import "./MapPage.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
}));

export default function MapPage() {
  const [apiProperty, setApiProperty] = useState([]);
  const [currentCity, setCurrentCity] = useState();

  useEffect(() => {
    setApiProperty(texasProperty);
  }, []);

  const classes = useStyles();

  return (
    <Grid container id="main" className={classes.root} spacing={2}>
      <Grid item id="map">
        <Map data={apiProperty} city={currentCity} />
      </Grid>
      <Grid item id="sidebar">
        <Sidebar />
      </Grid>
    </Grid>
  );
}
