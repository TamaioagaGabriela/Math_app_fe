import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../../../components/Label';
// utils
import { mockImgCapitol } from '../../../utils/mockImages';

// ----------------------------------------------------------------------

const CapitolImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

CapitolItem.propTypes = {
  capitol: PropTypes.object
};

export default function CapitolItem({ capitol }) {
  const { titlu, clasa } = capitol;

  const status = 'Completed';
  const cover = `/static/mock-images/capitole/capp_2.png`;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <CapitolImgStyle alt={titlu} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle1">{titlu}</Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Clasa {clasa}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="outlined" href="#outlined-buttons">
            Subcapitole
          </Button>
          <Button variant="outlined" href="#outlined-buttons">
            Test
          </Button>
        </Stack>
        <Button variant="outlined" href="#outlined-buttons">
          Adauga Subcapitol
        </Button>
      </Stack>
    </Card>
  );
}
