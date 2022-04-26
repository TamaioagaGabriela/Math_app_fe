import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import CapitolItem from '../sections/@dashboard/capitol/CapitolItem';
import AuthContext from '../context/auth-context';
import { mockImgCapitol } from '../utils/mockImages';

const status = 'Completed';
const cover = `/static/mock-images/capitole/capp_624623ca26d81302468d69ca.png`;

const CapitolImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

class CapitolDB extends Component {
  static context = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      capitole: [],
      isActive: true
    };
  }

  componentDidMount() {
    this.fetchCapitole();
  }

  componentWillUnmount() {
    this.state.isActive = false;
  }

  fetchCapitole = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
            capitole{
                _id
                titlu
                clasa
            }
        }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        console.log('fetch resData.data:', resData.data);
        console.log('capitol index 1:', resData.data.capitole[0]._id);
        this.setState({ isLoading: false });
        this.setState({ capitole: resData.data.capitole });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  //   setCapitolList = () => {
  //     this.setState({ capitolList: true });
  //   };

  render() {
    console.log('aiciiiiii', this.state.isLoading);
    console.log('capitole in render ', this.state.capitole);
    return (
      // isLoading: this.state.isLoading,
      // capitole: this.state.capitole
      // // cover: mockImgCapitol()
      <Grid container spacing={3}>
        {this.state.capitole.map((capitol) => (
          <Grid key={capitol._id} item xs={12} sm={6} md={3}>
            {/* <CapitolItem capitol={capitol} /> */}
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
                <CapitolImgStyle alt={capitol.titlu} src={mockImgCapitol(capitol._id)} />
              </Box>

              <Stack spacing={2} sx={{ p: 3 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                  <Typography variant="subtitle1">{capitol.titlu}</Typography>
                </Link>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle1">Clasa {capitol.clasa}</Typography>
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
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default CapitolDB;
