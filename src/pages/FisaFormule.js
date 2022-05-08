import React, { useState } from 'react';
import { useFormik } from 'formik';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import {
  ProductSort,
  ProductCartWidget,
  ProductFilterSidebar
} from '../sections/@dashboard/products';

import FisaFormuleDB from '../_mocks_/FisaFormuleDB';

// ----------------------------------------------------------------------

export default function FisaFormule() {
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
    <Page title="Dashboard: Fisa formule | Math app">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Teorie
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <FisaFormuleDB />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
