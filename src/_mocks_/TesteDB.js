import React, { Component } from 'react';

import { Link as RouterLink, Navigate } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button, Grid } from '@mui/material';
import Icon from '@mui/material/Icon';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import { mockImgCapitol, mockImgSubcapitol } from '../utils/mockImages';
import Markdown from '../sections/@dashboard/teorie/TeorieComponent';
import './index.css';
import {
  ProductSort,
  ProductCartWidget,
  ProductFilterSidebar
} from '../sections/@dashboard/products';

const status = 'Completed';
const cover = `/static/mock-images/capitole/capp_624623ca26d81302468d69ca.png`;

const CapitolImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

class TesteDB extends Component {
  static context = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      capitole: [],
      teste: [],
      isActive: true,
      capitol: [],
      testCapitol: [],
      capitolChosen: false,
      testChosen: false,
      exercitii: [],
      exercitiiTest: [],
      raspunsuriTestByUser: [],
      raspunsuriCorecte: [],
      exercitiu1: null,
      exercitiu2: null,
      exercitiu3: null,
      exercitiu4: null,
      exercitiu5: null,
      exercitiu6: null,
      exercitiu7: null,
      exercitiu8: null,
      exercitiu9: null,
      nrIntrebare: -1,
      selectedAnswer: null,
      eroare: null,
      testTrimis: false,
      punctajTest: 0,
      veziRezolvare: false
      // raspunsSelectat1: null,
      // raspunsSelectat2: null,
      // raspunsSelectat3: null,
      // raspunsSelectat4: null,
      // raspunsSelectat5: null,
      // raspunsSelectat6: null,
      // raspunsSelectat7: null,
      // raspunsSelectat8: null,
      // raspunsSelectat9: null
    };
  }

  componentDidMount() {
    this.fetchCapitole();
    this.fetchTeste();
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
        // console.log('fetch resData.data:', resData.data);

        this.setState({ capitole: resData.data.capitole });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  fetchTeste = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
            teste{
                _id
                capitol_id
                exercitiu1_id
                exercitiu2_id
                exercitiu3_id
                exercitiu4_id
                exercitiu5_id
                exercitiu6_id
                exercitiu7_id
                exercitiu8_id
                exercitiu9_id
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
        this.setState({ teste: resData.data.teste });
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

  getExercitii = async (test) => {
    this.setState({ testCapitol: test });
    await this.setState({ nrIntrebare: 0 });
    console.log('setTestChosen', test._id);

    console.log('ex1', test.exercitiu1_id);
    console.log('this.state.exercitiu1', this.state.exercitiu1);
    console.log(
      'exercitiu 1',
      this.state.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu1_id)
    );

    await this.setState((prevState) => ({
      exercitiu1: prevState.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu1_id)
    }));
    await this.setState((prevState) => ({
      exercitiu2: prevState.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu2_id)
    }));
    await this.setState((prevState) => ({
      exercitiu3: prevState.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu3_id)
    }));
    await this.setState((prevState) => ({
      exercitiu4: prevState.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu4_id)
    }));
    await this.setState((prevState) => ({
      exercitiu5: prevState.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu5_id)
    }));
    await this.setState((prevState) => ({
      exercitiu6: prevState.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu6_id)
    }));
    await this.setState((prevState) => ({
      exercitiu7: prevState.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu7_id)
    }));
    await this.setState((prevState) => ({
      exercitiu8: prevState.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu8_id)
    }));
    await this.setState((prevState) => ({
      exercitiu9: prevState.exercitii.filter((exercitiu) => exercitiu._id === test.exercitiu9_id)
    }));

    this.state.exercitiiTest.push(
      this.state.exercitiu1,
      this.state.exercitiu2,
      this.state.exercitiu3,
      this.state.exercitiu4,
      this.state.exercitiu5,
      this.state.exercitiu6,
      this.state.exercitiu7,
      this.state.exercitiu8,
      this.state.exercitiu9
    );

    this.setState({ testChosen: true });
  };

  adaugaRaspunsSelectat = async () => {
    if (this.state.selectedAnswer) {
      this.setState({ eroare: null });
      this.state.raspunsuriTestByUser.push(this.state.selectedAnswer);
      this.state.raspunsuriCorecte.push(
        await this.state.exercitiiTest[this.state.nrIntrebare][0].raspuns_corect
      );
      console.log('raspunsuriTest: ', this.state.raspunsuriTestByUser);
      console.log('raspunsuriCorecte: ', this.state.raspunsuriCorecte);

      if (this.state.nrIntrebare === 8) {
        this.adaugaRezolvareTest();
      } else {
        this.setState({ selectedAnswer: null });
        this.setState({ btn1: false, btn2: false, btn3: false, btn4: false });
        this.setState((prevState) => ({ nrIntrebare: prevState.nrIntrebare + 1 }));
      }
    } else {
      this.setState({ eroare: 'Selecteaza o varianta de raspuns!' });
    }
  };

  adaugaRezolvareTest = async () => {
    console.log('test id ', this.state.testCapitol._id);
    console.log('raspunsuriTest: ', this.state.raspunsuriTestByUser);
    const requestBody = {
      query: `
          mutation{
              adaugaRezolvareTest(rezolvareTestInput:  {test_id: "${this.state.testCapitol._id}", raspunsuri_user: "${this.state.raspunsuriTestByUser}"}
              ){
                _id
                punctaj
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
        this.setState({ punctajTest: resData.data.adaugaRezolvareTest.punctaj });

        this.setState({ testTrimis: true });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ selectedAnswer: null });
    this.setState({ btn1: false, btn2: false, btn3: false, btn4: false });
    // this.setState((prevState) => ({ nrIntrebare: prevState.nrIntrebare + 1 }));
  };

  setCapitolChosen = (capitol) => {
    this.setState({ capitolChosen: true });
    this.setCapitol(capitol);
  };

  setCapitol = (capitol) => {
    this.setState({ capitol });
  };

  setSelectedAnswer = (selectedAnswer) => {
    this.setState({ selectedAnswer });
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
    console.log(this.state.isLoading);
    console.log('testCapitol', this.state.testCapitol);
    this.setState({
      capitolChosen: false,
      capitol: []
    });
  };

  modalCancelHandlerTest = () => {
    this.setState({ testChosen: false, testCapitol: [], exercitiiTest: [] });
    this.setState({ selectedAnswer: null, eroare: null });
    this.setState({ btn1: false, btn2: false, btn3: false, btn4: false });
    this.setState({ raspunsuriTestByUser: [] });
    this.setState({ raspunsuriCorecte: [] });
    console.log(this.state.raspunsuriTestByUser);
  };

  modalHandleClickInapoi = () => {
    if (this.state.capitolChosen && !this.state.testChosen) {
      this.modalCancelHandlerCapitol();
    } else if (this.state.capitolChosen && this.state.testChosen) {
      this.modalCancelHandlerTest();
    }
  };

  render() {
    const testeFiltrate = this.state.teste.filter(
      (test) => test.capitol_id === this.state.capitol._id
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
                      <Button variant="outlined" onClick={() => this.setCapitolChosen(capitol)}>
                        Teste
                      </Button>
                    </Stack>
                    <Button variant="outlined" href="#outlined-buttons">
                      Adauga test
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          {/* ---------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales capitolul atunci ajung la teste */}
          {/* ---------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            !this.state.testChosen &&
            testeFiltrate.map((test, index) => (
              <Grid key={test._id} item xs={12} sm={6} md={3}>
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
                    <CapitolImgStyle alt={test._id} src={mockImgCapitol(test.capitol_id)} />
                  </Box>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                      <Typography variant="subtitle1">Testul {index + 1}</Typography>
                    </Link>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle1">
                        Capitolul:{' '}
                        {
                          this.state.capitole.find((capitol) => capitol._id === test.capitol_id)
                            .titlu
                        }
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          this.getExercitii(test);
                        }}
                      >
                        Rezolva testul
                      </Button>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am selectat testul, afisez exercitiile */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.testChosen &&
            this.state.nrIntrebare !== -1 &&
            !this.state.testTrimis && (
              <Grid
                key={this.state.exercitiiTest[this.state.nrIntrebare]._id}
                item
                container
                spacing={2}
                marginLeft={0.1}
                marginTop={-9}
              >
                <section className="quiz">
                  <article className="container">
                    <h3>Intrebarea {this.state.nrIntrebare + 1}/9</h3>
                    <h2>
                      {' '}
                      <Markdown>
                        {this.state.exercitiiTest[this.state.nrIntrebare][0].cerinta}
                      </Markdown>{' '}
                    </h2>
                    <div className="btn-container">
                      <Button
                        className={this.state.btn1 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn1');
                          this.setSelectedAnswer(
                            this.state.exercitiiTest[this.state.nrIntrebare][0].varianta1
                          );
                        }}
                      >
                        A. {this.state.exercitiiTest[this.state.nrIntrebare][0].varianta1}
                      </Button>
                      <Button
                        className={this.state.btn2 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn2');
                          this.setSelectedAnswer(
                            this.state.exercitiiTest[this.state.nrIntrebare][0].varianta2
                          );
                        }}
                      >
                        B. {this.state.exercitiiTest[this.state.nrIntrebare][0].varianta2}
                      </Button>
                      <Button
                        className={this.state.btn3 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn3');
                          this.setSelectedAnswer(
                            this.state.exercitiiTest[this.state.nrIntrebare][0].varianta3
                          );
                        }}
                      >
                        C. {this.state.exercitiiTest[this.state.nrIntrebare][0].varianta3}
                      </Button>
                      <Button
                        className={this.state.btn4 ? 'answer-clicked-btn' : 'answer-btn'}
                        onClick={() => {
                          this.setColorButton('btn4');
                          this.setSelectedAnswer(
                            this.state.exercitiiTest[this.state.nrIntrebare][0].varianta4
                          );
                        }}
                      >
                        D. {this.state.exercitiiTest[this.state.nrIntrebare][0].varianta4}
                      </Button>
                    </div>
                  </article>
                  {this.state.eroare ? (
                    <p
                      className="exercitiu-err-p"
                      style={{ visibility: this.state.eroare ? 'visible' : 'hidden', width: '30%' }}
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
                      this.adaugaRaspunsSelectat();
                    }}
                  >
                    {this.state.nrIntrebare === 9 ? 'Trimite' : 'Urmatoarea intrebare'}
                  </Button>
                </section>
              </Grid>
            )}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am submitat raspunsul ajung la status + rezolvare */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.testChosen &&
            this.state.nrIntrebare !== -1 &&
            this.state.testTrimis &&
            !this.state.veziRezolvare &&
            this.state.raspunsuriTestByUser.map((raspunsUser, index) => (
              <Grid key={raspunsUser._id} item container spacing={2} marginLeft={0.1}>
                <Card>
                  <Typography key={raspunsUser._id} variant="subtitle1">
                    {this.state.punctajTest < 50
                      ? 'Mai ai de exersat! Punctajul obtinut este: '
                      : 'Felicitari! Ai obtinut punctajul: '}
                    {this.state.punctajTest}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">Exercitiul {index + 1}</Typography>
                    <ClearRoundedIcon />
                    {raspunsUser === this.state.raspunsuriCorecte[index] ? (
                      <CheckCircleOutlineRoundedIcon color="green" />
                    ) : (
                      <CheckCircleOutlineRoundedIcon color="red" />
                    )}
                    <TaskAltRoundedIcon />
                    <DoneOutlineRoundedIcon />
                    <Button
                      className="next-question"
                      style={{
                        visibility:
                          raspunsUser === this.state.raspunsuriCorecte[index] ? 'hidden' : 'visible'
                      }}
                      onClick={() => {
                        this.setState({ veziRezolvare: true });
                      }}
                    >
                      Vezi rezolvarea
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
        </Grid>
      </container>
    );
  }
}
TesteDB.contextType = AuthContext;
export default TesteDB;
