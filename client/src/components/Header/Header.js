import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Consumer } from "../Context/UserContext";
import {
  isAuthenticated,
  setUserAuth,
  logout,
} from "../../lib/Helpers/AuthHelpers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
}));

export default function Header(props) {
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

  useEffect(() => {
    let jwtToken = isAuthenticated();

    if (jwtToken) {
      setUserAuth(jwtToken, props.dispatch);
    }
  }, [props.dispatch]);

  const classes = useStyles();

  return (
    <Consumer>
      {(context) => {
        const {
          isAuth: { user, auth },
        } = context;

        return (
          <div id="header" className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  <NavLink
                    style={{ color: "white", textDecoration: "none" }}
                    to="/"
                    exact>
                    TruZillow
                  </NavLink>
                </Typography>
                {user && auth ? (
                  <>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      style={{ color: "white", textDecoration: "none" }}>
                      {`Hello, ${user.username.toUpperCase()}`}
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
                            color: "3f51b5",
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
                ) : (
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
                )}
              </Toolbar>
            </AppBar>
          </div>
        );
      }}
    </Consumer>
  );
}
