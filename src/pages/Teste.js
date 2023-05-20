import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import { ProductCartWidget } from '../sections/@dashboard/products';

import TesteDB from '../_mocks_/TesteDB';
import ExercitiiGresiteWidget from '../sections/@dashboard/products/ExercitiiGresiteWidget';

// ----------------------------------------------------------------------

export default function Capitol() {
  const { t } = useTranslation();

  return (
    <Page title="Dashboard: Teste | Learny">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }} marginTop="-20px">
          {t('Teste')}
        </Typography>

        <TesteDB />
        <ExercitiiGresiteWidget />
      </Container>
    </Page>
  );
}
