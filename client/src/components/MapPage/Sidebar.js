import React from 'react';
import { makeStyles, ListSubheader, List, ListItem, ListItemText, Collapse, Grid } from '@material-ui/core';
import { ExpandLess, ExpandMore} from '@material-ui/icons';
import testData from '../../data/testData';
import './Sidebar.css';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
    const classes = useStyles();
    const [open, setOpenF] = React.useState(false);
    const [closed, setOpenA] = React.useState(false);

    const handleClickFavorites = () => {
      setOpenF(!open);
      setOpenA(false);
    };
    const handleClickAll = () => {
      setOpenA(!closed);
      setOpenF(false);
    };
  
    return (
      <Grid container id="properties">
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
        <ListItem button onClick={handleClickFavorites}>
          <ListItemText primary="Favorites" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Grid item id="favList">
        <Collapse in={open} timeout="auto" unmountOnExit>
          {testData.map(item =>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary={item.Address} />
              </ListItem>
            </List>
          )}
        </Collapse>
        </Grid>
        <ListItem button onClick={handleClickAll}>
          <ListItemText primary="All" />
          {closed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Grid item id="allList">
        <Collapse in={closed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="item" />
            </ListItem>
          </List>
        </Collapse>
        </Grid>
      </List>
      </Grid>
    );
}