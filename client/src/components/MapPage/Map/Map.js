import React, { useContext } from "react";
import { CityContext } from "../../Context/CityContext";
import { UserContext } from "../../Context/UserContext";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Spinner from "../../Spinner/Spinner";
import { addToFave } from "../../../lib/Helpers/AuthHelpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "leaflet";
import "./Map.css";

export const icon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [25, 25],
});

export default function LeafMap({
  data,
  currentCity,
  addCommas,
  modalHandler,
}) {
  const { activeProp, setActiveProp } = useContext(CityContext);
  const { isAuth: user, dispatch } = useContext(UserContext);

  if (data.length === 0) {
    return <Spinner />;
  }

  const cityCoords = {
    Austin: [30.2672, -97.7431],
    Temple: [31.0982, -97.3428],
    Georgetown: [30.6333, -97.678],
    Pflugerville: [30.4548, -97.6223],
    Hutto: [30.5427, -97.5467],
    Wimberley: [29.9974, -98.0986],
  };

  let mapCenter = cityCoords[currentCity];

  const handleFaveSubmit = async (
    {
      City,
      ListPrice,
      UnparsedAddress,
      BedroomsTotal,
      BathroomsTotalInteger,
      LivingArea,
      ListingKey,
      Latitude,
      Longitude,
      Media,
      PublicRemarks,
    },
    dispatch
  ) => {
    try {
      let success = await addToFave({
        _id: user.user._id,
        City,
        ListPrice,
        UnparsedAddress,
        BedroomsTotal,
        BathroomsTotalInteger,
        LivingArea,
        ListingKey,
        Latitude,
        Longitude,
        Media: [Media[0]],
        PublicRemarks,
      });

      dispatch({
        type: "UPDATE_USER",
        payload: success.user,
      });

      toast.success(`Added to Favorites!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Map center={mapCenter ? mapCenter : [30.2672, -97.7431]} zoom={11}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {data.map((property, idx) => (
          <Marker
            key={idx}
            position={[property.Latitude, property.Longitude]}
            onmouseover={() => setActiveProp(property)}
            riseOnHover
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
              <h2>${addCommas(activeProp.ListPrice)}</h2>
              <p>{activeProp.UnparsedAddress}</p>
              <p>{`${activeProp.BedroomsTotal} bed, ${
                activeProp.BathroomsTotalInteger
              } bath, ${addCommas(activeProp.LivingArea)} Square Feet`}</p>
              <img
                src={
                  activeProp.Media[0].MediaURL
                    ? activeProp.Media[0].MediaURL
                    : null
                }
                alt=""
              />
              <br />
              <button onClick={modalHandler}>More info</button>
              <button onClick={() => handleFaveSubmit(activeProp, dispatch)}>
                Add To Favorites
              </button>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}
