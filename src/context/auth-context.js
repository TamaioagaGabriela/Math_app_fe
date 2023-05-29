import { ro } from 'date-fns/locale';
import React from 'react';

export default React.createContext({
  token: null,
  userId: null,
  nume: null,
  role: null,
  clasa: null,
  limbaAleasaPic: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/RO.svg',
  capitolId: null,
  subcapitolId: null,
  language: 'ro',
  setLimbaAleasaPic: (val) => {},
  changeLanguage: (val) => {},
  changeClasa: (val) => {},
  login: (token, userId, role, language, limbaAleasaPic, clasa, nume, email, tokenExpiration) => {},
  logout: () => {}
});

// export const AuthContextProvider = createContext.Provider;
// export const AuthContextConsumer = createContext.Consumer;
