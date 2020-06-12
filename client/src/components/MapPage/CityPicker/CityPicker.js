import React from "react";
import "./CityPicker.css";

export default function CityPicker({ cityChangeHandler }) {
  return (
    <div className="container">
      <label>Choose a city:</label>
      <select
        name="city"
        onChange={(e) => {
          cityChangeHandler(e.target.value);
        }}>
        <option value="Austin">Austin</option>
        <option value="Georgetown">Georgetown</option>
        <option value="Hutto">Hutto</option>
        <option value="Pflugerville">Pflugerville</option>
        <option value="Temple">Temple</option>
        <option value="Wimberley">Wimberley</option>
      </select>
    </div>
  );
}
