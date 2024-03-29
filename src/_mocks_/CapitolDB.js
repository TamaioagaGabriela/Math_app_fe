import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Link as RouterLink, Navigate } from 'react-router-dom';
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
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import ModalFisaTeorie from './ModalFiseTeorie';

import Backdrop from '../components/Backdrop/Backdrop';
import { mockImgCapitol, mockImgSubcapitol } from '../utils/mockImages';
import Markdown from '../sections/@dashboard/teorie/TeorieComponent';
import TesteDB from './TesteDB';

const status = 'Completed';
const cover = `/static/mock-images/capitole/capp_624623ca26d81302468d69ca.png`;

const CapitolImgStyle = styled('img')({
  top: 15,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

class CapitolDB extends React.Component {
  static context = AuthContext;

  static getColorPercentage = (percentage) => {
    if (percentage === 100) return 'success';
    if (percentage < 50) return 'warning';
    return 'info';
  };

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
      adaugaTeorieChosen: false,
      adaugaCapitolChosen: false,
      adaugaSubcapitolChosen: false,
      accesariFiseTeorie: []
    };
  }

  componentDidMount() {
    this.fetchCapitole();
    this.fetchSubcapitole();
    this.fetchFiseTeorie();
    this.fetchAccesariFiseTeorie();
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
          this.setState({ adaugaSubcapitolChosen: false });
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

          const updatedFiseTeorie = [...prevState.fiseTeorie];
          updatedFiseTeorie.push(fisaTeorie);
          this.setState({ adaugaTeorieChosen: false });

          return { fiseTeorie: updatedFiseTeorie };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchAccesariFiseTeorie = () => {
    const requestBody = {
      query: `
        query{
            accesariTeorie{
              _id
              user {
                _id
                username
                email
                nume
                prenume
              }  
              teorie{
                _id
                subcapitol_id
                titlu
                descriere
                link_video
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
        this.setState({ accesariFiseTeorie: resData.data.accesariTeorie });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  adaugaAccesare = async (subcapitolId) => {
    const fiseTeorieFiltrate = this.state.fiseTeorie.filter(
      (fisaTeorie) => fisaTeorie.subcapitol_id === subcapitolId
    );

    const fisaId = fiseTeorieFiltrate[0]._id;
    const requestBody = {
      query: `
        mutation{
           adaugaAccesareTeorie(accesareTeorieInput: {
              teorie_id:"${fisaId}",
            user_id:"${this.context.userId}"
            }){
            _id
              user{
                _id
              }
              teorie{
                _id
                subcapitol_id
              }
              createdAt
              updatedAt
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
        this.fetchAccesariFiseTeorie();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getPercentagePerCapitol = (capitolId) => {
    const subcapitoleFiltrate = this.state.subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === capitolId
    );
    let count = 0;
    for (let i = 0; i < subcapitoleFiltrate.length; i += 1) {
      // toate accesarile unui user, filtrate in functie de capitol
      const accesariSubcapitole = this.state.accesariFiseTeorie.filter(
        (accesare) =>
          accesare.user._id === this.context.userId &&
          accesare.teorie.subcapitol_id === subcapitoleFiltrate[i]._id
      );
      if (accesariSubcapitole.length >= 1) count += 1;
    }
    if (Number.isNaN(parseInt((100 * count) / subcapitoleFiltrate.length, 10))) return 0;
    return parseInt((100 * count) / subcapitoleFiltrate.length, 10);
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
    // this.setState({ subcapitolChosen: false });
  };

  modalCancelHandlerAdaugaSubcapitol = () => {
    this.setState({ adaugaSubcapitolChosen: false });
    // this.setState({ capitolChosen: false });
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

    const { t } = this.props;

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
          marginTop="55px"
        >
          <Button
            variant="outlined"
            style={{ visibility: this.state.capitolChosen ? 'visible' : 'hidden' }}
            onClick={() => this.modalHandleClickInapoi()}
          >
            {t('Înapoi')}
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
              style={{
                visibility:
                  !this.state.capitolChosen && this.context.role === 'Profesor'
                    ? 'visible'
                    : 'hidden'
              }}
              onClick={() => this.setAdaugaCapitolChosen()}
            >
              {t('Adaugă capitol')}
            </Button>
            <Button
              variant="outlined"
              style={{
                display:
                  this.state.capitolChosen &&
                  !this.state.subcapitolChosen &&
                  this.context.role === 'Profesor'
                    ? 'inline'
                    : 'none'
              }}
              onClick={() => {
                this.setAdaugaSubcapitolChosen();
              }}
            >
              {t('Adaugă Subcapitol')}
            </Button>
            <Button
              variant="outlined"
              style={{
                display:
                  this.state.subcapitolChosen && this.context.role === 'Profesor'
                    ? 'inline'
                    : 'none'
              }}
              onClick={() => {
                this.setAdaugaTeorieChosen();
              }}
            >
              {t('Adaugă Lecții teoretice')}
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3} minHeight="500px">
          {!this.state.capitolChosen &&
            capitoleFiltrate.map((capitol, index) => (
              <Grid key={capitol._id} item height="500px" xs={12} sm={6} md={3}>
                <Card>
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    {status && (
                      <Label
                        variant="filled"
                        color={CapitolDB.getColorPercentage(
                          this.getPercentagePerCapitol(capitol._id)
                        )}
                        sx={{
                          zIndex: 9,
                          top: 16,
                          right: 16,
                          position: 'absolute',
                          textTransform: 'uppercase'
                        }}
                      >
                        {this.getPercentagePerCapitol(capitol._id) === 100
                          ? t('Complet')
                          : `${this.getPercentagePerCapitol(capitol._id)} %`}
                      </Label>
                    )}
                    <CapitolImgStyle alt={capitol.titlu} src={mockImgCapitol(index)} />
                  </Box>

                  <Stack
                    spacing={2}
                    sx={{ p: 3 }}
                    alignItems="flex-start"
                    justifyContent="space-between"
                    minHeight="135px"
                  >
                    <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                      <Typography variant="subtitle1">{t(capitol.titlu)}</Typography>
                    </Link>
                    <Typography variant="subtitle2">{t(`Clasa a ${capitol.clasa}-a`)}</Typography>
                  </Stack>
                  <Stack
                    ml={3}
                    mr={3}
                    mb={3}
                    direction="row"
                    alignItems="flex-end"
                    justifyContent="space-between"
                  >
                    <Button variant="outlined" onClick={() => this.setCapitolChosen(capitol)}>
                      {t('Subcapitole')}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        this.context.capitolId = capitol;
                      }}
                    >
                      <Link
                        to="/dashboard/teste"
                        color="inherit"
                        underline="none"
                        component={RouterLink}
                      >
                        {t('Test')}
                      </Link>
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
            // !this.state.adaugaSubcapitolChosen &&
            !this.state.adaugaTeorieChosen &&
            subcapitoleFiltrate.map((subcapitol, index) => (
              <Grid key={subcapitol._id} item xs={12} sm={6} md={3}>
                <Card>
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    {status && (
                      <Label
                        variant="filled"
                        color={
                          this.state.accesariFiseTeorie.filter(
                            (accesare) =>
                              accesare.user._id === this.context.userId &&
                              accesare.teorie.subcapitol_id === subcapitol._id
                          ).length >= 1
                            ? 'info'
                            : 'warning'
                        }
                        sx={{
                          zIndex: 9,
                          top: 16,
                          right: 16,
                          position: 'absolute',
                          textTransform: 'uppercase'
                        }}
                      >
                        {this.state.accesariFiseTeorie.filter(
                          (accesare) =>
                            accesare.user._id === this.context.userId &&
                            accesare.teorie.subcapitol_id === subcapitol._id
                        ).length >= 1
                          ? t('Vizualizat')
                          : t('Nevizualizat')}
                      </Label>
                    )}
                    <CapitolImgStyle alt={subcapitol.titlu} src={mockImgSubcapitol(index)} />
                  </Box>

                  <Stack
                    spacing={2}
                    sx={{ p: 3 }}
                    alignItems="flex-start"
                    justifyContent="space-between"
                    minHeight="135px"
                  >
                    <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                      <Typography variant="subtitle1">{t(subcapitol.titlu)}</Typography>
                    </Link>
                    <Typography variant="subtitle2">
                      {t('Capitolul')}:{' '}
                      {t(
                        this.state.capitole.find((capitol) => capitol._id === subcapitol.capitol_id)
                          .titlu
                      )}
                    </Typography>
                  </Stack>
                  <Stack
                    ml={3}
                    mr={3}
                    mb={3}
                    direction="row"
                    alignItems="flex-end"
                    justifyContent="space-between"
                  >
                    <Button
                      variant="outlined"
                      onClick={() => {
                        this.setSubcapitolChosen(subcapitol);
                        this.adaugaAccesare(subcapitol._id);
                      }}
                    >
                      {t('Lecții teoretice')}
                    </Button>
                    <Link
                      to="/dashboard/exercitii"
                      color="inherit"
                      underline="none"
                      component={RouterLink}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => {
                          this.context.capitolId = this.state.capitol;
                          this.context.subcapitolId = subcapitol;
                        }}
                      >
                        {t('Probleme')}
                      </Button>
                    </Link>
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
                      <Typography variant="h4">
                        <b>{t(fisaTeorie.titlu)}</b>
                      </Typography>
                    </Link>
                    &nbsp;
                    <Typography variant="subtitle1">
                      {t('Capitolul')}:{' '}
                      {t(
                        this.state.capitole.find(
                          (capitol) => capitol._id === this.state.subcapitolTeorie.capitol_id
                        ).titlu
                      )}
                    </Typography>
                    <Typography variant="subtitle1">
                      {t('Subcapitolul')}: {t(this.state.subcapitolTeorie.titlu)}
                    </Typography>
                    {/* <Typography variant="subtitle2">Noțiuni teoretice:</Typography> */}
                    &nbsp;
                    <Markdown>{t(fisaTeorie.descriere)}</Markdown>
                    {/* fisaTeorie.link_video !== null ? */}
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
                title="Adaugă fisa teorie"
                numeButon="Adaugă teorie"
                canCancel
                canConfirm
                onCancel={this.modalCancelHandlerAdaugaTeorie}
                onConfirm={this.modalConfirmHandler}
                confirmText="Confirma"
              >
                <Paper>
                  <TextField
                    id="Titlu"
                    label={t('Titlu')}
                    style={{ width: '100%' }}
                    margin="dense"
                    placeholder="Titlu"
                    inputRef={this.titluTeorieRef}
                    multiline
                  />
                  <TextField
                    id="Link video explicativ"
                    label={t('Link video explicativ')}
                    style={{ width: '100%' }}
                    margin="dense"
                    placeholder="Link video explicativ"
                    inputRef={this.linkVideoTeorieRef}
                    multiline
                  />
                  <TextField
                    id="Descriere"
                    label={t('Descriere')}
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
              title="Adaugă capitol"
              numeButon="Adaugă capitol"
              canCancel
              canConfirm
              onCancel={this.modalCancelHandlerAdaugaCapitol}
              onConfirm={this.modalConfirmHandlerCapitol}
              confirmText="Confirma"
            >
              <Paper>
                <TextField
                  id="Titlu"
                  label={t('Titlu')}
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Titlu"
                  inputRef={this.titluCapitolRef}
                  multiline
                />
                <FormControl sx={{ minWidth: 150 }} margin="dense">
                  <InputLabel id="demo-simple-select-helper-label">Clasa</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={clasa}
                    label="Clasa"
                    inputRef={this.clasaCapitolRef}
                  >
                    <MenuItem value={5}>{t('Clasa a V-a')}</MenuItem>
                    <MenuItem value={6}>{t('Clasa a VI-a')}</MenuItem>
                    <MenuItem value={7}>{t('Clasa a VII-a')}</MenuItem>
                    <MenuItem value={8}>{t('Clasa a VIII-a')}</MenuItem>
                    <MenuItem value={9}>{t('Clasa a IX-a')}</MenuItem>
                    <MenuItem value={10}>{t('Clasa a X-a')}</MenuItem>
                    <MenuItem value={11}>{t('Clasa a XI-a')}</MenuItem>
                    <MenuItem value={12}>{t('Clasa a XII-a')}</MenuItem>
                  </Select>
                </FormControl>
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
                title={t('Adaugă subcapitol')}
                numeButon="Adaugă"
                canCancel
                canConfirm
                onCancel={this.modalCancelHandlerAdaugaSubcapitol}
                onConfirm={this.modalConfirmHandlerSubcapitol}
                confirmText="Confirma"
              >
                <Paper>
                  <TextField
                    id="Titlu"
                    label={t('Titlu')}
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

export default withTranslation()(CapitolDB);
