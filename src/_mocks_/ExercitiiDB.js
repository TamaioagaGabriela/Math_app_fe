// eslint-disable-line react/no-unused-state
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Menu,
  Button,
  MenuItem,
  Grid,
  Radio,
  Drawer,
  Divider,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import {
  mockImgExercitiiCapitole,
  mockImgExercitiiSubcapitole,
  mockImgExercitii
} from '../utils/mockImages';
import ModalFisaTeorie from './ModalFiseTeorie';
import Backdrop from '../components/Backdrop/Backdrop';
import Markdown from '../sections/@dashboard/teorie/TeorieComponent';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import ExercitiiGresiteWidget from '../sections/@dashboard/products/ExercitiiGresiteWidget';
import './index.css';

const status = 'Completed';
const cover = `/static/mock-images/capitole/capp_624623ca26d81302468d69ca.png`;

const SORT_BY_OPTIONS = [
  { value: 'nivelDificultateAsc', label: 'Nivel dificultate: crescator' },
  { value: 'nivelDificultateDesc', label: 'Nivel dificultate: descrescator' }
];
const FILTER_NIVEL_DIFICULTATE_OPTIONS = ['Toate', 'Scazut', 'Mediu', 'Ridicat'];

const CapitolImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

class ExercitiiDB extends Component {
  static context = AuthContext;

  static getColorPercentage = (percentage) => {
    if (percentage === 100) return 'success';
    if (percentage < 50) return 'warning';
    return 'info';
  };

  static getColorExercitiu = (status) => {
    if (status === 'CORECT') return 'success';
    if (status === 'GRESIT') return 'error';
    if (status === 'NEREZOLVAT') return 'warning';
    return 'info';
  };

  constructor(props) {
    super(props);

    this.cerintaExercitiuRef = React.createRef();
    this.rezolvareExercitiuRef = React.createRef();
    this.raspunsCorectExercitiuRef = React.createRef();
    this.nivelDificultateExercitiuRef = React.createRef();
    this.varianta1ExercitiuRef = React.createRef();
    this.varianta2ExercitiuRef = React.createRef();
    this.varianta3ExercitiuRef = React.createRef();
    this.varianta4ExercitiuRef = React.createRef();

    this.anchorRef = React.createRef();

    this.state = {
      capitole: [],
      subcapitole: [],
      exercitii: [],
      isActive: true,
      capitol: [],
      subcapitolExercitii: [],
      exercitiuAles: [],
      capitolChosen: false,
      subcapitolChosen: false,
      exercitiuChosen: false,
      openFilter: false,
      selectedAnswer: null,
      eroare: null,
      rezultatExercitiu: null,
      raspunsTrimis: false,
      veziRezolvare: false,
      raspunsCorect: null,
      btn1: false,
      btn2: false,
      btn3: false,
      btn4: false,
      filtru: 'Toate',
      openSort: null,
      order: 'asc',
      adaugaExercitiuChosen: false,
      rezolvariExercitii: []
      // exercitiiGresiteCount: []
    };
  }

  async componentDidMount() {
    await this.fetchCapitole();
    await this.fetchSubcapitole();
    await this.fetchExercitii();
    await this.fetchRezolvariExercitii();
  }

  componentWillUnmount() {
    this.state.isActive = false;
  }

  fetchCapitole = () => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchSubcapitole = () => {
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
        if (this.context.subcapitolId !== undefined && this.context.capitolId !== undefined) {
          this.setSubcapitolChosen(this.context.subcapitolId);
          this.setCapitolChosen(this.context.capitolId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchExercitii = () => {
    const requestBody = {
      query: `
        query{
        exercitii{
            _id
            cerinta
            subcapitol_id
            rezolvare
            varianta1
            varianta2
            varianta3
            varianta4
            raspuns_corect
            nivel_dif
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
        this.setState({ exercitii: resData.data.exercitii });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchRezolvariExercitii = () => {
    const requestBody = {
      query: `
        query{
            rezolvariExercitii{
              _id
              exercitiu{
                _id
                subcapitol_id
                rezolvare
                raspuns_corect
                nivel_dif
              }
              user{
                _id
                email
                username
                parola
                nume
                prenume
              }
              status
              raspuns_user
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
        this.setState({ rezolvariExercitii: resData.data.rezolvariExercitii });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  adaugaRezolvareExercitiu = async () => {
    if (this.state.selectedAnswer) {
      this.setState({ eroare: null });
      this.setState({ rezultatExercitiu: null });

      const requestBody = {
        query: `
        mutation{
            adaugaRezolvareExercitiu(rezolvareExercitiuInput:  {exercitiu_id: "${this.state.exercitiuAles._id}", raspuns_user: "${this.state.selectedAnswer}"}
            ){
              _id
              exercitiu{
                _id
                rezolvare
                raspuns_corect
              }
              status
              raspuns_user
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
          this.setState({ rezultatExercitiu: resData.data.adaugaRezolvareExercitiu.status });
          this.setState({
            raspunsCorect: resData.data.adaugaRezolvareExercitiu.exercitiu.raspuns_corect
          });
          this.setState({ raspunsTrimis: true });
          this.fetchRezolvariExercitii();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ eroare: 'Selecteaza o varianta de raspuns!' });
    }
  };

  getPercentagePerSubcapitol = (subcapitolId) => {
    const exercitiiFiltrate =
      this.state.filtru === 'Toate'
        ? this.state.exercitii.filter((exercitiu) => exercitiu.subcapitol_id === subcapitolId)
        : this.state.exercitii.filter(
            (exercitiu) =>
              exercitiu.subcapitol_id === subcapitolId &&
              exercitiu.nivel_dif === this.state.filtru.toString().toLowerCase()
          );
    const exercitiiFiltrateSortate = this.applySort(exercitiiFiltrate);
    // toate rezolvarile CORECTE ale unui user, filtrate in functie de subcapitol
    const rezolvariExercitiiFiltrate = this.state.rezolvariExercitii.filter(
      (rezolvare) =>
        rezolvare.user._id === this.context.userId &&
        rezolvare.status === 'CORECT' &&
        rezolvare.exercitiu.subcapitol_id === subcapitolId
    );
    const idExercitiiRezolvate = rezolvariExercitiiFiltrate.map((x) => x.exercitiu._id);
    const rezolvariExercitiiDistincte = [...new Set(idExercitiiRezolvate)];
    if (
      Number.isNaN(
        parseInt((100 * rezolvariExercitiiDistincte.length) / exercitiiFiltrateSortate.length, 10)
      )
    ) {
      return 0;
    }
    return parseInt(
      (100 * rezolvariExercitiiDistincte.length) / exercitiiFiltrateSortate.length,
      10
    );
  };

  getPercentagePerCapitol = (capitolId) => {
    const subcapitoleFiltrate = this.state.subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === capitolId
    );

    let suma = 0;

    for (let i = 0; i < subcapitoleFiltrate.length; i += 1) {
      suma += this.getPercentagePerSubcapitol(subcapitoleFiltrate[i]._id);
    }

    if (Number.isNaN(parseInt(suma / subcapitoleFiltrate.length, 10))) return 0;

    return parseInt(suma / subcapitoleFiltrate.length, 10);
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
    this.setSubcapitolExercitii(subcapitol);
  };

  setSubcapitolExercitii = (subcapitolExercitii) => {
    this.setState({ subcapitolExercitii });
  };

  setExercitiuChosen = (exercitiu) => {
    this.setState({ exercitiuChosen: true });
    this.setExercitiuAles(exercitiu);
  };

  setExercitiuAles = (exercitiuAles) => {
    this.setState({ exercitiuAles });
  };

  setSelectedAnswer = (variantaAleasa) => {
    this.setState({ selectedAnswer: variantaAleasa });
  };

  setColorButton = (btn) => {
    if (btn === 'btn1') {
      this.setState({ btn1: true, btn2: false });
      this.setState({ btn3: false, btn4: false });
    } else if (btn === 'btn2') {
      this.setState({ btn1: false, btn2: true });
      this.setState({ btn3: false, btn4: false });
    } else if (btn === 'btn3') {
      this.setState({ btn1: false, btn2: false });
      this.setState({ btn3: true, btn4: false });
    } else if (btn === 'btn4') {
      this.setState({ btn1: false, btn2: false });
      this.setState({ btn3: false, btn4: true });
    }
  };

  setAdaugaExercitiuChosen = () => {
    this.setState({ adaugaExercitiuChosen: true });
  };

  modalCancelHandlerAdaugaExercitiu = () => {
    this.setState({ adaugaExercitiuChosen: false });
    // this.setState({ subcapitolChosen: false });
  };

  modalConfirmHandler = () => {
    const cerinta = this.cerintaExercitiuRef.current.value;
    const rezolvare = this.rezolvareExercitiuRef.current.value;
    const raspunsCorect = this.raspunsCorectExercitiuRef.current.value;
    const nivelDificultate = this.nivelDificultateExercitiuRef.current.value;
    const varianta1 = this.varianta1ExercitiuRef.current.value;
    const varianta2 = this.varianta2ExercitiuRef.current.value;
    const varianta3 = this.varianta3ExercitiuRef.current.value;
    const varianta4 = this.varianta4ExercitiuRef.current.value;

    if (cerinta == null) {
      return;
    }
    const requestBody = {
      query: `
      mutation{
        adaugaExercitiu(exercitiuInput: {
          subcapitol_id: "${this.state.subcapitolExercitii._id}",
          cerinta: "${cerinta}"
          rezolvare:"${rezolvare}",
          varianta1:"${varianta1}",
          varianta2:"${varianta2}",
          varianta3:"${varianta3}",
          varianta4:"${varianta4}",
          raspuns_corect:"${raspunsCorect}",
          nivel_dif:"${nivelDificultate}"
        }){
          _id
          subcapitol_id
          cerinta
          rezolvare
          varianta2
          varianta1
          varianta3
          varianta4
          raspuns_corect
          nivel_dif
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
          const exercitiu = {
            _id: resData.data.adaugaExercitiu._id,
            subcapitol_id: resData.data.adaugaExercitiu.subcapitol_id,
            cerinta: resData.data.adaugaExercitiu.cerinta,
            rezolvare: resData.data.adaugaExercitiu.rezolvare,
            varianta1: resData.data.adaugaExercitiu.varianta1,
            varianta2: resData.data.adaugaExercitiu.varianta2,
            varianta3: resData.data.adaugaExercitiu.varianta3,
            varianta4: resData.data.adaugaExercitiu.varianta4,
            raspuns_corect: resData.data.adaugaExercitiu.raspuns_corect,
            nivel_dif: resData.data.adaugaExercitiu.nivel_dif
          };
          const updatedExercitii = [...prevState.exercitii];
          updatedExercitii.push(exercitiu);
          this.setState({ adaugaExercitiuChosen: false });
          return { exercitii: updatedExercitii };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  modalCancelHandlerCapitol = () => {
    this.setState({
      capitolChosen: false,
      capitol: []
    });
    this.context.capitolId = undefined;
    this.context.subcapitolId = undefined;
  };

  modalCancelHandlerSubcapitol = () => {
    this.setState({ subcapitolChosen: false, subcapitolExercitii: [] });
    this.context.capitolId = undefined;
    this.context.subcapitolId = undefined;
  };

  modalCancelHandlerExercitiu = () => {
    this.setState({ exercitiuChosen: false });
    this.setState({ selectedAnswer: null });
    this.setState({ eroare: null });
    this.setState({ rezultatExercitiu: null });
    this.setState({ btn1: false, btn2: false, btn3: false, btn4: false });
    this.context.capitolId = undefined;
    this.context.subcapitolId = undefined;
  };

  modalCancelHandlerRaspuns = () => {
    this.setState({ exercitiuChosen: false });
    this.setState({ selectedAnswer: null });
    this.setState({ eroare: null });
    this.setState({ rezultatExercitiu: null });
    this.setState({ btn1: false, btn2: false, btn3: false, btn4: false });
    this.setState({ raspunsTrimis: false });
    this.context.capitolId = undefined;
    this.context.subcapitolId = undefined;
  };

  modalCancelHandlerVeziRezolvare = () => {
    this.setState({ exercitiuChosen: false });
    this.setState({ selectedAnswer: null });
    this.setState({ eroare: null });
    this.setState({ rezultatExercitiu: null });
    this.setState({ btn1: false, btn2: false, btn3: false, btn4: false });
    this.setState({ raspunsTrimis: false });
    this.setState({ veziRezolvare: false });
    this.context.capitolId = undefined;
    this.context.subcapitolId = undefined;
  };

  modalHandleClickInapoi = () => {
    if (this.state.capitolChosen && !this.state.subcapitolChosen) {
      this.modalCancelHandlerCapitol();
    } else if (
      this.state.capitolChosen &&
      this.state.subcapitolChosen &&
      !this.state.exercitiuChosen
    ) {
      this.modalCancelHandlerSubcapitol();
    } else if (
      this.state.capitolChosen &&
      this.state.subcapitolChosen &&
      this.state.exercitiuChosen &&
      !this.state.raspunsTrimis
    ) {
      this.modalCancelHandlerExercitiu();
    } else if (
      this.state.capitolChosen &&
      this.state.subcapitolChosen &&
      this.state.exercitiuChosen &&
      this.state.raspunsTrimis &&
      !this.state.veziRezolvare
    ) {
      this.modalCancelHandlerRaspuns();
    } else if (
      this.state.capitolChosen &&
      this.state.subcapitolChosen &&
      this.state.exercitiuChosen &&
      this.state.raspunsTrimis &&
      this.state.veziRezolvare
    ) {
      this.modalCancelHandlerVeziRezolvare();
    }
  };

  modalHandleRequestSort = (value) => {
    if (value === 'nivelDificultateAsc') {
      this.setState({ order: 'asc' });
    } else {
      this.setState({ order: 'desc' });
    }
  };

  modalHandleOpenSort = () => {
    this.setState({ openSort: true });
  };

  modalHandleCloseSort = () => {
    this.setState({ openSort: null });
  };

  modalHandleOpenFilter = () => {
    this.setState({ openFilter: true });
  };

  modalHandleCloseFilter = () => {
    this.setState({ openFilter: false });
  };

  modalHandleResetFilter = () => {
    this.setState({ openFilter: false });
    this.setState({ filtru: 'Toate' });
  };

  applySort = (exercitiiFiltrate) => {
    const stabilizedThis = exercitiiFiltrate;

    let sorted = [];

    if (this.state.order === 'asc') {
      sorted = stabilizedThis.sort((a, b) => {
        if (
          (a.nivel_dif === 'ridicat' && b.nivel_dif === 'mediu') ||
          (a.nivel_dif === 'mediu' && b.nivel_dif === 'scazut')
        ) {
          return 1;
        }
        return -1;
      });
    } else if (this.state.order === 'desc') {
      sorted = stabilizedThis.sort((a, b) => {
        if (
          (a.nivel_dif === 'ridicat' && b.nivel_dif === 'mediu') ||
          (a.nivel_dif === 'mediu' && b.nivel_dif === 'scazut')
        ) {
          return -1;
        }
        return 1;
      });
    }
    return sorted;
  };

  getStatusExercitiu = (exercitiuId) => {
    const corect = this.state.rezolvariExercitii.find(
      (rezolvare) =>
        rezolvare.exercitiu._id === exercitiuId &&
        rezolvare.status === 'CORECT' &&
        rezolvare.user._id === this.context.userId
    );
    if (corect) {
      return corect.status;
    }
    const gresit = this.state.rezolvariExercitii.find(
      (rezolvare) =>
        rezolvare.exercitiu._id === exercitiuId &&
        rezolvare.status === 'GRESIT' &&
        rezolvare.user._id === this.context.userId
    );
    if (gresit) {
      return gresit.status;
    }
    return 'NEREZOLVAT';
  };

  render() {
    const { t } = this.props;

    const capitoleFiltrate = this.state.capitole.filter(
      (capitol) => capitol.clasa === this.context.clasa
    );

    const subcapitoleFiltrate = this.state.subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === this.state.capitol._id
    );

    const exercitiiFiltrate =
      this.state.filtru === 'Toate'
        ? this.state.exercitii.filter(
            (exercitiu) => exercitiu.subcapitol_id === this.state.subcapitolExercitii._id
          )
        : this.state.exercitii.filter(
            (exercitiu) =>
              exercitiu.subcapitol_id === this.state.subcapitolExercitii._id &&
              exercitiu.nivel_dif === this.state.filtru.toString().toLowerCase()
          );

    const exercitiiFiltrateSortate = this.applySort(exercitiiFiltrate);

    return (
      <container>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
          marginTop="64px"
        >
          <Button
            variant="outlined"
            style={{ visibility: this.state.capitolChosen ? 'visible' : 'hidden' }}
            onClick={() => this.modalHandleClickInapoi()}
          >
            {t('Înapoi')}
          </Button>
          {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
          {/* sortare si filtrare exercitii */}
          {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
          {this.state.capitolChosen && this.state.subcapitolChosen && !this.state.exercitiuChosen && (
            <Stack
              direction="row"
              spacing={1}
              flexShrink={0}
              sx={{ my: 1 }}
              justifyContent="flex-end"
            >
              {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
              {/* Filtrare exercitii */}
              {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
              <Button
                variant="outlined"
                style={{
                  display:
                    this.state.capitolChosen &&
                    this.state.subcapitolChosen &&
                    !this.state.exercitiuChosen &&
                    this.context.role === 'Profesor'
                      ? 'inline'
                      : 'none'
                }}
                onClick={() => {
                  this.setAdaugaExercitiuChosen();
                }}
              >
                {t('Adaugă Probleme')}
              </Button>
              <Button
                disableRipple
                variant="outlined"
                endIcon={<Iconify icon="ic:round-filter-list" />}
                onClick={() => this.modalHandleOpenFilter()}
              >
                {t('Filtrare')}&nbsp;
              </Button>
              <Drawer
                anchor="right"
                open={Boolean(this.state.openFilter)}
                onClose={() => this.modalHandleCloseFilter()}
                PaperProps={{
                  sx: { width: 280, border: 'none', overflow: 'hidden' }
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ px: 1, py: 2 }}
                >
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    {t('Filtre')}
                  </Typography>
                  <IconButton onClick={() => this.modalHandleCloseFilter()}>
                    <Iconify icon="eva:close-fill" width={20} height={20} />
                  </IconButton>
                </Stack>
                <Divider />
                <Scrollbar>
                  <Stack spacing={3} sx={{ p: 3 }}>
                    <div>
                      <Typography variant="subtitle1" gutterBottom>
                        {t('Nivel de dificultate')}
                      </Typography>
                      <RadioGroup>
                        {FILTER_NIVEL_DIFICULTATE_OPTIONS.map((item) => (
                          <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={t(item)}
                            onClick={() => this.setState({ filtru: item })}
                          />
                        ))}
                      </RadioGroup>
                    </div>
                  </Stack>
                </Scrollbar>
                <Box sx={{ p: 3 }}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="outlined"
                    onClick={() => {
                      this.modalHandleCloseFilter();
                    }}
                  >
                    {t('Setează filtrul')}
                  </Button>
                  &nbsp;
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="outlined"
                    onClick={() => this.modalHandleResetFilter()}
                    startIcon={<Iconify icon="ic:round-clear-all" />}
                  >
                    {t('șterge filtrul')}
                  </Button>
                </Box>
              </Drawer>
              {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
              {/* Sortare exercitii */}
              {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
              <>
                <Button
                  // color="inherit"
                  ref={this.anchorRef}
                  variant="outlined"
                  sx={{ width: '280px !important' }}
                  disableRipple
                  onClick={() => this.modalHandleOpenSort()}
                  endIcon={
                    <Iconify
                      icon={this.state.openSort ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'}
                    />
                  }
                >
                  {t('Sortare dificultate')}: &nbsp;
                  <Typography component="span" variant="subtitle2" sx={{ color: '#49BD47' }}>
                    {this.state.order === 'asc' ? t('Crescător') : t('Descrescător')}
                  </Typography>
                </Button>
                <Menu
                  keepMounted
                  anchorEl={this.anchorRef.current}
                  open={Boolean(this.state.openSort)}
                  onClose={() => this.modalHandleCloseSort()}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  {SORT_BY_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      // selected={option.value === 'newest'}
                      onClick={() => {
                        this.modalHandleRequestSort(option.value);
                        this.modalHandleCloseSort();
                      }}
                      sx={{ typography: 'body2' }}
                    >
                      {t(option.label)}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            </Stack>
          )}
        </Stack>

        <Grid container spacing={3}>
          {!this.state.capitolChosen &&
            capitoleFiltrate.map((capitol, index) => (
              <Grid key={capitol._id} item xs={12} sm={6} md={3}>
                <Card>
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    {status && (
                      <Label
                        variant="filled"
                        color={ExercitiiDB.getColorPercentage(
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
                    <CapitolImgStyle alt={capitol.titlu} src={mockImgExercitiiCapitole(index)} />
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
                  <Stack spacing={1} ml={3} mr={3} mb={3}>
                    <Button variant="outlined" onClick={() => this.setCapitolChosen(capitol)}>
                      {t('Accesează subcapitolele')}
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
            subcapitoleFiltrate.map((subcapitol, index) => (
              <Grid key={subcapitol._id} item xs={12} sm={6} md={3}>
                <Card>
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    {status && (
                      <Label
                        variant="filled"
                        color={ExercitiiDB.getColorPercentage(
                          this.getPercentagePerSubcapitol(subcapitol._id)
                        )}
                        sx={{
                          zIndex: 9,
                          top: 16,
                          right: 16,
                          position: 'absolute',
                          textTransform: 'uppercase'
                        }}
                      >
                        {this.getPercentagePerSubcapitol(subcapitol._id) === 100
                          ? t('Complet')
                          : `${this.getPercentagePerSubcapitol(subcapitol._id)} %`}
                      </Label>
                    )}
                    <CapitolImgStyle
                      alt={subcapitol.titlu}
                      src={mockImgExercitiiSubcapitole(index)}
                    />
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
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Button variant="outlined" onClick={() => this.setSubcapitolChosen(subcapitol)}>
                      {t('Probleme')}
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales subcapitolul atunci ajung la exercitii */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            !this.state.exercitiuChosen &&
            exercitiiFiltrate.map((exercitiu, index) => (
              <Grid key={exercitiu._id} item xs={12} sm={6} md={3}>
                <Card>
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    {status && (
                      <Label
                        variant="filled"
                        color={ExercitiiDB.getColorExercitiu(
                          this.getStatusExercitiu(exercitiu._id)
                        )}
                        sx={{
                          zIndex: 9,
                          top: 16,
                          right: 16,
                          position: 'absolute',
                          textTransform: 'uppercase'
                        }}
                      >
                        {t(this.getStatusExercitiu(exercitiu._id))}
                      </Label>
                    )}
                    <CapitolImgStyle alt={exercitiu._id} src={mockImgExercitii(index)} />
                  </Box>

                  <Stack
                    spacing={2}
                    sx={{ p: 3 }}
                    alignItems="flex-start"
                    justifyContent="space-between"
                    minHeight="135px"
                  >
                    <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                      <Typography variant="subtitle1">
                        {t('Exercițiul')} {index + 1}
                      </Typography>
                    </Link>
                    <Typography variant="subtitle2">
                      {t('Capitolul')}:{' '}
                      {t(
                        this.state.capitole.find(
                          (capitol) => capitol._id === this.state.subcapitolExercitii.capitol_id
                        ).titlu
                      )}
                    </Typography>
                    <Typography variant="subtitle2">
                      {t('Subcapitolul')}: {t(this.state.subcapitolExercitii.titlu)}
                    </Typography>
                    <Typography variant="subtitle2">
                      {t('Nivel dificultate')}: {t(exercitiu.nivel_dif)}
                    </Typography>
                  </Stack>
                  <Stack spacing={1} ml={3} mr={3} mb={3}>
                    <Button
                      variant="outlined"
                      minWidth="530px"
                      onClick={() => this.setExercitiuChosen(exercitiu)}
                    >
                      {t('Rezolvă Exercițiul')}
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales exercitiul ajung la quiz */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            this.state.exercitiuChosen &&
            !this.state.raspunsTrimis && (
              <Grid
                key={this.state.exercitiuAles._id}
                item
                container
                spacing={2}
                marginLeft={0.1}
                marginTop={-9}
              >
                <section className="quiz">
                  <article className="container">
                    <h2>
                      {' '}
                      <Markdown>{this.state.exercitiuAles.cerinta}</Markdown>{' '}
                    </h2>
                    <div className="btn-container">
                      <Button
                        className={this.state.btn1 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn1');
                          this.setSelectedAnswer(this.state.exercitiuAles.varianta1);
                        }}
                      >
                        A. {t(this.state.exercitiuAles.varianta1)}
                      </Button>
                      <Button
                        className={this.state.btn2 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn2');
                          this.setSelectedAnswer(this.state.exercitiuAles.varianta2);
                        }}
                      >
                        B. {t(this.state.exercitiuAles.varianta2)}
                      </Button>
                      <Button
                        className={this.state.btn3 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn3');
                          this.setSelectedAnswer(this.state.exercitiuAles.varianta3);
                        }}
                      >
                        C. {t(this.state.exercitiuAles.varianta3)}
                      </Button>
                      <Button
                        className={this.state.btn4 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn4');
                          this.setSelectedAnswer(this.state.exercitiuAles.varianta4);
                        }}
                      >
                        D. {t(this.state.exercitiuAles.varianta4)}
                      </Button>
                    </div>
                  </article>
                  {this.state.eroare ? (
                    <p className="exercitiu-err-p">{this.state.eroare}</p>
                  ) : (
                    <p className="exercitiu-err-p" style={{ color: 'white' }}>
                      {t('Selecteaza o varianta de raspuns!')}
                    </p>
                  )}
                  <Button
                    className="next-question"
                    onClick={() => {
                      this.adaugaRezolvareExercitiu();
                      this.fetchExercitiiGresite();
                    }}
                  >
                    {t('Trimite')}
                  </Button>
                </section>
              </Grid>
            )}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am submitat raspunsul ajung la status + rezolvare */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            this.state.exercitiuChosen &&
            this.state.raspunsTrimis &&
            !this.state.veziRezolvare && (
              <Grid
                key={this.state.exercitiuAles._id}
                item
                container
                spacing={2}
                marginLeft={0.1}
                marginTop={-9}
              >
                <section className="quiz">
                  <article className="container">
                    <h2>
                      {' '}
                      <Markdown>{t(this.state.exercitiuAles.cerinta)}</Markdown>{' '}
                    </h2>
                    <div className="btn-container">
                      <Button
                        className={this.state.btn1 ? 'answer-clicked-btn' : 'answer-btn'}
                        style={{
                          color:
                            this.state.exercitiuAles.varianta1 === this.state.raspunsCorect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        A. {t(this.state.exercitiuAles.varianta1)}
                      </Button>
                      <Button
                        className={this.state.btn2 ? 'answer-clicked-btn' : 'answer-btn'}
                        style={{
                          color:
                            this.state.exercitiuAles.varianta2 === this.state.raspunsCorect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        B. {t(this.state.exercitiuAles.varianta2)}
                      </Button>
                      <Button
                        className={this.state.btn3 ? 'answer-clicked-btn' : 'answer-btn'}
                        style={{
                          color:
                            this.state.exercitiuAles.varianta3 === this.state.raspunsCorect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        C. {t(this.state.exercitiuAles.varianta3)}
                      </Button>
                      <Button
                        className={this.state.btn4 ? 'answer-clicked-btn' : 'answer-btn'}
                        style={{
                          color:
                            this.state.exercitiuAles.varianta4 === this.state.raspunsCorect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        D. {t(this.state.exercitiuAles.varianta4)}
                      </Button>
                    </div>
                  </article>
                  <p
                    className="exercitiu-err-p"
                    style={{
                      color: this.state.rezultatExercitiu === 'GRESIT' ? 'red' : 'green',
                      fontSize: '1.1rem'
                    }}
                  >
                    {t('Raspuns')}: {t(this.state.rezultatExercitiu)}
                  </p>
                  <Button
                    className="next-question"
                    onClick={() => {
                      this.setState({ veziRezolvare: true });
                    }}
                  >
                    {t('Vezi rezolvarea')}
                  </Button>
                </section>
              </Grid>
            )}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* vezi rezolvarea */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            this.state.exercitiuChosen &&
            this.state.raspunsTrimis &&
            this.state.veziRezolvare && (
              <Grid
                key={this.state.exercitiuAles._id}
                item
                container
                spacing={2}
                marginLeft={0.1}
                marginTop={-9}
              >
                <section className="quiz">
                  <article className="container">
                    <h2>
                      {' '}
                      <Markdown>{t(this.state.exercitiuAles.cerinta)}</Markdown>{' '}
                    </h2>
                    <div className="btn-container">
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiuAles.varianta1 === this.state.raspunsCorect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        A. {t(this.state.exercitiuAles.varianta1)}
                      </Button>
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiuAles.varianta2 === this.state.raspunsCorect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        B. {t(this.state.exercitiuAles.varianta2)}
                      </Button>
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiuAles.varianta3 === this.state.raspunsCorect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        C. {t(this.state.exercitiuAles.varianta3)}
                      </Button>
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiuAles.varianta4 === this.state.raspunsCorect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        D. {t(this.state.exercitiuAles.varianta4)}
                      </Button>
                    </div>
                  </article>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <h2>
                      <b>{t('Rezolvare')}:</b>
                    </h2>
                    <Typography variant="subtitle1">
                      <Markdown>{t(this.state.exercitiuAles.rezolvare)}</Markdown>
                    </Typography>
                  </Stack>
                </section>
              </Grid>
            )}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales sa adaug un exercitiu atunci ajung la formular */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            !this.state.exercitiuChosen &&
            this.state.adaugaExercitiuChosen && <Backdrop />}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            !this.state.exercitiuChosen &&
            this.state.adaugaExercitiuChosen && (
              <ModalFisaTeorie
                title={t('Adaugă exercitiu')}
                numeButon="Adaugă exercitiu"
                canCancel
                canConfirm
                onCancel={this.modalCancelHandlerAdaugaExercitiu}
                onConfirm={this.modalConfirmHandler}
                confirmText="Confirma"
              >
                <Paper>
                  <TextField
                    id="Cerinta"
                    label={t('Cerinta')}
                    style={{ width: '100%' }}
                    margin="dense"
                    placeholder="Cerinta"
                    inputRef={this.cerintaExercitiuRef}
                    multiline
                  />
                  <TextField
                    id="Rezolvare"
                    label={t('Rezolvare')}
                    style={{ width: '100%', borderColor: 'yellow !important' }}
                    rows={5}
                    margin="dense"
                    placeholder="Rezolvare"
                    inputRef={this.rezolvareExercitiuRef}
                    multiline
                  />
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <TextField
                      id="Raspuns corect"
                      label={t('Raspuns corect')}
                      style={{ width: '49.3%' }}
                      margin="dense"
                      placeholder="Raspuns corect"
                      inputRef={this.raspunsCorectExercitiuRef}
                      multiline
                    />
                    <FormControl sx={{ width: '49.3%' }} margin="dense">
                      <InputLabel id="demo-simple-select-helper-label">
                        {t('Nivel dificultate')}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label={t('Nivel dificultate')}
                        inputRef={this.nivelDificultateExercitiuRef}
                      >
                        <MenuItem value="scazut">{t('Scazut')}</MenuItem>
                        <MenuItem value="mediu">{t('Mediu')}</MenuItem>
                        <MenuItem value="ridicat">{t('Ridicat')}</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <TextField
                      id="Varianta 1"
                      label={t('Varianta 1')}
                      style={{ width: '24%' }}
                      margin="dense"
                      marginRight="100"
                      placeholder="Varianta 1"
                      inputRef={this.varianta1ExercitiuRef}
                      multiline
                    />
                    <TextField
                      id="Varianta 2"
                      label={t('Varianta 2')}
                      style={{ width: '24%' }}
                      margin="dense"
                      placeholder="Varianta 2"
                      inputRef={this.varianta2ExercitiuRef}
                      multiline
                    />

                    <TextField
                      id="Varianta 3"
                      label={t('Varianta 3')}
                      style={{ width: '24%' }}
                      margin="dense"
                      placeholder="Varianta 3"
                      inputRef={this.varianta3ExercitiuRef}
                      multiline
                    />
                    <TextField
                      id="Varianta 4"
                      label={t('Varianta 4')}
                      style={{ width: '24%' }}
                      margin="dense"
                      placeholder="Varianta 4"
                      inputRef={this.varianta4ExercitiuRef}
                      multiline
                    />
                  </Stack>
                </Paper>
              </ModalFisaTeorie>
            )}
        </Grid>
      </container>
    );
  }
}
ExercitiiDB.contextType = AuthContext;
export default withTranslation()(ExercitiiDB);
