import React from 'react';
// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import { UtilizatorDB } from '../_mocks_/UtilizatorDB';

// ----------------------------------------------------------------------

export default function Utilizator() {
  return (
    <Page title="Dashboard: Detalii Utilizator | Math app">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalii utilizator
        </Typography>
        <UtilizatorDB />
      </Container>
    </Page>
  );
}
