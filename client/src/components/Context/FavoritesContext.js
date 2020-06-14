import React, { Component } from "react";
import { getAllFavorites } from "../../lib/Helpers/AuthHelpers";

export const FavoritesContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_FAVORITES":
      return {
        ...state,
        favorites: [...action.payload],
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...action.payload],
      };
    // case "DELETE_BY_ID":
    //   return {
    //     ...state,
    //     favorites: state.FavoritesArray.filter(
    //       (item) => item._id !== action.payload._id
    //     ),
    //   };
    default:
      return state;
  }
};

export class FavoritesProvider extends Component {
  state = {
    favorites: [],
    favoritesDispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  async componentDidMount() {
    try {
      let results = await getAllFavorites();

      this.state.favoritesDispatch({
        type: "GET_ALL_FAVORITES",
        payload: results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log("FAVORITES", this.state.favorites);
    return (
      <FavoritesContext.Provider value={this.state}>
        {this.props.children}
      </FavoritesContext.Provider>
    );
  }
}

export const FavoritesConsumer = FavoritesContext.Consumer;
