import React, { useContext } from "react";
import { CityContext } from "../../Context/CityContext";
import axios from "axios";
import "./CityPicker.css";


const formatData = (obj) => {
  const list = [];
  obj.forEach(item => {
      list.push(
          {
              'Price':item.ListPrice,
              'Property Type':item.PropertySubType,
              'Levels':item.Levels,
              'Living Area':item.LivingArea,
              'Area Units':item.LivingAreaUnits,
              'Lot Size':item.LotSizeArea,
              'Lot Units':item.LotSizeUnits,
              'Bedrooms':item.BedroomsTotal,
              'Bathrooms':item.BathroomsTotalDecimal,
              'Address':item.UnparsedAddress,
              'Latitude':item.Latitude,
              'Longitude':item.Longitude,
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
          }
      );
  });
  return list;
}

export default function CityPicker() {
  const { setCurrentCity } = useContext(CityContext);

  return (
    <div className="container">
      <label>Choose a city:</label>
      <select name="city" onChange={(e) => 
        {
          setCurrentCity(e.target.value);
        }
      }>
        <option value="Austin">Austin</option>
        <option value="Antonio">San Antonio</option>
        <option value="Temple">Temple</option>
      </select>
    </div>
  )
}
