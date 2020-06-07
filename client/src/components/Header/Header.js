import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Consumer } from "../Context/UserContext";
import { isAuthenticated, setUserAuth } from "../../lib/Helpers/AuthHelpers";

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

  return (
    <div id="header" className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink style={{ color: "white" }} to="/" exact>
              TruZillow
            </NavLink>
          </Typography>
          <Button color="inherit">
            <NavLink style={{ color: "white" }} to="/map" exact>
              Search
            </NavLink>
          </Button>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
