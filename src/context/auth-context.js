import React, { createContext } from 'react';

export default createContext({
  token: null,
  userId: null,
  login: (token, userId, role, tokenExpiration) => {},
  logout: () => {}
});

export const AuthContextProvider = createContext.Provider;
export const AuthContextConsumer = createContext.Consumer;
