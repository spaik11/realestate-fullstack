import React, { useState, useContext } from "react";
import {
  makeStyles,
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Grid,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import classnames from "classnames";
import CityPicker from "../CityPicker/CityPicker";
import { UserContext } from "../../Context/UserContext";
import { CityContext } from "../../Context/CityContext";
import "./Sidebar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  activeProperty: {
    border: "1px solid black",
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const [fOpen, setOpenF] = useState(false);
  const [aOpen, setOpenA] = useState(false);

  const {
    isAuth: { user },
  } = useContext(UserContext);
  const { activeProp, setActiveProp } = useContext(CityContext);

  const handleClickFavorites = () => {
    setOpenA(false);
    document.querySelector("#liText2").style.backgroundColor = "white";
    fOpen !== true
      ? (document.querySelector("#liText1").style.backgroundColor =
          "rgb(63, 81, 181, .5)")
      : (document.querySelector("#liText1").style.backgroundColor = "white");
    setOpenF(!fOpen);
  };
  const handleClickAll = () => {
    setOpenA(!aOpen);
    setOpenF(false);
    document.querySelector("#liText1").style.backgroundColor = "white";
    aOpen !== true
      ? (document.querySelector("#liText2").style.backgroundColor =
          "rgb(63, 81, 181, .5)")
      : (document.querySelector("#liText2").style.backgroundColor = "white");
  };

  return (
    <Grid container id="properties">
      <CityPicker
        setList={props.setList}
        cityChangeHandler={props.cityChangeHandler}
      />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Properties
          </ListSubheader>
        }
        className={classes.root}>
        <ListItem id="liText1" button onClick={handleClickFavorites}>
          <ListItemText primary="Favorites" />
          {fOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Grid item id="favList">
          <Collapse in={fOpen} timeout={0} unmountOnExit>
            {user.favorites.map((item, idx) => (
              <List key={idx} component="div" disablePadding>
                <ListItem
                  button
                  className={classnames(
                    classes.nested,
                    activeProp && activeProp.ListingKey === item.ListingKey
                      ? classes.activeProperty
                      : null
                  )}
                  onMouseEnter={() => setActiveProp(item)}>
                  <ListItemText
                    primary={`$${props.addCommas(item.ListPrice)}`}
                    secondary={`${item.BedroomsTotal} bed, ${
                      item.BathroomsTotalInteger
                    } bath, ${props.addCommas(item.LivingArea)} Square Feet`}
                  />
                </ListItem>
              </List>
            ))}
          </Collapse>
        </Grid>
        <ListItem id="liText2" button onClick={handleClickAll}>
          <ListItemText primary="All" />
          {aOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Grid item id="allList">
          <Collapse in={aOpen} timeout={0} unmountOnExit>
            {props.data.map((item, idx) => (
              <List key={idx} component="div" disablePadding>
                <ListItem
                  button
                  className={classnames(
                    classes.nested,
                    activeProp && activeProp.ListingKey === item.ListingKey
                      ? classes.activeProperty
                      : null
                  )}
                  onMouseEnter={() => setActiveProp(item)}>
                  <ListItemText
                    primary={`$${props.addCommas(item.ListPrice)}`}
                    secondary={`${item.BedroomsTotal} bed, ${
                      item.BathroomsTotalInteger
                    } bath, ${props.addCommas(item.LivingArea)} Sq Ft`}
                  />
                </ListItem>
              </List>
            ))}
          </Collapse>
        </Grid>
      </List>
    </Grid>
  );
}
