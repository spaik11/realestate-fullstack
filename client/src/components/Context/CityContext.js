import React, { useState, createContext } from "react";

export const CityContext = createContext();

export const CityProvider = (props) => {
  const [currentCity, setCurrentCity] = useState("Austin");

  return (
    <CityContext.Provider value={{ currentCity, setCurrentCity }}>
      {props.children}
    </CityContext.Provider>
  );
};
