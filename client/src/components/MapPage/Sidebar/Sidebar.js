import React, {useContext} from "react";
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
import CityPicker from "../CityPicker/CityPicker";
import "./Sidebar.css";
import { CityContext } from "../../Context/CityContext";
import stuff from "../../../data/testData";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Sidebar(props ) {
  const classes = useStyles();
  const [fOpen, setOpenF] = React.useState(false);
  const [aOpen, setOpenA] = React.useState(false);

  const {currentCity} = useContext(CityContext);

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

  const testData = props.data.filter(item => item.Address.includes(currentCity));
  
  return (
    <Grid container id="properties">
      <CityPicker setList={props.setList} />
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
            {testData.map((item, idx) => (
              <List key={idx} component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemText 
                    primary={`$${item.Price}`}
                    secondary={`${item.Bedrooms}bed, ${item.Bathrooms}bath, ${item.Living_Area} ${item.Area_Units}`} />
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
                <ListItem button className={classes.nested}>
                  <ListItemText 
                    primary={`$${item.Price}`}
                    secondary={`${item.Bedrooms}bed, ${item.Bathrooms}bath, ${item.Living_Area} ${item.Area_Units}`} />
                </ListItem>
              </List>
            ))}
          </Collapse>
        </Grid>
      </List>
    </Grid>
  );
}
