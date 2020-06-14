import React, { Component, createContext } from "react";

export const UserContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS_SIGNED_IN":
      return { ...state, isAuth: { user: action.payload, auth: true } };
    case "SUCCESS_SIGNED_OUT":
      return { ...state, isAuth: { user: null, auth: false } };
    case "UPDATE_USER":
      return { ...state, isAuth: { user: action.payload, auth: true } };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    isAuth: {
      user: null,
      auth: false,
    },
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  render() {
    console.log("CONTEXT STATE", this.state.isAuth.user);
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const Consumer = UserContext.Consumer;
