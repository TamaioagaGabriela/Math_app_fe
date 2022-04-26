import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import TeorieItem from './TeorieItem';

// ----------------------------------------------------------------------

TeorieList.propTypes = {
  teorie: PropTypes.array.isRequired
};

export default function TeorieList({ teorii, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {teorii.map((teorie) => (
        <Grid key={teorie.id} item xs={12} sm={6} md={3}>
          <TeorieItem teorie={teorie} />
        </Grid>
      ))}
    </Grid>
  );
}
