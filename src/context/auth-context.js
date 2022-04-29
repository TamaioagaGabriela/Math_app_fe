import React, { createContext } from 'react';

export default createContext({
  token: null,
  userId: null,
  login: (token, userId, role, tokenExpiration) => {},
  logout: () => {}
});

export const UserProvider = createContext.Provider;
export const UserConsumer = createContext.Consumer;
