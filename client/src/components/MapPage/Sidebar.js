import React from 'react';
import { makeStyles, ListSubheader, List, ListItem, ListItemText, Collapse, Grid } from '@material-ui/core';
import { ExpandLess, ExpandMore} from '@material-ui/icons';
import testData from '../../data/testData';
import './Sidebar.css';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
    const classes = useStyles();
    const [fOpen, setOpenF] = React.useState(false);
    const [aOpen, setOpenA] = React.useState(false);
    // const fText = document.querySelector('#liText1');
    const aText = document.querySelector('#liText2');

    const handleClickFavorites = () => {
      setOpenF(!fOpen);
      setOpenA(false);
      document.querySelector('#liText2').style.backgroundColor = 'white';
      fOpen !== true ? 
        document.querySelector('#liText1').style.backgroundColor = 'rgb(63, 81, 181, .5)' : 
        document.querySelector('#liText1').style.backgroundColor = 'white';
    };
    const handleClickAll = () => {
      setOpenA(!aOpen);
      setOpenF(false);
      document.querySelector('#liText1').style.backgroundColor = 'white';
      aOpen !== true ? aText.style.backgroundColor = 'rgb(63, 81, 181, .5)' : aText.style.backgroundColor = 'white';
    };
  
    return (
      <Grid container="true" id="properties">
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Properties
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem id="liText1" button onClick={handleClickFavorites}>
          <ListItemText primary="Favorites" />
          {fOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Grid item="true" id="favList">
        <Collapse in={fOpen} timeout="3000" unmountOnExit>
          {testData.map(item =>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary={item.Address} />
              </ListItem>
            </List>
          )}
        </Collapse>
        </Grid>
        <ListItem id="liText2" button onClick={handleClickAll}>
          <ListItemText primary="All" />
          {aOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Grid item="true" id="allList">
        <Collapse in={aOpen} timeout="3000" unmountOnExit>
          {testData.map(item =>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary={item.Address} />
              </ListItem>
            </List>
          )}
        </Collapse>
        </Grid>
      </List>
      </Grid>
    );
}