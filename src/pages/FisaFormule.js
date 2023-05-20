// material
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// components
import Page from '../components/Page';

import { ProductCartWidget } from '../sections/@dashboard/products';

import FisaFormuleDB from '../_mocks_/FisaFormuleDB';
import ExercitiiGresiteWidget from '../sections/@dashboard/products/ExercitiiGresiteWidget';

// ----------------------------------------------------------------------

export default function FisaFormule() {
  const { t } = useTranslation();

  return (
    <Page title="Dashboard: Fisa formule | Learny">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }} marginTop="-20px">
          {t('Fișe Formule')}
        </Typography>

        <FisaFormuleDB />
        <ExercitiiGresiteWidget />
      </Container>
    </Page>
  );
}
