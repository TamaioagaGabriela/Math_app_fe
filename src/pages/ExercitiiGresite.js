import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import { ProductCartWidget } from '../sections/@dashboard/products';
import ExercitiiGresiteDB from '../_mocks_/ExercitiiGresiteDB';

// ----------------------------------------------------------------------

export default function ExercitiiGresite() {
  const { t } = useTranslation();
  return (
    <Page title="Dashboard: Exercitii gresite | Learny">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }} marginTop="-20px">
          {t('Rezolvări incorecte')}
        </Typography>
        <ExercitiiGresiteDB />
      </Container>
    </Page>
  );
}
