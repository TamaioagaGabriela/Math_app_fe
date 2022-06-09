import React, { Component } from 'react';

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
  FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import {
  mockImgExercitiiCapitole,
  mockImgExercitiiSubcapitole,
  mockImgExercitii
} from '../utils/mockImages';
import Markdown from '../sections/@dashboard/teorie/TeorieComponent';
import { ProductCartWidget } from '../sections/@dashboard/products';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
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

class ExercitiiGresiteDB extends Component {
  static context = AuthContext;

  constructor(props) {
    super(props);

    this.anchorRef = React.createRef();

    this.state = {
      isLoading: false,
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
      veziRezolvareInainte: false,
      raspunsCorect: null,
      btn1: false,
      btn2: false,
      btn3: false,
      btn4: false,
      exercitiiGresiteUser: [],
      exercitiiGresiteUserAll: [],
      exercitiiGresiteCount: 0,
      filtru: 'Toate',
      openSort: null,
      order: 'asc'
    };
  }

  componentDidMount() {
    this.fetchCapitole();
    this.fetchSubcapitole();
    this.fetchExercitii();
    this.fetchExercitiiGresite();
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

  fetchExercitii = () => {
    this.setState({ isLoading: true });
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
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  fetchExercitiiGresite = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
          getExercitiiGresite{
            _id
            exercitiu{
               _id
              subcapitol_id
              cerinta
              rezolvare
              varianta1
              varianta2
              varianta3
              varianta4
              raspuns_corect
              nivel_dif
            }
            user{
              _id
            }
            status
            raspuns_user
            createdAt
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
        this.setExercitiiGresiteUser(resData.data.getExercitiiGresite);
        this.setExercitiiGresiteUserAll(resData.data.getExercitiiGresite);

        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
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
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ eroare: 'Selecteaza o varianta de raspuns!' });
    }
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
    this.setState({ veziRezolvareInainte: false });
  };

  setVeziRezolvareInainte = (exercitiu) => {
    this.setState({ exercitiuChosen: true });
    this.setExercitiuAles(exercitiu);
    this.setState({ veziRezolvareInainte: true });
  };

  setExercitiuAles = (exercitiuAles) => {
    this.setState({ exercitiuAles });
  };

  setSelectedAnswer = (variantaAleasa) => {
    this.setState({ selectedAnswer: variantaAleasa });
  };

  setColorButton = (btn) => {
    if (btn === 'btn1') {
      this.setState({ btn1: true });
      this.setState({ btn2: false });
      this.setState({ btn3: false });
      this.setState({ btn4: false });
    } else if (btn === 'btn2') {
      this.setState({ btn1: false });
      this.setState({ btn2: true });
      this.setState({ btn3: false });
      this.setState({ btn4: false });
    } else if (btn === 'btn3') {
      this.setState({ btn1: false });
      this.setState({ btn2: false });
      this.setState({ btn3: true });
      this.setState({ btn4: false });
    } else if (btn === 'btn4') {
      this.setState({ btn1: false });
      this.setState({ btn2: false });
      this.setState({ btn3: false });
      this.setState({ btn4: true });
    }
  };

  setExercitiiGresiteUser = async (listaRezolvariExercitii) => {
    await this.setState((prevState) => ({
      exercitiiGresiteUser: listaRezolvariExercitii.filter(
        (exercitiuRezolvat) =>
          exercitiuRezolvat.user._id === this.context.userId &&
          exercitiuRezolvat.exercitiu.subcapitol_id === prevState.subcapitolExercitii._id
      )
    }));
  };

  setExercitiiGresiteUserAll = async (listaRezolvariExercitii) => {
    await this.setState((prevState) => ({
      exercitiiGresiteUserAll: listaRezolvariExercitii.filter(
        (exercitiuRezolvat) => exercitiuRezolvat.user._id === this.context.userId
      )
    }));

    await this.setState((prevState) => ({
      exercitiiGresiteCount: listaRezolvariExercitii.filter(
        (exercitiuRezolvat) => exercitiuRezolvat.user._id === this.context.userId
      ).length
    }));
  };

  modalCancelHandlerCapitol = () => {
    this.setState({
      capitolChosen: false,
      capitol: []
    });
  };

  modalCancelHandlerSubcapitol = () => {
    this.setState({ subcapitolChosen: false, subcapitolExercitii: [] });
  };

  modalCancelHandlerExercitiu = () => {
    this.setState({ exercitiuChosen: false, veziRezolvareInainte: false });
    this.setState({ selectedAnswer: null });
    this.setState({ eroare: null });
    this.setState({ rezultatExercitiu: null });
    this.setState({ btn1: false, btn2: false, btn3: false, btn4: false });
    this.setState({ exercitiiGresiteUser: [] });
    this.fetchExercitiiGresite();
  };

  modalCancelHandlerRaspuns = () => {
    this.setState({ exercitiuChosen: false });
    this.setState({ selectedAnswer: null });
    this.setState({ eroare: null });
    this.setState({ rezultatExercitiu: null, raspunsCorect: null });
    this.setState({ btn1: false, btn2: false, btn3: false, btn4: false });
    this.setState({ raspunsTrimis: false });
    this.setState({ exercitiiGresiteUser: [] });
    this.fetchExercitiiGresite();
  };

  modalCancelHandlerVeziRezolvare = () => {
    this.setState({ exercitiuChosen: false });
    this.setState({ selectedAnswer: null });
    this.setState({ eroare: null });
    this.setState({ rezultatExercitiu: null });
    this.setState({ btn1: false, btn2: false, btn3: false, btn4: false });
    this.setState({ raspunsTrimis: false });
    this.setState({ veziRezolvare: false });
    this.setState({ exercitiiGresiteUser: [] });
    this.fetchExercitiiGresite();
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

  getStatusSubcapitol = (subcapitolId) => {
    console.log('this.state.exercitiiGresiteUser', this.state.exercitiiGresiteUserAll);
    // this.fetchExercitiiGresite();
    const exercitiiGresiteFiltrate = this.state.exercitiiGresiteUserAll.filter(
      (exercitiuRezolvat) =>
        exercitiuRezolvat.user._id === this.context.userId &&
        exercitiuRezolvat.exercitiu.subcapitol_id === subcapitolId
    );

    if (exercitiiGresiteFiltrate.length >= 1) {
      return 'Contine exercitii gresite';
    }
    return 'Nu contine exercitii gresite';
  };

  // getStatusCapitol = (capitolId) => {
  //   const subcapitoleFiltrate = this.state.subcapitole.filter(
  //     (subcapitol) => subcapitol.capitol_id === capitolId
  //   );
  //   for (let i = 0; i < subcapitoleFiltrate.length; i += 1) {
  //     const exercitiiGresiteFiltrate = this.state.exercitiiGresiteUserAll.filter(
  //       (exercitiuRezolvat) =>
  //         exercitiuRezolvat.user._id === this.context.userId &&
  //         exercitiuRezolvat.exercitiu.subcapitol_id === subcapitoleFiltrate[i]._id
  //     );
  //     if (exercitiiGresiteFiltrate.length >= 1) {
  //       return 'Contine exercitii gresite';
  //     }
  //   }
  //   return 'Nu contine exercitii gresite';
  // };

  render() {
    console.log(this.state.isLoading);

    console.log('exercitiiGresiteUserAll', this.state.exercitiiGresiteUserAll);
    console.log(this.state.exercitiiGresiteCount);

    const capitoleFiltrate = this.state.capitole.filter(
      (capitol) => capitol.clasa === this.context.clasa
    );

    const subcapitoleFiltrate = this.state.subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === this.state.capitol._id
    );
    const exercitiiFiltrate = this.state.exercitii.filter(
      (exercitiu) => exercitiu.subcapitol_id === this.state.subcapitolExercitii._id
    );

    const exercitiiGresiteFiltrate =
      this.state.filtru === 'Toate'
        ? this.state.exercitiiGresiteUser.filter(
            (exercitiuRezolvat) =>
              exercitiuRezolvat.user._id === this.context.userId &&
              exercitiuRezolvat.exercitiu.subcapitol_id === this.state.subcapitolExercitii._id
          )
        : this.state.exercitiiGresiteUser.filter(
            (exercitiuRezolvat) =>
              exercitiuRezolvat.user._id === this.context.userId &&
              exercitiuRezolvat.exercitiu.subcapitol_id === this.state.subcapitolExercitii._id &&
              exercitiuRezolvat.exercitiu.nivel_dif === this.state.filtru.toString().toLowerCase()
          );

    const exercitiiGresiteFiltrateSortate = this.applySort(exercitiiGresiteFiltrate);
    console.log('exercitiiGresiteFiltrateSortate', exercitiiGresiteFiltrateSortate);

    return (
      <container>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
          marginTop="63px"
        >
          <Button
            variant="outlined"
            style={{ visibility: this.state.capitolChosen ? 'visible' : 'hidden' }}
            onClick={() => this.modalHandleClickInapoi()}
          >
            Inapoi
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
                disableRipple
                variant="outlined"
                endIcon={<Iconify icon="ic:round-filter-list" />}
                onClick={() => this.modalHandleOpenFilter()}
              >
                Filtrare&nbsp;
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
                    Filtre
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
                        Nivel de dificultate
                      </Typography>
                      <RadioGroup>
                        {FILTER_NIVEL_DIFICULTATE_OPTIONS.map((item) => (
                          <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={item}
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
                    Seteaza filtrul
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
                    Sterge filtrul
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
                  disableRipple
                  onClick={() => this.modalHandleOpenSort()}
                  endIcon={
                    <Iconify
                      icon={this.state.openSort ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'}
                    />
                  }
                >
                  Sortare dificultate: &nbsp;
                  <Typography component="span" variant="subtitle2" sx={{ color: '#49BD47' }}>
                    crescator
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
                      {option.label}
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
                    {/* {status && (
                      <Label
                        variant="filled"
                        color={
                          this.getStatusCapitol(capitol._id) === 'Nu contine exercitii gresite'
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
                        {this.getStatusCapitol(capitol._id)}
                      </Label>
                    )} */}
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
                      <Typography variant="subtitle1">{capitol.titlu}</Typography>
                    </Link>
                    <Typography variant="subtitle2">Clasa {capitol.clasa}</Typography>
                  </Stack>
                  <Stack spacing={1} ml={3} mr={3} mb={3}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        this.fetchExercitiiGresite();
                        this.setCapitolChosen(capitol);
                      }}
                    >
                      Accesează subcapitolele
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
                        color={
                          this.getStatusSubcapitol(subcapitol._id) ===
                          'Nu contine exercitii gresite'
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
                        {this.getStatusSubcapitol(subcapitol._id)}
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
                      <Typography variant="subtitle1">{subcapitol.titlu}</Typography>
                    </Link>
                    <Typography variant="subtitle2">
                      Capitolul:{' '}
                      {
                        this.state.capitole.find((capitol) => capitol._id === subcapitol.capitol_id)
                          .titlu
                      }
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
                    <Button
                      variant="outlined"
                      onClick={() => {
                        this.setSubcapitolChosen(subcapitol);
                        this.fetchExercitiiGresite();
                      }}
                    >
                      Exerciții greșite
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
            exercitiiGresiteFiltrate.map((rezolvareExercitiu, index) => (
              // this.state.exercitiiGresiteUser.map((rezolvareExercitiu, index) => (
              <Grid key={rezolvareExercitiu.exercitiu._id} item xs={12} sm={6} md={3}>
                <Card>
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    {status && (
                      <Label
                        variant="filled"
                        color="error"
                        sx={{
                          zIndex: 9,
                          top: 16,
                          right: 16,
                          position: 'absolute',
                          textTransform: 'uppercase'
                        }}
                      >
                        GRESIT
                      </Label>
                    )}
                    <CapitolImgStyle
                      alt={rezolvareExercitiu.exercitiu._id}
                      src={mockImgExercitii(index)}
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
                      <Typography variant="subtitle1">Exercițiul {index + 1}</Typography>
                    </Link>
                    <Typography variant="subtitle2">
                      Capitolul:{' '}
                      {
                        this.state.capitole.find(
                          (capitol) => capitol._id === this.state.subcapitolExercitii.capitol_id
                        ).titlu
                      }
                    </Typography>

                    <Typography variant="subtitle2">
                      Subcapitolul: {this.state.subcapitolExercitii.titlu}
                    </Typography>
                    <Typography variant="subtitle2">
                      Nivel dificultate: {rezolvareExercitiu.exercitiu.nivel_dif}
                    </Typography>
                  </Stack>
                  <Stack spacing={1} ml={3} mr={3} mb={3}>
                    <Button
                      variant="outlined"
                      onClick={() => this.setExercitiuChosen(rezolvareExercitiu.exercitiu)}
                    >
                      Rezolvă Exercițiul
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => this.setVeziRezolvareInainte(rezolvareExercitiu.exercitiu)}
                    >
                      Vezi rezolvare
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* vezi rezolvarea inainte de a rezolva exercitiul */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            this.state.exercitiuChosen &&
            this.state.veziRezolvareInainte &&
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
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiuAles.varianta1 ===
                            this.state.exercitiuAles.raspuns_corect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        A. {this.state.exercitiuAles.varianta1}
                      </Button>
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiuAles.varianta2 ===
                            this.state.exercitiuAles.raspuns_corect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        B. {this.state.exercitiuAles.varianta2}
                      </Button>
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiuAles.varianta3 ===
                            this.state.exercitiuAles.raspuns_corect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        C. {this.state.exercitiuAles.varianta3}
                      </Button>
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiuAles.varianta4 ===
                            this.state.exercitiuAles.raspuns_corect
                              ? 'green'
                              : 'red'
                        }}
                      >
                        D. {this.state.exercitiuAles.varianta4}
                      </Button>
                    </div>
                  </article>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <h2>
                      <b>Rezolvare:</b>
                    </h2>
                    <Typography variant="subtitle1">
                      <Markdown>{this.state.exercitiuAles.rezolvare}</Markdown>
                    </Typography>
                  </Stack>
                </section>
              </Grid>
            )}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales exercitiul ajung la quiz */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.subcapitolChosen &&
            this.state.exercitiuChosen &&
            !this.state.veziRezolvareInainte &&
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
                        A. {this.state.exercitiuAles.varianta1}
                      </Button>
                      <Button
                        className={this.state.btn2 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn2');
                          this.setSelectedAnswer(this.state.exercitiuAles.varianta2);
                        }}
                      >
                        B. {this.state.exercitiuAles.varianta2}
                      </Button>
                      <Button
                        className={this.state.btn3 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn3');
                          this.setSelectedAnswer(this.state.exercitiuAles.varianta3);
                        }}
                      >
                        C. {this.state.exercitiuAles.varianta3}
                      </Button>
                      <Button
                        className={this.state.btn4 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn4');
                          this.setSelectedAnswer(this.state.exercitiuAles.varianta4);
                        }}
                      >
                        D. {this.state.exercitiuAles.varianta4}
                      </Button>
                    </div>
                  </article>
                  {this.state.eroare ? (
                    <p className="exercitiu-err-p">{this.state.eroare}</p>
                  ) : (
                    <p className="exercitiu-err-p" style={{ color: 'white' }}>
                      'Selecteaza o varianta de raspuns!'
                    </p>
                  )}
                  <Button
                    className="next-question"
                    onClick={() => {
                      this.adaugaRezolvareExercitiu();
                    }}
                  >
                    trimite
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
                      <Markdown>{this.state.exercitiuAles.cerinta}</Markdown>{' '}
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
                        A. {this.state.exercitiuAles.varianta1}
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
                        B. {this.state.exercitiuAles.varianta2}
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
                        C. {this.state.exercitiuAles.varianta3}
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
                        D. {this.state.exercitiuAles.varianta4}
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
                    Raspuns: {this.state.rezultatExercitiu}
                  </p>
                  <Button
                    className="next-question"
                    onClick={() => {
                      this.setState({ veziRezolvare: true });
                    }}
                  >
                    Vezi rezolvarea
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
                      <Markdown>{this.state.exercitiuAles.cerinta}</Markdown>{' '}
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
                        A. {this.state.exercitiuAles.varianta1}
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
                        B. {this.state.exercitiuAles.varianta2}
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
                        C. {this.state.exercitiuAles.varianta3}
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
                        D. {this.state.exercitiuAles.varianta4}
                      </Button>
                    </div>
                  </article>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <h2>
                      <b>Rezolvare:</b>
                    </h2>
                    <Typography variant="subtitle1">
                      <Markdown>{this.state.exercitiuAles.rezolvare}</Markdown>
                    </Typography>
                  </Stack>
                </section>
              </Grid>
            )}
        </Grid>
        <ProductCartWidget />
      </container>
    );
  }
}
ExercitiiGresiteDB.contextType = AuthContext;
export default ExercitiiGresiteDB;
