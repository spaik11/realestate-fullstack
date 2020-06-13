import React, { Component } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import { fetchRealEstateData } from "../../lib/api/api";
import PropertyModal from "./Modal/PropertyModal";
import Map from "./Map/Map";
import "./MapPage.css";

export default class MapPage extends Component {
  state = {
    apiProperty: [],
    currentCity: "",
    modalOpen: false,
  };

  async componentDidMount() {
    const fetchedData = await fetchRealEstateData(this.state.currentCity);

    this.setState({ apiProperty: fetchedData });
  }

  cityChangeHandler = async (city) => {
    const fetchedData = await fetchRealEstateData(city);

    this.setState({ apiProperty: fetchedData, currentCity: city });
  };

  modalHandler = () => {
    this.state.modalOpen === true
      ? this.setState({ modalOpen: false })
      : this.setState({ modalOpen: true });
  };

  useStyles = () => {
    makeStyles(() => ({
      root: {
        flexGrow: 1,
        justifyContent: "center",
      },
    }));
  };

  addCommas = (nStr) => {
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

  setApiProperty = (data) => {
    this.setState({ apiProperty: data });
  };

  render() {
    const { apiProperty, currentCity } = this.state;
    const classes = this.useStyles;

    return (
      <Grid container id="main" className={classes.root} spacing={2}>
        <PropertyModal
          modalOpen={this.state.modalOpen}
          modalHandler={this.modalHandler}
        />
        <Grid item id="map">
          <Map
            data={apiProperty}
            currentCity={currentCity}
            addCommas={this.addCommas}
            modalHandler={this.modalHandler}
          />
        </Grid>
        <Grid item id="sidebar">
          <Sidebar
            data={apiProperty}
            setList={this.setApiProperty}
            addCommas={this.addCommas}
            cityChangeHandler={this.cityChangeHandler}
          />
        </Grid>
      </Grid>
    );
  }
}
