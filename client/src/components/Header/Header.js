import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { UserContext } from "../Context/UserContext";
import { isAuthenticated, setUserAuth } from "../../lib/Helpers/AuthHelpers";
import AuthHeader from "./AuthHeader";
import UnAuthHeader from "./UnAuthHeader";

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
  const {
    isAuth: { user, auth },
    dispatch,
  } = useContext(UserContext);

  useEffect(() => {
    let jwtToken = isAuthenticated();

    if (jwtToken !== false) {
      setUserAuth(jwtToken, props.dispatch);
    }
  }, [props.dispatch]);

  const classes = useStyles();

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
            <AuthHeader {...user} {...auth} dispatch={dispatch} />
          ) : (
            <UnAuthHeader />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
