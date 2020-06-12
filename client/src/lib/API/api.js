import axios from "axios";

let envKey =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BRIDGE_KEY
    : process.env.REACT_APP_BRIDGE_KEY;

let url = `https://api.bridgedataoutput.com/api/v2/abor_ref/listings?access_token=${envKey}&limit=20&City.in=`;

export const fetchRealEstateData = async (city) => {
  let changeUrl = url + "Austin";

  if (city) {
    changeUrl = url + city;
  }

  try {
    const { data } = await axios.get(changeUrl);
    let filterList = data.bundle.filter((item) => item.BedroomsTotal !== null);

    console.log("API CALL", filterList);
    return filterList;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

// const formatData = (obj) => {
//   const list = [];
//   obj.forEach((item) => {
//     list.push({
//       Price: item.ListPrice,
//       "Property Type": item.PropertySubType,
//       Levels: item.Levels,
//       "Living Area": item.LivingArea,
//       "Area Units": item.LivingAreaUnits,
//       "Lot Size": item.LotSizeArea,
//       "Lot Units": item.LotSizeUnits,
//       Bedrooms: item.BedroomsTotal,
//       Bathrooms: item.BathroomsTotalDecimal,
//       Address: item.UnparsedAddress,
//       Latitude: item.Latitude,
//       Longitude: item.Longitude,
//       ListingKey: item.ListingKey,
//       Media: item.Media[0].MediaURL,
//     });
//   });
//   return list;
// };
