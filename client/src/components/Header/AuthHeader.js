import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../lib/Helpers/AuthHelpers";
import { Button, Menu, MenuItem } from "@material-ui/core";

export default function AuthHeader(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logUserOut = async () => {
    try {
      await logout();
      props.dispatch({
        type: "SUCCESS_SIGNED_OUT",
      });
    } catch (e) {
      console.log(e);
    }
  };
  console.log(props);
  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "white", textDecoration: "none" }}>
        {`Welcome, ${props.email.slice(0, props.email.indexOf("@"))}`}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <NavLink
            style={{
              color: "#3f51b5",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            to="/map"
            exact>
            Find a Home
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink
            style={{
              color: "#3f51b5",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            to="/user-profile"
            exact>
            My Account
          </NavLink>
        </MenuItem>
        <MenuItem onClick={logUserOut}>
          <NavLink
            style={{
              color: "#3f51b5",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            to="/"
            exact>
            Log Out
          </NavLink>
        </MenuItem>
      </Menu>
    </>
  );
}
