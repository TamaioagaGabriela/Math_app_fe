import * as Yup from 'yup';
import { useState } from 'react';
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
import AuthContext from '../../../context/auth-context';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Declare a new state variable, which we'll call "count"
  const [authData, setAuthData] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email gresit, parola gresita sau email neconfirmat')
      .required('Email is required'),
    parola: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      parola: '',
      remember: true
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
          console.log(res.status);
          if (res.status !== 200 && res.status !== 201) {
            // errorMessage = 'Email gresit, parola gresita sau email neconfirmat';
            console.log('Email gresit, parola gresita sau email neconfirmat');
            // validateEmail(email);
            throw new Error('Failed!');
            // navigate('/login', { replace: true });
          }
          console.log('aicit');
          return res.json();
        })
        .then((authData) => {
          if (authData.token) {
            console.log('aicit1');
            console.log(authData);
            authData.context.login(
              authData.data.login.token,
              authData.data.login.userId,
              authData.data.login.tokenExpiration,
              authData.data.login.role
            );
            // values.setState({ errorMessage: null });
            navigate('/login', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log('aicit2');
      // navigate('/dashboard/app', { replace: true });
    }
  });

  // function validateEmail(value) {
  //   let error;
  //   if (!value) {
  //     error = 'Required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //     error = 'Invalid email address';
  //   }
  //   return error;
  // }

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      {/* <ErrorMessage name="email" /> */}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
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
