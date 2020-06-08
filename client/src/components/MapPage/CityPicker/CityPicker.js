import React, { useContext } from "react";
import { CityContext } from "../../Context/CityContext";
import "./CityPicker.css";

export default function CityPicker() {
  const { setCurrentCity } = useContext(CityContext);

  return (
    <div className="container">
      <label>Choose a city:</label>
      <select name="city" onChange={(e) => setCurrentCity(e.target.value)}>
        <option value="Austin">Austin</option>
        <option value="Antonio">San Antonio</option>
        <option value="Temple">Temple</option>
      </select>
    </div>
  );
}
