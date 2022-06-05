import React, { useState } from 'react';
import { useFormik } from 'formik';
// material
import { Container, Stack, Typography } from '@mui/material';
import Markdown from '../sections/@dashboard/teorie/TeorieComponent';
// components
import Page from '../components/Page';

import {
  ProductSort,
  ProductCartWidget,
  ProductFilterSidebar
} from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function Teorie() {
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

  const content = `
# Welcome to StackEdit!

---

<br/>

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.

<br/>

# Files

Given a **formula** below

$$
s = ut + \\frac{1}{2}at^{2}
$$

Calculate the value of $s$ when $u = 10\\frac{m}{s}$ and $a = 2\\frac{m}{s^{2}}$ at $t = 1s$
`;
  return (
    <Page title="Dashboard: Teorie | Learny">
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
        <Markdown>{content}</Markdown>
        {/* <ProductList products={PRODUCTS} /> */}
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
