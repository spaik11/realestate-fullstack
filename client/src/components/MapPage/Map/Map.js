import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "./Map.css";

export const icon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [25, 25],
});

export default function LeafMap({ data, city }) {
  const [activeProp, setActiveProp] = useState(null);

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

  let mapCenter = data.filter(({ Address }) =>
    Address.split(" ").includes(city)
  )[0];

  return (
    <Map
      center={
        !mapCenter
          ? [30.2672, -97.7431]
          : [mapCenter.Latitude, mapCenter.Longitude]
      }
      zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {data.map((property, idx) => (
        <Marker
          key={idx}
          position={[property.Latitude, property.Longitude]}
          onClick={() => {
            setActiveProp(property);
          }}
          icon={icon}
        />
      ))}

      {activeProp && (
        <Popup
          position={[activeProp.Latitude, activeProp.Longitude]}
          onClose={() => {
            setActiveProp(null);
          }}>
          <div>
            <h2>${addCommas(activeProp.Price)}</h2>
            <p>{activeProp.Address}</p>
            <img src={activeProp.Media} alt="" />
            <br />
            <a
              href="https://www.trulia.com/"
              target="_blank"
              rel="noopener noreferrer">
              More info
            </a>
          </div>
        </Popup>
      )}
    </Map>
  );
}
