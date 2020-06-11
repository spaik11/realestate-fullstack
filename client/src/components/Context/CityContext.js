import React, { useState, createContext } from "react";

export const CityContext = createContext();

export const CityProvider = (props) => {
  const [currentCity, setCurrentCity] = useState("Austin");
  const [activeProp, setActiveProp] = useState(null);

  return (
    <CityContext.Provider
      value={{ currentCity, setCurrentCity, activeProp, setActiveProp }}>
      {props.children}
    </CityContext.Provider>
  );
};
