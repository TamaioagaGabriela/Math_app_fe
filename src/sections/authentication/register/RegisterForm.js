import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import fetch from 'node-fetch';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  let errorMessage = '';

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
      clasa: '',
      emailTutore: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const { email, firstName, lastName, password, username, clasa, emailTutore } = values;

      const requestBody = {
        query: `
        mutation adaugaUser($username: String!, $parola: String!, $nume: String!, $prenume: String!, $email: String!, $emailTutore: String!, $clasa: String!) {
          adaugaUser(userInput: {
            username: $username
            parola: $parola
            nume: $nume
            prenume: $prenume
            email: $email
            email_tutore: $emailTutore
            clasa: $clasa
          }){
            _id
            username
            nume
            prenume
            email
            email_tutore
            clasa
          }
        }
        `,
        variables: {
          username,
          parola: password,
          nume: lastName,
          prenume: firstName,
          email,
          emailTutore,
          clasa
        }
      };

      console.log(JSON.stringify(requestBody));

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
            errorMessage = 'Acest username/email deja exista';
            navigate('/register', { replace: true });
            // throw new Error('Failed!');
          }
          return res.json();
        })
        .then((resData) => {
          if (values.email) {
            errorMessage = 'Cont creat cu succes';
            navigate('/login', { replace: true });
            // this.setState({ errorMessage: 'Cont creat cu succes' });
            // this.switchModeHandler();
          }
          console.log(resData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {/* <div>
              <p style={{ color: 'red' }}>{errorMessage}</p>
            </div> */}
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Username"
              {...getFieldProps('username')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            <TextField
              fullWidth
              label="Clasa"
              {...getFieldProps('clasa')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            type="email"
            label="Email tutore"
            {...getFieldProps('emailTutore')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
