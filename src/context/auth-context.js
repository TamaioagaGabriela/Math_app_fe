import React from 'react';

export default React.createContext({
  token: null,
  userId: null,
  nume: null,
  role: null,
  clasa: null,
  capitolId: null,
  subcapitolId: null,
  changeClasa: (val) => {},
  login: (token, userId, role, clasa, nume, email, tokenExpiration) => {},
  logout: () => {}
});

// export const AuthContextProvider = createContext.Provider;
// export const AuthContextConsumer = createContext.Consumer;
