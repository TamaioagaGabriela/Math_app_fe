import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import { mockImgSubcapitol } from '../utils/mockImages';

const status = 'Completed';
const cover = `/static/mock-images/subcapitole/subcap_1.png`;

const SubcapitolImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

class SubcapitolDB extends Component {
  static context = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      subcapitole: [],
      capitol: [
        {
          _id: '6245fb02354efdf16ef74b01',
          titlu: 'cap 1',
          clasa: 'a V-a'
        },
        {
          _id: '624623ca26d81302468d69ca',
          titlu: 'cap 2',
          clasa: 'a XI-a'
        },
        {
          _id: '6251a0da7a2c3874f8ba7bf3',
          titlu: 'cap 2',
          clasa: 'a XI-a'
        },
        {
          _id: '6251a1317a2c3874f8ba7bf5',
          titlu: 'cap 2',
          clasa: 'a XI-a'
        },
        {
          _id: '6251a2b37a2c3874f8ba7bf7',
          titlu: 'cap 2',
          clasa: 'XI'
        }
      ],
      isActive: true
    };
  }

  componentDidMount() {
    this.fetchSubcapitole();
  }

  componentWillUnmount() {
    this.state.isActive = false;
  }

  fetchSubcapitole = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
            subcapitole{
                _id
                titlu
                capitol_id
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
        console.log('subcapitol index 1:', resData.data.subcapitole[0]._id);
        this.setState({ isLoading: false });
        this.setState({ subcapitole: resData.data.subcapitole });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    console.log('isLoading subcapitole', this.state.isLoading);
    console.log('subcapitole in render ', this.state.subcapitole);
    console.log('capitol', this.state.capitol);
    console.log(
      'find cap 1: ',
      this.state.capitol.find((capitol) => capitol._id === '6245fb02354efdf16ef74b01')
    );
    return (
      <Grid container spacing={3}>
        {this.state.subcapitole.map((subcapitol) => (
          <Grid key={subcapitol._id} item xs={12} sm={6} md={3}>
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
                <SubcapitolImgStyle
                  alt={subcapitol.titlu}
                  src={mockImgSubcapitol(subcapitol._id)}
                />
              </Box>

              <Stack spacing={2} sx={{ p: 3 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                  <Typography variant="subtitle1">{subcapitol.titlu}</Typography>
                </Link>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle1">
                    Capitolul:{' '}
                    {
                      this.state.capitol.find((capitol) => capitol._id === subcapitol.capitol_id)
                        .titlu
                    }
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Button variant="outlined" href="#outlined-buttons">
                    Teorie
                  </Button>
                  <Button variant="outlined" href="#outlined-buttons">
                    Exercitii
                  </Button>
                </Stack>
                <Button variant="outlined" href="#outlined-buttons">
                  Adauga Teorie
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default SubcapitolDB;
