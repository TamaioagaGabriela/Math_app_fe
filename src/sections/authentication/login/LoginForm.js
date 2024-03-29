import * as Yup from 'yup';
import React, { useState, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LoginI18n from '../../../pages/Logini18n'; // Import the LoginI18n component

// component
import Iconify from '../../../components/Iconify';
import AuthContext from '../../../context/auth-context';

// ----------------------------------------------------------------------

function LanguageSelector() {
  const { i18n } = useTranslation(); // Get the i18n object from useTranslation

  const handleChangeLanguage = (event) => {
    const languageCode = event.target.value;
    console.log('Selected language:', languageCode);
    i18n.changeLanguage(languageCode).then(() => {
      console.log('Language changed to:', languageCode);
    });
  };

  return (
    <select onChange={handleChangeLanguage}>
      <option value="ro">Romana</option>
      <option value="en">English</option>
    </select>
  );
}

export default function LoginForm() {
  const { t } = useTranslation(); // Get the t function from useTranslation
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Declare a new state variable
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const context = useContext(AuthContext);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('Email-ul nu respectă formatul necesar'))
      .required(t('Este necesară introducerea emailului')),
    parola: Yup.string().required(t('Este necesară introducerea parolei'))
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      parola: '',
      remember: true,
      userId: '',
      token: '',
      role: '',
      clasa: '',
      tokenExpiration: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const { email, parola } = values;

      const requestBody = {
        query: `
        query Login($email: String!, $parola: String!) {
          login(email: $email, parola: $parola) {
            userId
            token
            role
            clasa
            nume
            email
            tokenExpiration
          }
        }
      `,
        variables: {
          email,
          parola
        }
      };

      fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            const errorMessage = t('Email gresit, parola gresita sau email neconfirmat');
            setErrorMessage(errorMessage);
            setIsSubmitting(false);
            navigate('/login', { replace: true });
            throw new Error('Failed!');
          }
          return res.json();
        })
        .then((resData) => {
          if (resData.data.login.token) {
            context.login(
              resData.data.login.token,
              resData.data.login.userId,
              resData.data.login.role,
              resData.data.login.clasa,
              resData.data.login.nume,
              resData.data.login.email,
              resData.data.login.tokenExpiration
            );
            context.userId = resData.data.login.userId;
            context.clasa = resData.data.login.clasa === '' ? '5' : resData.data.login.clasa;
            context.token = resData.data.login.token;
            context.role = resData.data.login.role;
            context.nume = resData.data.login.nume;
            context.email = resData.data.login.email;
          }

          navigate('/dashboard/app', {
            replace: true,
            state: {
              resData
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <div>
            <p style={{ color: 'red' }}>{errorMessage}</p>
          </div>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t('Adresa de email')}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          {/* {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label={t('Parola')}
            {...getFieldProps('parola')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label={<Typography sx={{ fontSize: 14 }}>{t('Reține parola')}</Typography>}
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            {t('Ai uitat parola?')}
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
