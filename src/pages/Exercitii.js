import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import { ProductCartWidget } from '../sections/@dashboard/products';

import ExercitiiDB from '../_mocks_/ExercitiiDB';

import ExercitiiGresiteWidget from '../sections/@dashboard/products/ExercitiiGresiteWidget';

// ----------------------------------------------------------------------

export default function Exercitii() {
  const { t } = useTranslation();

  return (
    <Page title="Dashboard: Exercitii | Learny">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }} marginTop="-20px">
          {t('Probleme')}
        </Typography>

        <ExercitiiDB />
        {/* <ExercitiiGresiteWidget /> */}
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
