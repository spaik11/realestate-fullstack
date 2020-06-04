import Axios from "./Axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const createUser = async (userInfo) => {
  try {
    let { data } = await Axios.post("/api/users/create-user", userInfo, {
      withCredentials: true,
    });

    return data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const loginUser = async (userInfo) => {
  try {
    let { data } = await Axios.post("/api/users/login", userInfo, {
      withCredentials: true,
    });

    return data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  let foundCookie = Cookies.get("jwt-cookie-expense");

  if (foundCookie) {
    return foundCookie;
  } else {
    return false;
  }
};

export const setUserAuth = (jwtToken, dispatch) => {
  let decodedToken = jwt_decode(jwtToken);

  dispatch({
    type: "SUCCESS_SIGNED_IN",
    payload: decodedToken,
  });
};

export const logout = async () => {
  try {
    await Axios.get("/api/users/logout");
    Cookies.remove("jwt-cookie-expense");
  } catch (e) {
    throw Error(e.response.data.message);
  }
};
