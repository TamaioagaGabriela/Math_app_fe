import { ro } from 'date-fns/locale';
import React from 'react';

export default React.createContext({
  token: null,
  userId: null,
  nume: null,
  role: null,
  clasa: null,
  capitolId: null,
  subcapitolId: null,
  language: 'ro',
  changeLanguage: (val) => {},
  changeClasa: (val) => {},
  login: (token, userId, role, language, clasa, nume, email, tokenExpiration) => {},
  logout: () => {}
});

// export const AuthContextProvider = createContext.Provider;
// export const AuthContextConsumer = createContext.Consumer;
