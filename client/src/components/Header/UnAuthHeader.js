import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function UnAuthHeader() {
  return (
    <>
      <Button color="inherit">
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/login"
          exact>
          Login
        </NavLink>
      </Button>
      <Button color="inherit">
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to="/register"
          exact>
          Register
        </NavLink>
      </Button>
    </>
  );
}
