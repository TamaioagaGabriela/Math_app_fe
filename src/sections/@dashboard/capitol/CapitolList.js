import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import CapitolItem from './CapitolItem';

// ----------------------------------------------------------------------

CapitolList.propTypes = {
  capitol: PropTypes.array.isRequired
};

export default function CapitolList({ capitole, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {capitole.map((capitol) => (
        <Grid key={capitol._id} item xs={12} sm={6} md={3}>
          <CapitolItem capitol={capitol} />
        </Grid>
      ))}
    </Grid>
  );
}
