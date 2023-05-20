import React, { useState } from 'react';
import { useFormik } from 'formik';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

import Page from '../components/Page';

import { ProductCartWidget } from '../sections/@dashboard/products';
import ExercitiiGresiteWidget from '../sections/@dashboard/products/ExercitiiGresiteWidget';

import CapitolDB from '../_mocks_/CapitolDB';

// ----------------------------------------------------------------------

export default function Capitol() {
  const [openFilter, setOpenFilter] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Dashboard: Teorie | Learny">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }} marginTop="-20px">
          {t('Teorie')}
        </Typography>

        <CapitolDB />
        {/* <ProductCartWidget /> */}
        <ExercitiiGresiteWidget />
      </Container>
    </Page>
  );
}
