import axios from "axios";

let url = `https://api.bridgedataoutput.com/api/v2/abor_ref/listings?access_token=0c7b25df1e2ae8fb17291aef4cdb4105&limit=10&City.in=`;

export const fetchRealEstateData = async (city) => {
  let changeUrl = url + "Austin";

  if (city) {
    changeUrl = url + city;
  }

  try {
    const { data } = await axios.get(changeUrl);
    let formattedApi = formatData(data.bundle);

    return formattedApi;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

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
      ListingKey: item.ListingKey,
    });
  });
  return list;
};
