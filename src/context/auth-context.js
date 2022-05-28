import React from 'react';

export default React.createContext({
  token: null,
  userId: null,
  clasa: null,
  changeClasa: () => {},
  login: (token, userId, role, clasa, tokenExpiration) => {},
  logout: () => {}
});

// export const AuthContextProvider = createContext.Provider;
// export const AuthContextConsumer = createContext.Consumer;
