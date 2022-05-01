import React, { useState } from 'react';
import { useFormik } from 'formik';
// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import { ProductCartWidget } from '../sections/@dashboard/products';

import ExercitiiDB from '../_mocks_/ExercitiiDB';

// ----------------------------------------------------------------------

export default function Capitol() {
  return (
    <Page title="Dashboard: Teorie | Math app">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Exercitii
        </Typography>

        <ExercitiiDB />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
