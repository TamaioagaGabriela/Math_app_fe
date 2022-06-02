import React, { Component } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button, Grid, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import ModalFisaTeorie from './ModalFiseTeorie';
import Backdrop from '../components/Backdrop/Backdrop';
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

class FisaFormuleDB extends Component {
  static context = AuthContext;

  constructor(props) {
    super(props);

    this.titluFormuleRef = React.createRef();
    this.descriereFormuleRef = React.createRef();

    this.state = {
      isLoading: false,
      capitole: [],
      subcapitole: [],
      fiseFormule: [],
      isActive: true,
      capitol: [],
      subcapitolFisaFormule: [],
      capitolChosen: false,
      subcapitolChosen: false,
      adaugaFormuleChosen: false,
      accesariFiseFormule: []
    };
  }

  componentDidMount() {
    this.fetchCapitole();
    this.fetchSubcapitole();
    this.fetchFiseFormule();
    this.fetchAccesariFiseFormule();
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
        this.setState({ subcapitole: resData.data.subcapitole });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  fetchFiseFormule = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
          fiseFormule{
            _id
            subcapitol_id
            titlu
            descriere
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
        this.setState({ fiseFormule: resData.data.fiseFormule });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  modalConfirmHandler = () => {
    const titlu = this.titluFormuleRef.current.value;
    const descriere = this.descriereFormuleRef.current.value;
    console.log('adaugaaaa', titlu);

    if (titlu == null) {
      return;
    }
    const requestBody = {
      query: `
      mutation{
        adaugaFisaFormule(fisaFormuleInput: {
          subcapitol_id:"${this.state.subcapitolFisaFormule._id}",
          titlu:"${titlu}",
          descriere: "${descriere}"
        }){
          _id
          subcapitol_id
          titlu
          descriere
        }
      }
      `
    };
    const tkn = this.context.token;
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        this.setState((prevState) => {
          const fisaFormule = {
            _id: resData.data.adaugaFisaFormule._id,
            subcapitol_id: resData.data.adaugaFisaFormule.subcapitol_id,
            titlu: resData.data.adaugaFisaFormule.titlu,
            descriere: resData.data.adaugaFisaFormule.descriere
          };
          console.log('adaugaaaa', fisaFormule);
          const updatedFiseFormule = [...prevState.fiseFormule];
          updatedFiseFormule.push(fisaFormule);
          this.setState({ adaugaFormuleChosen: false });
          return { fiseFormule: updatedFiseFormule };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchAccesariFiseFormule = () => {
    const requestBody = {
      query: `
        query{
            accesariFise{
              _id
              user {
                _id
                username
                email
                nume
                prenume
              }  
              fisa{
                _id
                titlu
                descriere
                subcapitol_id
              }
              createdAt
              updatedAt  
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
        this.setState({ accesariFiseFormule: resData.data.accesariFise });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  adaugaAccesare = async (subcapitolId) => {
    const fiseFormuleFiltrate = this.state.fiseFormule.filter(
      (fisaFormule) => fisaFormule.subcapitol_id === subcapitolId
    );

    const fisaId = fiseFormuleFiltrate[0]._id;
    console.log('fisaID', fisaId);
    console.log('this.context.userId', this.context.userId);
    const requestBody = {
      query: `
        mutation{
          adaugaAccesareFisa(accesareFisaInput: {
            fisa_id:"${fisaId}",
            user_id:"${this.context.userId}"
          }){
          _id
            user{
              _id
            }
            fisa{
              _id
              subcapitol_id
            }
          }
        }
        `
    };
    const tkn = this.context.token;
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData.data.adaugaAccesareFisa._id);
        console.log('accesari dupa adaugare', this.state.accesariFiseFormule);
        //  const updatedAccesari = [...prevState.accesariFiseFormule];
        //  updatedExercitii.push(exercitiu);
        //  console.log('updated/Exercitii', updatedExercitii);
        //  this.setState({ adaugaExercitiuChosen: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setCapitolChosen = (capitol) => {
    this.setState({ capitolChosen: true });
    this.setCapitol(capitol);
  };

  setCapitol = (capitol) => {
    this.setState({ capitol });
  };

  setSubcapitolChosen = (subcapitol) => {
    this.setState({ subcapitolChosen: true });
    this.setSubcapitolFisaFormule(subcapitol);
  };

  setSubcapitolFisaFormule = (subcapitolFisaFormule) => {
    this.setState({ subcapitolFisaFormule });
  };

  setAdaugaFormuleChosen = () => {
    this.setState({ adaugaFormuleChosen: true });
  };

  modalCancelHandlerAdaugaFormule = () => {
    this.setState({ adaugaFormuleChosen: false });
  };

  modalCancelHandlerCapitol = () => {
    this.setState({
      capitolChosen: false,
      capitol: []
    });
  };

  modalCancelHandlerSubcapitol = () => {
    this.setState({ subcapitolChosen: false, subcapitolFisaFormule: [] });
  };

  modalHandleClickInapoi = () => {
    if (this.state.capitolChosen && !this.state.subcapitolChosen) {
      this.modalCancelHandlerCapitol();
    } else if (this.state.capitolChosen && this.state.subcapitolChosen) {
      this.modalCancelHandlerSubcapitol();
    }
  };

  render() {
    console.log('isLoading', this.state.isLoading);

    const subcapitoleFiltrate = this.state.subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === this.state.capitol._id
    );
    const fiseFormuleFiltrate = this.state.fiseFormule.filter(
      (fisaFormule) => fisaFormule.subcapitol_id === this.state.subcapitolFisaFormule._id
    );

    console.log('accesari', this.state.accesariFiseFormule);
    // interesant
    // console.log(
    //   fiseFormuleFiltrate[0] && fiseFormuleFiltrate[0]._id
    //     ? fiseFormuleFiltrate[0]._id
    //     : fiseFormuleFiltrate[0]
    // );
    return (
      <container>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Button
            variant="outlined"
            style={{ visibility: this.state.capitolChosen ? 'visible' : 'hidden' }}
            onClick={() => this.modalHandleClickInapoi()}
          >
            Inapoi
          </Button>
          <Button
            variant="outlined"
            style={{
              display:
                this.state.subcapitolChosen && this.context.role === 'Profesor' ? 'inline' : 'none'
            }}
            onClick={() => {
              this.setAdaugaFormuleChosen();
            }}
          >
            Adauga fisa formule
          </Button>
        </Stack>

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
                      <Button variant="outlined" onClick={() => this.setCapitolChosen(capitol)}>
                        Subcapitole
                      </Button>
                      <Button variant="outlined" href="#outlined-buttons">
                        Test
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
          {/* ---------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales capitolul atunci ajung la subcapitole */}
          {/* ---------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            !this.state.subcapitolChosen &&
            !this.state.adaugaFormuleChosen &&
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
                    <CapitolImgStyle
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
                          this.state.capitole.find(
                            (capitol) => capitol._id === subcapitol.capitol_id
                          ).titlu
                        }
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          this.setSubcapitolChosen(subcapitol);
                          this.adaugaAccesare(subcapitol._id);
                        }}
                      >
                        Fise Formule
                      </Button>
                      <Button variant="outlined" href="#outlined-buttons">
                        Exercitii
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales subcapitolul atunci ajung la fise formule */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            fiseFormuleFiltrate.map((fisaFormule) => (
              <Grid key={fisaFormule._id} item container spacing={2} marginLeft={0.1}>
                <Card>
                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                      <Typography variant="subtitle1">Titlu: {fisaFormule.titlu}</Typography>
                    </Link>
                    <Typography variant="subtitle1">
                      Capitolul:{' '}
                      {
                        this.state.capitole.find(
                          (capitol) => capitol._id === this.state.subcapitolFisaFormule.capitol_id
                        ).titlu
                      }
                    </Typography>
                    <Typography variant="subtitle1">
                      Subcapitolul: {this.state.subcapitolFisaFormule.titlu}
                    </Typography>
                    <Typography variant="subtitle1">
                      Descriere:
                      <Markdown>{fisaFormule.descriere}</Markdown>
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales sa adaug o fisa de teorie atunci ajung la formular */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            this.state.adaugaFormuleChosen && <Backdrop />}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            this.state.adaugaFormuleChosen && (
              <ModalFisaTeorie
                title="Adauga fisa formule"
                numeButon="Adauga fisa formule"
                canCancel
                canConfirm
                onCancel={this.modalCancelHandlerAdaugaFormule}
                onConfirm={this.modalConfirmHandler}
                confirmText="Confirma"
              >
                <Paper>
                  <TextField
                    id="Titlu"
                    label="Titlu"
                    style={{ width: '100%' }}
                    margin="dense"
                    placeholder="Titlu"
                    inputRef={this.titluFormuleRef}
                    multiline
                  />
                  <TextField
                    id="Descriere"
                    label="Descriere"
                    style={{ width: '100%', borderColor: 'yellow !important' }}
                    rows={5}
                    margin="dense"
                    placeholder="Descriere"
                    inputRef={this.descriereFormuleRef}
                    multiline
                  />
                </Paper>
              </ModalFisaTeorie>
            )}
        </Grid>
      </container>
    );
  }
}
FisaFormuleDB.contextType = AuthContext;
export default FisaFormuleDB;
