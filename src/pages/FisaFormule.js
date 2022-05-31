// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import { ProductCartWidget } from '../sections/@dashboard/products';

import FisaFormuleDB from '../_mocks_/FisaFormuleDB';

// ----------------------------------------------------------------------

export default function FisaFormule() {
  return (
    <Page title="Dashboard: Fisa formule | Math app">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Fise Formule
        </Typography>

        <FisaFormuleDB />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
