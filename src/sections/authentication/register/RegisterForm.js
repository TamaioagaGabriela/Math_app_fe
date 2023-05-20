import * as Yup from 'yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Link,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import fetch from 'node-fetch';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [roleAles, setRoleAles] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const { t } = useTranslation();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, t('Prenume prea scurt!'))
      .max(50, t('Prenume prea lung!'))
      .required(t('Trebuie introdus un prenume')),
    lastName: Yup.string()
      .min(2, t('Nume prea scurt!'))
      .max(50, t('Nume prea lung!'))
      .required(t('Trebuie introdus un nume')),
    email: Yup.string()
      .email(t('Adresa de email nu este validă'))
      .required(t('Trebuie introdus un email')),
    password: Yup.string().required(t('Trebuie introdusă parola')),
    username: Yup.string().required(t('Trebuie ales un username')),
    role: Yup.string().required(t('Trebuie ales un rol'))
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
      clasa: '',
      role: '',
      emailTutore: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const { email, firstName, lastName, password, username, clasa, role, emailTutore } = values;

      setSendingEmail(true);
      // Super interesting to me that you can mess with the upper and lower case
      // of the headers on the fetch call and the world does not explode.
      fetch(`http://localhost:8000/email`, {
        method: 'pOSt',
        headers: {
          aCcePt: 'aPpliCaTIon/JsOn',
          'cOntENt-type': 'applicAtion/JSoN'
        },
        body: JSON.stringify({ email: values.email })
      })
        .then((res) => res.json())
        .then((data) => {
          // Everything has come back successfully, time to update the state to
          // reenable the button and stop the <Spinner>. Also, show a toast with a
          // message from the server to give the user feedback and reset the form
          // so the user can start over if she chooses.
          setSendingEmail(false);
          // console.log('check email');
          // notify.show(data.msg);
          // this.form.reset();
        })
        .catch((err) => console.log(err));

      const requestBody = {
        query: `
        mutation adaugaUser($username: String!, $parola: String!, $nume: String!, $prenume: String!, $email: String!, $emailTutore: String!, $role: String!, $clasa: String!) {
          adaugaUser(userInput: {
            username: $username
            parola: $parola
            nume: $nume
            prenume: $prenume
            email: $email
            email_tutore: $emailTutore
            role: $role
            clasa: $clasa
          }){
            _id
            username
            nume
            prenume
            email
            email_tutore
            role
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
          role,
          clasa
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
            // console.log('Acest username/email deja exista');
            console.log(requestBody);
            setErrorMessage('Acest username/email deja exista');

            setIsSubmitting(false);
            navigate('/register', { replace: true });
            throw new Error('Failed!');
          }
          return res.json();
        })
        .then((resData) => {
          // if (values.email) {
          //   navigate('/login', { replace: true });
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <div>
            <p style={{ color: 'red' }}>{errorMessage}</p>
          </div>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label={t('Prenume')}
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label={t('Nume')}
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label={t('Username')}
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <FormControl
              sx={{ minWidth: 150 }}
              margin="dense"
              error={Boolean(touched.role && errors.role)}
              helperText={touched.username && errors.username}
            >
              <InputLabel id="demo-simple-select-helper-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="role"
                {...getFieldProps('role')}
              >
                <MenuItem value="Profesor" onClick={() => setRoleAles('Profesor')}>
                  {t('Profesor')}
                </MenuItem>
                <MenuItem value="Student" onClick={() => setRoleAles('Student')}>
                  {t('Elev')}
                </MenuItem>
              </Select>
              <FormHelperText
                error={Boolean(touched.role && errors.role)}
                helperText={touched.role && errors.role}
              >
                {touched.role && errors.role}
              </FormHelperText>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }} margin="dense" disabled={roleAles === 'Profesor'}>
              <InputLabel id="demo-simple-select-helper-label">Clasa</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label={t('Clasa')}
                {...getFieldProps('clasa')}
              >
                <MenuItem value="5">{t('Clasa a V-a')}</MenuItem>
                <MenuItem value="6">{t('Clasa a VI-a')}</MenuItem>
                <MenuItem value="7">{t('Clasa a VII-a')}</MenuItem>
                <MenuItem value="8">{t('Clasa a VIII-a')}</MenuItem>
                <MenuItem value="9">{t('Clasa a IX-a')}</MenuItem>
                <MenuItem value="10">{t('Clasa a X-a')}</MenuItem>
                <MenuItem value="11">{t('Clasa a XI-a')}</MenuItem>
                <MenuItem value="12">{t('Clasa a XII-a')}</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t('Adresa de email')}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label={t('Parola')}
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
            label={t('Adresa de email tutore')}
            {...getFieldProps('emailTutore')}
            disabled={roleAles === 'Profesor'}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('Creează cont')}
          </LoadingButton>
        </Stack>
        <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          {t('Prin înregistrare, sunt de acord')} {t('cu')}&nbsp;
          <Link underline="always" color="textPrimary">
            {t('Termenii și Serviciile')},
          </Link>
          &nbsp;{t('precum și cu')}&nbsp;
          <Link underline="always" color="textPrimary">
            {t('Politica de confidențialitate')}
          </Link>
          .
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: 'rgb(45, 153, 255)', mt: 3 }}>
          {sendingEmail ? t('Verifică adresa de email pentru confirmarea contului') : ''}
        </Typography>
      </Form>
    </FormikProvider>
  );
}
