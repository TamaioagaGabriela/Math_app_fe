import React, { useState } from 'react';
import { useFormik } from 'formik';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import { ProductCartWidget } from '../sections/@dashboard/products';

import CapitolDB from '../_mocks_/CapitolDB';

// ----------------------------------------------------------------------

export default function Capitol() {
  const [openFilter, setOpenFilter] = useState(false);

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
    <Page title="Dashboard: Teorie | Math app">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Teorie
        </Typography>

        <CapitolDB />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
