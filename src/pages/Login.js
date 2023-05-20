import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
// material
import { styled } from '@mui/material/styles';
import {
  Card,
  Stack,
  Link,
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
import AuthSocial from '../sections/authentication/AuthSocial';
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

// ----------------------------------------------------------------------

export function LanguageSelector() {
  const { i18n } = useTranslation(); // Get the i18n object from useTranslation
  const handleChangeLanguage = (event) => {
    console.log('TEST2');

    const languageCode = event.target.value;
    console.log('Event targe', event.target);
    console.log('Selected language:', languageCode);
    i18n.changeLanguage(languageCode).then(() => {
      console.log('Language changed to:', languageCode);
    });
  };

  return (
    // <Select onChange={handleChangeLanguage} sx={{ py: 1, px: 5 }}>
    //   <Typography
    //     textTransform="lowercase"
    //     // fontStyle="italic"
    //     component="span"
    //     variant="subtitle2"
    //     sx={{ color: '#49BD47' }}
    //   >
    //     Alege limba
    //   </Typography>
    //   <option value="ro">Romana</option>
    //   <option value="en">English</option>
    // </Select>

    <FormControl sx={{ minWidth: 110, marginTop: 4 }} margin="dense" size="small">
      <InputLabel id="demo-simple-select-helper-label">Limba</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={Limba}
        label="Limba"
        onChange={handleChangeLanguage}
        sx={{ py: 0.05, px: 0.05 }}
      >
        <MenuItem value="ro">Romana</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
}

export default function Login() {
  const { t } = useTranslation(); // Get the t function from useTranslation

  return (
    <RootStyle title={t('Login')}>
      <AuthLayout>
        {t('Nu ai cont?')} &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          {t('Creează un cont nou')}
        </Link>
        <LanguageSelector />
        {/* Add the LanguageSelector component */}{' '}
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
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
