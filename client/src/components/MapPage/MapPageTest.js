import React, {
  Component,
  useState,
  useEffect,
  useContext,
  Context,
} from "react";
import { CityContext } from "../Context/CityContext";
import { Grid } from "@material-ui/core";
import Sidebar from "./Sidebar/Sidebar";
import texasProperty from "../../lib/api/texas.json";
import Map from "./Map/Map";
import "./MapPage.css";
import axios from "axios";

const formatData = (obj) => {
  const list = [];
  obj.forEach((item) => {
    list.push({
      Price: item.ListPrice,
      "Property Type": item.PropertySubType,
      Levels: item.Levels,
      "Living Area": item.LivingArea,
      "Area Units": item.LivingAreaUnits,
      "Lot Size": item.LotSizeArea,
      "Lot Units": item.LotSizeUnits,
      Bedrooms: item.BedroomsTotal,
      Bathrooms: item.BathroomsTotalDecimal,
      Address: item.UnparsedAddress,
      Latitude: item.Latitude,
      Longitude: item.Longitude,
      // 'Media':getMedia(item),
      // 'Description':item.PublicRemarks,
      // 'Year Built':item.YearBuilt,
      // 'Appliances':item.Appliances,
      // 'Construction Materials':item.ConstructionMaterials,
      // 'Cooling':item.Cooling,
      // 'Heating':item.Heating,
      // 'County':item.CountyOrParish,
      // 'Listing Agent':item.ListAgentFullName,
      // 'Listing Office':item.ListOfficeName
    });
  });
  return list;
};

export default class MapPage extends Component {
  constructor() {
    super();
    this.state = {
      apiProperty: [],
      currentCity: "Austin",
    };
  }

  setApiProperty = (item) => {
    this.setState({ apiProperty: item });
  };

  setCurrentCity = (item) => {
    this.setState({ currentCity: item });
  };

  getProperties = (city) => {
    // axios.get("https://api.bridgedataoutput.com/api/v2/abor_ref/listings?access_token=0c7b25df1e2ae8fb17291aef4cdb4105&limit=10&City.in=" + city)
    //   .then((results) => {
    //     console.log('still running')
    //       if(results){
    //         const bundle = formatData(results.data.bundle);
    //         console.log(bundle)
    //         this.setState({apiProperty: bundle});
    //         this.setState({currentCity: city});
    //       } else {
    //       }
    //   })
    const list = texasProperty;
    console.log(list);
    const fList = formatData(list.map((item) => item.Address.includes(city)));
    this.setState({ currentCity: city });
    this.setState({ apiProperty: fList });
    console.log(this.state);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCity !== this.state.currentCity) {
      this.getProperties(this.state.currentCity);
    }
  }

  render() {
    return (
      <Grid
        container
        id="main"
        style={{ flexGrow: 1, justifyContent: "center" }}
        spacing={2}>
        <Grid item id="map">
          <Map data={this.state.apiProperty} city={this.state.currentCity} />
        </Grid>
        <Grid item id="sidebar">
          <Sidebar
            data={this.state.apiProperty}
            getProperties={this.getProperties}
            setCity={this.setCurrentCity}
          />
        </Grid>
      </Grid>
    );
  }
}
