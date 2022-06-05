// material
import { Box, Grid, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppFormule,
  AppTeste,
  AppExercitii,
  AppNewsUpdate,
  AppTeorie,
  AppOrderTimeline,
  AppCurrentVisits,
  AppGraficProgres,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../sections/@dashboard/app';
import AuthContext from '../context/auth-context';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const context = useContext(AuthContext);
  return (
    <Page title="Dashboard | Learny">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography marginTop="-23px" marginBottom="23px" variant="h4">
            Bine ai revenit, {context.nume}!
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppTeorie />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppFormule />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppExercitii />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTeste />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppGraficProgres />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
