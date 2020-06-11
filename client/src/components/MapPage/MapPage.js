import React, { useState, useEffect, useContext } from "react";
import { CityContext } from "../Context/CityContext";
import { makeStyles, Grid } from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import { fetchRealEstateData } from "../../lib/api/api";
import texasProperty from "../../lib/api/texas.json";
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
  const { currentCity } = useContext(CityContext);

  useEffect(() => {
    // setApiProperty(texasProperty);
    callApi();
  }, []);

  const callApi = async () => {
    let apiData = await fetchRealEstateData();
    console.log(apiData);
    setApiProperty(apiData);
  };

  const classes = useStyles();

  const addCommas = (nStr) => {
    nStr += "";
    let x = nStr.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "." + x[1] : "";
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  };

  return (
    <Grid container id="main" className={classes.root} spacing={2}>
      <Grid item id="map">
        <Map data={apiProperty} city={currentCity} addCommas={addCommas} />
      </Grid>
      <Grid item id="sidebar">
        <Sidebar
          data={apiProperty}
          setList={setApiProperty}
          addCommas={addCommas}
        />
      </Grid>
    </Grid>
  );
}
