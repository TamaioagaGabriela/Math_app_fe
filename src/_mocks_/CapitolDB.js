import React, { Component } from 'react';
import { AudioCard, VideoCard } from 'material-ui-player';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button, Grid, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import { mockImgCapitol, mockImgSubcapitol } from '../utils/mockImages';
import Markdown from '../sections/@dashboard/teorie/TeorieComponent';

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
      subcapitole: [],
      fiseTeorie: [],
      isActive: true,
      capitol: [],
      subcapitolTeorie: [],
      capitolChosen: false,
      subcapitolChosen: false
    };
  }

  componentDidMount() {
    this.fetchCapitole();
    this.fetchSubcapitole();
    this.fetchFiseTeorie();
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
        // console.log('fetch resData.data:', resData.data);

        this.setState({ capitole: resData.data.capitole });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

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
        // console.log('fetch resData.data:', resData.data);

        this.setState({ subcapitole: resData.data.subcapitole });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  fetchFiseTeorie = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
          teorie{
            _id
            titlu
            descriere
            link_video
            subcapitol_id
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
        console.log('fetch resData.data: teorie', resData.data);

        this.setState({ fiseTeorie: resData.data.teorie });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log('pb la fetch');

        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  // setCapitolList = () => {
  //   this.setState({ capitolList: true });
  // };

  setCapitolChosen = (capitol) => {
    this.setState({ capitolChosen: true });
    this.setCapitol(capitol);
    // console.log('setCapitolChosen', capitol);
  };

  setCapitol = (capitol) => {
    this.setState({ capitol });
    // console.log('setCapitol', capitol);
  };

  setSubcapitolChosen = (subcapitol) => {
    // await this.setState({ subcapitolTeorie: subcapitol });
    this.setState({ subcapitolChosen: true });
    this.setSubcapitolTeorie(subcapitol);
    console.log('setSubcapitolChosen', subcapitol._id);
  };

  setSubcapitolTeorie = (subcapitolTeorie) => {
    this.setState({ subcapitolTeorie });
    console.log('setSubcapitol', subcapitolTeorie);
  };

  // modalCancelHandler = () => {
  //   this.setState({
  //     capitolChosen: false,
  //     capitol: ''
  //   });
  // };

  // modalCancelHandlerCapitol = () => {
  //   this.setState({ capitolChosen: false, capitol: '' });
  // };

  render() {
    console.log('isLoading', this.state.isLoading);
    console.log('capitol:', this.state.capitol);
    console.log('id pt this.state.subcapitolTeorie', this.state.subcapitolTeorie._id);
    console.log('fise teorie', this.state.fiseTeorie);

    const subcapitoleFiltrate = this.state.subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === this.state.capitol._id // '6245fb02354efdf16ef74b01' // this.state.capitol._id
    );
    const fiseTeorieFiltrate = this.state.fiseTeorie.filter(
      (fisaTeorie) => fisaTeorie.subcapitol_id === this.state.subcapitolTeorie._id
    );

    console.log('fiseTeorieFiltrate', fiseTeorieFiltrate);

    return (
      <Grid container spacing={3}>
        {!this.state.capitolChosen &&
          this.state.capitole.map((capitol) => (
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
                    <Button
                      variant="outlined"
                      onClick={() => this.setCapitolChosen(capitol)}
                      // href="/dashboard/subcapitol"
                    >
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
        {/* ---------------------------------------------------------------------------------------------------------- */}
        {/* daca am ales capitolul atunci ajung la subcapitole */}
        {/* ---------------------------------------------------------------------------------------------------------- */}
        {this.state.capitolChosen &&
          !this.state.subcapitolChosen &&
          subcapitoleFiltrate.map((subcapitol) => (
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
                  <CapitolImgStyle alt={subcapitol.titlu} src={mockImgSubcapitol(subcapitol._id)} />
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                  <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle1">{subcapitol.titlu}</Typography>
                  </Link>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                      Capitolul:{' '}
                      {
                        this.state.capitole.find((capitol) => capitol._id === subcapitol.capitol_id)
                          .titlu
                      }
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Button variant="outlined" onClick={() => this.setSubcapitolChosen(subcapitol)}>
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
        {/* ------------------------------------------------------------------------------------------------------------- */}
        {/* daca am ales subcapitolul atunci ajung la teorie */}
        {/* ------------------------------------------------------------------------------------------------------------- */}
        {this.state.capitolChosen &&
          this.state.subcapitolChosen &&
          fiseTeorieFiltrate.map((fisaTeorie) => (
            <Grid key={fisaTeorie._id} item container spacing={2} marginLeft={0.1}>
              <Card>
                <Stack spacing={2} sx={{ p: 3 }}>
                  <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle1">Titlu: {fisaTeorie.titlu}</Typography>
                  </Link>
                  <Typography variant="subtitle1">
                    Capitolul:{' '}
                    {
                      this.state.capitole.find(
                        (capitol) => capitol._id === this.state.subcapitolTeorie.capitol_id
                      ).titlu
                    }
                  </Typography>
                  <Typography variant="subtitle1">
                    Subcapitolul: {this.state.subcapitolTeorie.titlu} {fisaTeorie.link_video}
                  </Typography>
                  <Typography variant="subtitle1">
                    Descriere:
                    <Markdown>{fisaTeorie.descriere}</Markdown>
                  </Typography>
                  <CardMedia component="iframe" title="test" src={fisaTeorie.link_video} />
                </Stack>
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  }
}

export default CapitolDB;
