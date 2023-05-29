// routes
import { useState, useMemo } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import Darkmode from 'darkmode-js';
import Router from './routes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import AuthContext from './context/auth-context';
import { LanguageSelector } from './pages/Login';

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
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const darkmode = new Darkmode();
  const widget = darkmode.showWidget();
  const [language, setLanguage] = useState('ro');

  // const authContext = useContext(AuthContext);
  const authContext = useMemo(
    () => ({
      token,
      userId,
      login: (token, userId, role, clasa, language, nume, email, tokenExpiration) => {},
      logout: () => {
        setToken(null);
        setRole(null);
        setUserId(null);
        setClasa(null);
        setLanguage('ro');
        setNume(null);
        setEmail(null);
        setCapitol(undefined);
        setSubcapitol(undefined);
      }
    }),
    [token, userId]
  );

  return (
    <AuthContext.Provider value={authContext}>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </ThemeConfig>
    </AuthContext.Provider>
  );
}
