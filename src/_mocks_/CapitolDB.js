import React, { Component } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Button,
  Grid,
  CardMedia,
  Paper,
  TextField
} from '@mui/material';
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

class CapitolDB extends Component {
  static context = AuthContext;

  constructor(props) {
    super(props);

    this.titluTeorieRef = React.createRef();
    this.descriereTeorieRef = React.createRef();
    this.linkVideoTeorieRef = React.createRef();
    this.titluSubcapitolRef = React.createRef();
    this.titluCapitolRef = React.createRef();
    this.clasaCapitolRef = React.createRef();

    this.state = {
      isLoading: false,
      capitole: [],
      subcapitole: [],
      fiseTeorie: [],
      isActive: true,
      capitol: [],
      subcapitolTeorie: [],
      capitolChosen: false,
      subcapitolChosen: false,
      openFilter: false,
      adaugaTeorieChosen: false,
      adaugaCapitolChosen: false,
      adaugaSubcapitolChosen: false
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
        this.setState({ fiseTeorie: resData.data.teorie });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  modalConfirmHandlerSubcapitol = () => {
    const titlu = this.titluSubcapitolRef.current.value;

    console.log(titlu, this.state.capitol._id);
    if (titlu == null) {
      return;
    }
    const requestBody = {
      query: `
      mutation{
        adaugaSubcapitol(subcapitolInput: {
          capitol_id:"${this.state.capitol._id}",
          titlu: "${titlu}"
        }){
          _id
          capitol_id
          titlu
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
          const subcapitol = {
            _id: resData.data.adaugaSubcapitol._id,
            capitol_id: resData.data.adaugaSubcapitol.capitol_id,
            titlu: resData.data.adaugaSubcapitol.titlu
          };
          const updatedSubcapitole = [...prevState.subcapitole];
          updatedSubcapitole.push(subcapitol);
          console.log('push subcapitol', updatedSubcapitole);
          this.setState({ adaugaSubcapitolChosen: false });
          this.setState({ capitolChosen: false });
          return { subcapitole: updatedSubcapitole };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  modalConfirmHandlerCapitol = () => {
    const titlu = this.titluCapitolRef.current.value;
    const clasa = this.clasaCapitolRef.current.value;

    if (titlu == null) {
      return;
    }
    const requestBody = {
      query: `
        mutation{
          adaugaCapitol(capitolInput: {
            clasa: "${clasa}"
            titlu: "${titlu}"
          }){
            _id
            titlu
            clasa
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
          const capitol = {
            _id: resData.data.adaugaCapitol._id,
            clasa: resData.data.adaugaCapitol.clasa,
            titlu: resData.data.adaugaCapitol.titlu
          };
          // console.log('adaugaaaa', fisaTeorie);
          const updatedCapitole = [...prevState.capitole];
          updatedCapitole.push(capitol);
          this.setState({ adaugaCapitolChosen: false });
          this.setState({ capitolChosen: false });
          return { capitole: updatedCapitole };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  modalConfirmHandler = () => {
    const titlu = this.titluTeorieRef.current.value;
    const descriere = this.descriereTeorieRef.current.value;
    const linkVideo = this.linkVideoTeorieRef.current.value;

    if (descriere == null) {
      return;
    }
    const requestBody = {
      query: `
      mutation{
        adaugaTeorie(teorieInput: {
          titlu:"${titlu}"
          descriere:"${descriere}"
          link_video:"${linkVideo}"
          subcapitol_id:"${this.state.subcapitolTeorie._id}"
        }){
          _id
          subcapitol_id
          titlu
          link_video
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
          const fisaTeorie = {
            _id: resData.data.adaugaTeorie._id,
            subcapitol_id: resData.data.adaugaTeorie.subcapitol_id,
            titlu: resData.data.adaugaTeorie.titlu,
            descriere: resData.data.adaugaTeorie.descriere,
            link_video: resData.data.link_video
          };
          // console.log('adaugaaaa', fisaTeorie);
          const updatedFiseTeorie = [...prevState.fiseTeorie];
          updatedFiseTeorie.push(fisaTeorie);
          this.setState({ adaugaTeorieChosen: false });
          this.setState({ subcapitolChosen: false });
          return { fiseTeorie: updatedFiseTeorie };
        });
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
    this.setSubcapitolTeorie(subcapitol);
  };

  setSubcapitolTeorie = (subcapitolTeorie) => {
    this.setState({ subcapitolTeorie });
  };

  setAdaugaTeorieChosen = () => {
    this.setState({ adaugaTeorieChosen: true });
  };

  setAdaugaCapitolChosen = () => {
    this.setState({ adaugaCapitolChosen: true });
  };

  setAdaugaSubcapitolChosen = () => {
    this.setState({ adaugaSubcapitolChosen: true });
  };

  modalCancelHandlerAdaugaTeorie = () => {
    this.setState({ adaugaTeorieChosen: false });
    this.setState({ subcapitolChosen: false });
  };

  modalCancelHandlerAdaugaSubcapitol = () => {
    this.setState({ adaugaSubcapitolChosen: false });
    this.setState({ capitolChosen: false });
  };

  modalCancelHandlerAdaugaCapitol = () => {
    this.setState({ adaugaCapitolChosen: false });
  };

  modalCancelHandlerCapitol = () => {
    this.setState({
      capitolChosen: false,
      capitol: []
    });
  };

  modalCancelHandlerSubcapitol = () => {
    this.setState({ subcapitolChosen: false, subcapitolTeorie: [] });
  };

  modalHandleClickInapoi = () => {
    if (this.state.capitolChosen && !this.state.subcapitolChosen) {
      this.modalCancelHandlerCapitol();
    } else if (this.state.capitolChosen && this.state.subcapitolChosen) {
      this.modalCancelHandlerSubcapitol();
    }
  };

  render() {
    console.log(this.state.isLoading);
    console.log(this.state.openFilter);
    console.log(this.context);

    const capitoleFiltrate = this.state.capitole.filter(
      (capitol) => capitol.clasa === this.context.clasa
    );
    const subcapitoleFiltrate = this.state.subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === this.state.capitol._id
    );
    const fiseTeorieFiltrate = this.state.fiseTeorie.filter(
      (fisaTeorie) => fisaTeorie.subcapitol_id === this.state.subcapitolTeorie._id
    );

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
          <Stack
            direction="row"
            spacing={1}
            flexShrink={0}
            sx={{ my: 1 }}
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              style={{ visibility: this.state.capitolChosen ? 'hidden' : 'visible' }}
              onClick={() => this.setAdaugaCapitolChosen()}
            >
              Adauga capitol
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {!this.state.capitolChosen &&
            capitoleFiltrate.map((capitol) => (
              <Grid key={capitol._id} item xs={12} sm={6} md={3}>
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
                      <Typography variant="subtitle1">Clasa a {capitol.clasa}-a</Typography>
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
                    <Button
                      variant="outlined"
                      onClick={() => {
                        this.setCapitolChosen(capitol);
                        this.setAdaugaSubcapitolChosen();
                      }}
                    >
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
            !this.state.adaugaSubcapitolChosen &&
            !this.state.adaugaTeorieChosen &&
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
                        onClick={() => this.setSubcapitolChosen(subcapitol)}
                      >
                        Teorie
                      </Button>
                      <Button variant="outlined" href="#outlined-buttons">
                        Exercitii
                      </Button>
                    </Stack>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        this.setSubcapitolChosen(subcapitol);
                        this.setAdaugaTeorieChosen();
                      }}
                    >
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
            !this.state.adaugaSubcapitolChosen &&
            !this.state.adaugaTeorieChosen &&
            fiseTeorieFiltrate.map((fisaTeorie) => (
              <Grid
                key={fisaTeorie._id}
                item
                container
                spacing={2}
                marginLeft={0.1}
                marginTop={0.5}
              >
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
                    <CardMedia
                      sx={{ m: 5, p: 3 }}
                      // sx={{ width: '70%' }}
                      component="iframe"
                      title="Video teorie"
                      src={fisaTeorie.link_video}
                      width="560"
                      height="415"
                      // src="https://www.youtube.com/embed/rywUS-ohqeE"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {/* 
                  <video
                    width="100%"
                    controls
                    controlsList="nodownload"
                    poster="link to your poster image"
                  >
                    {' '}
                    <track default kind="captions" />
                    <source src="https://www.youtube.com/watch?v=DHEOF_rcND8" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video> */}
                  </Stack>
                </Card>
              </Grid>
            ))}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales sa adaug o fisa de teorie atunci ajung la formular */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            this.state.adaugaTeorieChosen && <Backdrop />}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            this.state.adaugaTeorieChosen && (
              <ModalFisaTeorie
                title="Adauga fisa teorie"
                numeButon="Adauga teorie"
                canCancel
                canConfirm
                onCancel={this.modalCancelHandlerAdaugaTeorie}
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
                    inputRef={this.titluTeorieRef}
                    multiline
                  />
                  <TextField
                    id="Link video explicativ"
                    label="Link video explicativ"
                    style={{ width: '100%' }}
                    margin="dense"
                    placeholder="Link video explicativ"
                    inputRef={this.linkVideoTeorieRef}
                    multiline
                  />
                  <TextField
                    id="Descriere"
                    label="Descriere"
                    style={{ width: '100%', borderColor: 'yellow !important' }}
                    rows={5}
                    margin="dense"
                    placeholder="Descriere"
                    inputRef={this.descriereTeorieRef}
                    multiline
                  />
                </Paper>
              </ModalFisaTeorie>
            )}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales sa adaug un capitol atunci ajung la formular */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {!this.state.capitolChosen && this.state.adaugaCapitolChosen && <Backdrop />}
          {!this.state.capitolChosen && this.state.adaugaCapitolChosen && (
            <ModalFisaTeorie
              title="Adauga capitol"
              numeButon="Adauga capitol"
              canCancel
              canConfirm
              onCancel={this.modalCancelHandlerAdaugaCapitol}
              onConfirm={this.modalConfirmHandlerCapitol}
              confirmText="Confirma"
            >
              <Paper>
                <TextField
                  id="Titlu"
                  label="Titlu"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Titlu"
                  inputRef={this.titluCapitolRef}
                  multiline
                />

                <TextField
                  id="Clasa"
                  label="Clasa"
                  style={{ width: '100%', borderColor: 'yellow !important' }}
                  rows={5}
                  margin="dense"
                  placeholder="Clasa"
                  inputRef={this.clasaCapitolRef}
                  multiline
                />
              </Paper>
            </ModalFisaTeorie>
          )}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales sa adaug un subcapitol atunci ajung la formular */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            !this.state.subcapitolChosen &&
            this.state.adaugaSubcapitolChosen && <Backdrop />}
          {this.state.capitolChosen &&
            !this.state.subcapitolChosen &&
            this.state.adaugaSubcapitolChosen && (
              <ModalFisaTeorie
                title="Adauga subcapitol"
                numeButon="Adauga"
                canCancel
                canConfirm
                onCancel={this.modalCancelHandlerAdaugaSubcapitol}
                onConfirm={this.modalConfirmHandlerSubcapitol}
                confirmText="Confirma"
              >
                <Paper>
                  <TextField
                    id="Titlu"
                    label="Titlu"
                    style={{ width: '100%' }}
                    margin="dense"
                    placeholder="Titlu"
                    inputRef={this.titluSubcapitolRef}
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

CapitolDB.contextType = AuthContext;

export default CapitolDB;
