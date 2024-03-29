import { Link as RouterLink } from 'react-router-dom';

import { useState, useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
// material
import { styled, alpha } from '@mui/material/styles';

import {
  Card,
  Stack,
  Link,
  Container,
  Typography,
  Button,
  Select,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Popover
} from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
import AuthSocial from '../sections/authentication/AuthSocial';
import AuthContext from '../context/auth-context';

import LoginI18n from './Logini18n'; // Import the LoginI18n component

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const LANGS = [
  {
    value: 'ro',
    label: 'Romanian',
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/RO.svg'
  },
  {
    value: 'en',
    label: 'English',
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg'
  },
  {
    value: 'ua',
    label: 'Ukrainian',
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/UA.svg'
  }
];

// ----------------------------------------------------------------------

export function LanguageSelector() {
  const [limbaAleasa, setLimbaAleasa] = useState('ro');
  const context = useContext(AuthContext);
  console.log(context.limbaAleasaPic);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const { i18n } = useTranslation(); // Get the i18n object from useTranslation

  const changeLimbaAleasaPic = (val) => {
    context.limbaAleasaPic = val;
  };

  const handleChangeLanguage = (event) => {
    const languageCode = event?.target?.value;

    console.log('Event target', event?.target?.value);

    console.log('Selected language:', languageCode);
    i18n.changeLanguage(languageCode).then(() => {
      console.log('Language changed to:', languageCode);
    });
  };

  const handleChangeLanguage1 = (languageCode) => {
    console.log('value = ', languageCode);

    i18n.changeLanguage(languageCode).then(() => {
      console.log('Language changed to:', languageCode);
    });
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 35,
          height: 35,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <img
          src={context.limbaAleasaPic !== undefined ? context.limbaAleasaPic : LANGS[0].icon}
          alt={LANGS[0].label}
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75
            }
          }
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              // selected={option.value === LANGS[0].value}
              onClick={() => {
                setLimbaAleasa(option.value);
                // setLimbaAleasaPic(option.icon);
                changeLimbaAleasaPic(option.icon);
                // console.log('context:', limbaAleasa);
                handleChangeLanguage1(option.value);
              }}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>

      {/* <FormControl
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75
            }
          }
        }}
      >
        <Select
          defaultValue="ro"
          onChange={handleChangeLanguage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              padding: 0,
              width: 44,
              height: 44,
              ...(open && {
                bgcolor: (theme) =>
                  alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
              })
            }
          }}
        >
          <MenuItem value="ro">
            <Box
              component="img"
              alt={LANGS[0].label}
              src={LANGS[0].icon}
              sx={{ width: 28, mr: 2 }}
            />
          </MenuItem>
          <MenuItem value="en">
            <Box
              component="img"
              alt={LANGS[1].label}
              src={LANGS[1].icon}
              sx={{ width: 28, mr: 2 }}
            />
          </MenuItem>
          <MenuItem value="ua">
            <Box
              component="img"
              alt={LANGS[2].label}
              src={LANGS[2].icon}
              sx={{ width: 28, mr: 2 }}
            />
          </MenuItem>
        </Select>
      </FormControl> */}
    </>
  );
}

export default function Login() {
  const { t } = useTranslation(); // Get the t function from useTranslation

  return (
    <RootStyle title={t('Login')}>
      <AuthLayout>
        <LanguageSelector />
        &nbsp;&nbsp;&nbsp;{t('Nu ai cont?')} &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          {t('Creează un cont nou')}
        </Link>
        {/* Add the LanguageSelector component */}{' '}
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5, marginTop: 18 }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {t('Bine ai revenit!')}
        </Typography>
        <img
          src="/static/illustrations/illustration_login2.png"
          alt="login"
          sx={{ width: 50, height: 50 }}
        />
        {/* // mara */}
      </SectionStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('Autentificare')}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {t('Completează detaliile de mai jos.')}
            </Typography>
          </Stack>
          {/* <AuthSocial /> */}
          <LoginForm />
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            {t("Don't have an account?")}&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
              {t('Get started')}
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
