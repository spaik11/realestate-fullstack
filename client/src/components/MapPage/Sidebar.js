import React from 'react';
import { makeStyles, ListSubheader, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore} from '@material-ui/icons';


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
    };
    const handleClickAll = () => {
      setOpenA(!closed);
    };
  
    return (
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
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="saved item" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleClickAll}>
          <ListItemText primary="All" />
          {closed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={closed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="item" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
}