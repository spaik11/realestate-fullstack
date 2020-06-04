import axios from "axios";

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_HOST_ADDRESS
      : process.env.REACT_APP_API_HOST_ADDRESS,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (request) => {
    console.log("REQ ######");
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    console.log("REQ ######");
    console.log(response);
    // Edit request config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default Axios;
