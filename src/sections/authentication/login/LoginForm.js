import * as Yup from 'yup';
import React, { useState, useContext, useMemo } from 'react';
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
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import AuthContext from '../../../context/auth-context';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Declare a new state variable
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const context = useContext(AuthContext);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email-ul nu respecta formatul necesar')
      .required('Email is required'),
    parola: Yup.string().required('Password is required')
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
          // console.log(res.status);
          if (res.status !== 200 && res.status !== 201) {
            // console.log('Email gresit, parola gresita sau email neconfirmat');
            setErrorMessage('Email gresit, parola gresita sau email neconfirmat');

            setIsSubmitting(false);
            navigate('/login', { replace: true });
            throw new Error('Failed!');
          }
          return res.json();
        })
        .then((resData) => {
          // console.log('token = ', resData.data.login.token);
          // console.log('userId = ', resData.data.login.userId);
          if (resData.data.login.token) {
            context.login(
              resData.data.login.token,
              resData.data.login.userId,
              resData.data.login.role,
              resData.data.login.clasa,
              resData.data.login.tokenExpiration
            );
            context.userId = resData.data.login.userId;
            context.clasa = resData.data.login.clasa;
            context.token = resData.data.login.token;
            console.log('context', context);
          }
          // console.log('resData = ', resData);
          // console.log('context user id', context.userId);
          // console.log('context clasa id', context.clasa);

          // navigate('/dashboard/app', { replace: true });

          navigate('/dashboard/app', {
            replace: true,
            state: {
              resData
            }
          });
        })
        .catch((err) => {
          // console.log(err);
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
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
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
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
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
