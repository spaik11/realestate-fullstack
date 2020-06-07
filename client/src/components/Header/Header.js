import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
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

export default function ButtonAppBar(props) {
  const classes = useStyles();

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
                  <NavLink style={{ color: "white" }} to="/" exact>
                    TruZillow
                  </NavLink>
                </Typography>
                {user && auth ? (
                  <>
                    <Button color="inherit" key="1">
                      <NavLink style={{ color: "white" }} to="/map" exact>
                        Search
                      </NavLink>
                    </Button>
                    <Button color="inherit">
                      <NavLink
                        style={{ color: "white" }}
                        to="/user-profile"
                        exact>
                        {user.username.toUpperCase()}
                      </NavLink>
                    </Button>
                    <Button color="inherit" onClick={logUserOut}>
                      <NavLink style={{ color: "white" }} to="/" exact>
                        Log Out
                      </NavLink>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit">
                      <NavLink style={{ color: "white" }} to="/login" exact>
                        Login
                      </NavLink>
                    </Button>
                    <Button color="inherit">
                      <NavLink style={{ color: "white" }} to="/register" exact>
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
