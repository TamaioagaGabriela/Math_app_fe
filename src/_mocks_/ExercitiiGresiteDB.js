import React, { Component } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import { mockImgCapitol, mockImgSubcapitol } from '../utils/mockImages';
import Markdown from '../sections/@dashboard/teorie/TeorieComponent';
import './index.css';

const status = 'Completed';
const cover = `/static/mock-images/capitole/capp_624623ca26d81302468d69ca.png`;

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
      btn4: false
    };
  }

  componentDidMount() {
    this.fetchCapitole();
    this.fetchSubcapitole();
    this.fetchExercitii();
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
  };

  modalCancelHandlerRaspuns = () => {
    this.setState({ exercitiuChosen: false });
    this.setState({ selectedAnswer: null });
    this.setState({ eroare: null });
    this.setState({ rezultatExercitiu: null, raspunsCorect: null });
    this.setState({ btn1: false });
    this.setState({ btn2: false });
    this.setState({ btn3: false });
    this.setState({ btn4: false });
    this.setState({ raspunsTrimis: false });
  };

  modalCancelHandlerVeziRezolvare = () => {
    this.setState({ exercitiuChosen: false });
    this.setState({ selectedAnswer: null });
    this.setState({ eroare: null });
    this.setState({ rezultatExercitiu: null });
    this.setState({ btn1: false });
    this.setState({ btn2: false });
    this.setState({ btn3: false });
    this.setState({ btn4: false });
    this.setState({ raspunsTrimis: false });
    this.setState({ veziRezolvare: false });
  };

  //   modalCancelHandlerVeziRezolvareInainte = () => {
  //     this.setState({ exercitiuChosen: false });
  //     this.setState({ selectedAnswer: null });
  //     this.setState({ eroare: null });
  //     this.setState({ rezultatExercitiu: null });
  //     this.setState({ btn1: false });
  //     this.setState({ btn2: false });
  //     this.setState({ btn3: false });
  //     this.setState({ btn4: false });
  //     this.setState({ raspunsTrimis: false, veziRezolvare: false, veziRezolvareInainte: false });
  //   };

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

  render() {
    console.log(this.state.isLoading);
    console.log(this.state.openFilter);

    console.log('rezultatExercitiu', this.state.rezultatExercitiu, this.state.eroare);

    const subcapitoleFiltrate = this.state.subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === this.state.capitol._id // '6245fb02354efdf16ef74b01' // this.state.capitol._id
    );
    const exercitiiFiltrate = this.state.exercitii.filter(
      (exercitiu) => exercitiu.subcapitol_id === this.state.subcapitolExercitii._id
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
            <Button variant="outlined">Sortare</Button>
            <Button variant="outlined">filtre</Button>
          </Stack>
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
                        Exercitii
                      </Button>
                    </Stack>
                    <Button variant="outlined" href="#outlined-buttons">
                      Adauga Exercitii
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
                    <CapitolImgStyle alt={exercitiu._id} src={mockImgSubcapitol(exercitiu._id)} />
                  </Box>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                      <Typography variant="subtitle1">Exercitiul {index + 1}</Typography>
                    </Link>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1">
                        Capitolul:{' '}
                        {
                          this.state.capitole.find(
                            (capitol) => capitol._id === this.state.subcapitolExercitii.capitol_id
                          ).titlu
                        }
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle1">
                      Subcapitolul: {this.state.subcapitolExercitii.titlu}
                    </Typography>
                    <Typography variant="subtitle1">
                      Nivel dificultate: {exercitiu.nivel_dif}
                    </Typography>
                    <Stack spacing={1}>
                      <Button variant="outlined" onClick={() => this.setExercitiuChosen(exercitiu)}>
                        Rezolva Exercitiul
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => this.setVeziRezolvareInainte(exercitiu)}
                      >
                        Vezi rezolvare
                      </Button>
                    </Stack>
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
                          console.log('selectedAnswer', this.state.selectedAnswer);
                        }}
                      >
                        D. {this.state.exercitiuAles.varianta4}
                      </Button>
                    </div>
                  </article>
                  {this.state.eroare ? (
                    <p
                      className="exercitiu-err-p"
                      // style={{ visibility: this.state.eroare ? 'visible' : 'hidden', width: '30%' }}
                    >
                      {this.state.eroare}
                    </p>
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
      </container>
    );
  }
}
ExercitiiGresiteDB.contextType = AuthContext;
export default ExercitiiGresiteDB;
