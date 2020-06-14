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
    let filterList = data.bundle
      .filter((item) => item.BedroomsTotal !== null)
      .sort((a, b) => a.ListPrice - b.ListPrice);

    return filterList;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};
