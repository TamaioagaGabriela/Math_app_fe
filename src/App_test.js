import { useState, useMemo, useEffect } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import { red } from '@mui/material/colors';
import Router from './routes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import AuthContext from './context/auth-context';

// ----------------------------------------------------------------------

export default function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [nume, setNume] = useState(null);
  const [clasa, setClasa] = useState(null);
  const [email, setEmail] = useState(null);
  const [capitolId, setCapitol] = useState(null);
  const [subcapitolId, setSubcapitol] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const [login, setLogin] = useState({ token, userId, role });
  const [logout, setLogout] = useState({ token: null, userId: null, role: null });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const authContext = useMemo(
    () => ({
      token,
      userId,
      login: (token, userId, role, clasa, nume, email, tokenExpiration) => {},
      logout: () => {
        setToken(null);
        setRole(null);
        setUserId(null);
        setClasa(null);
        setNume(null);
        setEmail(null);
        setCapitol(undefined);
        setSubcapitol(undefined);
      }
    }),
    [token, userId]
  );

  useEffect(() => {
    const bodyClasses = document.body.classList;
    if (isDarkMode) {
      // add "dark" class to body
      bodyClasses.add('dark');
    } else {
      // remove "dark" class from body
      bodyClasses.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <AuthContext.Provider value={authContext}>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <DarkModeToggle
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
            size={200}
            color={red}
          />
        </div>
        <Router />
      </ThemeConfig>
    </AuthContext.Provider>
  );
}
