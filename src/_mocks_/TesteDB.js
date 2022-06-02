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
  Container,
  Paper,
  TextField
} from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
// import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
// import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { styled } from '@mui/material/styles';
import ModalFisaTeorie from './ModalFiseTeorie';
import Backdrop from '../components/Backdrop/Backdrop';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import { mockImgCapitol } from '../utils/mockImages';
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

    this.exercitiu1TestRef = React.createRef();
    this.exercitiu2TestRef = React.createRef();
    this.exercitiu3TestRef = React.createRef();
    this.exercitiu4TestRef = React.createRef();
    this.exercitiu5TestRef = React.createRef();
    this.exercitiu6TestRef = React.createRef();
    this.exercitiu7TestRef = React.createRef();
    this.exercitiu8TestRef = React.createRef();
    this.exercitiu9TestRef = React.createRef();

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
      veziRezolvare: false,
      nrExercitiuAles: -1,
      adaugaTestChosen: false
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
      // console.log('raspunsuriTest: ', this.state.raspunsuriTestByUser);
      // console.log('raspunsuriCorecte: ', this.state.raspunsuriCorecte);

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
    // console.log('test id ', this.state.testCapitol._id);
    // console.log('raspunsuriTest: ', this.state.raspunsuriTestByUser);
    // console.log('primul: ', this.state.raspunsuriTestByUser[0]);

    const requestBody = {
      query: `
          mutation{
              adaugaRezolvareTest(rezolvareTestInput:  {test_id: "${this.state.testCapitol._id}", raspunsuri_user: ["${this.state.raspunsuriTestByUser[0]}","${this.state.raspunsuriTestByUser[1]}","${this.state.raspunsuriTestByUser[2]}","${this.state.raspunsuriTestByUser[3]}","${this.state.raspunsuriTestByUser[4]}","${this.state.raspunsuriTestByUser[5]}","${this.state.raspunsuriTestByUser[6]}","${this.state.raspunsuriTestByUser[7]}","${this.state.raspunsuriTestByUser[8]}"]}
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

  setAdaugaTestChosen = () => {
    this.setState({ adaugaTestChosen: true });
  };

  modalCancelHandlerAdaugaTest = () => {
    this.setState({ adaugaTestChosen: false });
    // this.setState({ capitolChosen: false });
  };

  modalConfirmHandler = () => {
    const exercitiu1 = this.exercitiu1TestRef.current.value;
    const exercitiu2 = this.exercitiu2TestRef.current.value;
    const exercitiu3 = this.exercitiu3TestRef.current.value;
    const exercitiu4 = this.exercitiu4TestRef.current.value;
    const exercitiu5 = this.exercitiu5TestRef.current.value;
    const exercitiu6 = this.exercitiu6TestRef.current.value;
    const exercitiu7 = this.exercitiu7TestRef.current.value;
    const exercitiu8 = this.exercitiu8TestRef.current.value;
    const exercitiu9 = this.exercitiu9TestRef.current.value;

    const requestBody = {
      query: `
      mutation{
        adaugaTest(testInput: {
          capitol_id: "${this.state.capitol._id}",
          exercitiu1_id:"${exercitiu1}",
          exercitiu2_id:"${exercitiu2}",
          exercitiu3_id:"${exercitiu3}",
          exercitiu4_id:"${exercitiu4}",
          exercitiu5_id:"${exercitiu5}",
          exercitiu6_id:"${exercitiu6}",
          exercitiu7_id:"${exercitiu7}",
          exercitiu8_id:"${exercitiu8}",
          exercitiu9_id:"${exercitiu9}"
        }){
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
          const test = {
            _id: resData.data.adaugaTest._id,
            capitol_id: resData.data.adaugaTest.capitol_id,
            titlu: resData.data.adaugaExercitiu.titlu,
            descriere: resData.data.adaugaExercitiu.descriere
          };
          const updatedTeste = [...prevState.teste];
          updatedTeste.push(test);
          this.setState({ adaugaTestChosen: false });
          // this.setState({ capitolChosen: false });
          return { teste: updatedTeste };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  modalCancelHandlerCapitol = () => {
    // console.log(this.state.isLoading);
    // console.log('testCapitol', this.state.testCapitol);
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
    this.setState({ nrIntrebare: -1, punctajTest: 0 });
    this.setState({ testTrimis: false });
    // console.log(this.state.raspunsuriTestByUser);
  };

  modalCancelHandlerRezolvareExercitiu = () => {
    this.setState({ veziRezolvare: false });
    this.setState({ nrExercitiuAles: -1 });
  };

  modalHandleClickInapoi = () => {
    if (this.state.capitolChosen && !this.state.testChosen) {
      this.modalCancelHandlerCapitol();
    } else if (this.state.capitolChosen && this.state.testChosen && !this.state.veziRezolvare) {
      this.modalCancelHandlerTest();
    } else if (this.state.capitolChosen && this.state.testChosen && this.state.veziRezolvare) {
      this.modalCancelHandlerRezolvareExercitiu();
    }
  };

  render() {
    const testeFiltrate = this.state.teste.filter(
      (test) => test.capitol_id === this.state.capitol._id
    );

    console.log(this.state.isLoading);

    return (
      <container padding="0">
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
            href="#outlined-buttons"
            style={{
              display:
                this.state.capitolChosen &&
                !this.state.testChosen &&
                this.context.role === 'Profesor'
                  ? 'inline'
                  : 'none'
            }}
            onClick={() => {
              this.setAdaugaTestChosen();
            }}
          >
            Adauga test
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
                        Teste
                      </Button>
                    </Stack>
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
                    {this.state.nrIntrebare === 8 ? 'Trimite' : 'Urmatoarea intrebare'}
                  </Button>
                </section>
              </Grid>
            )}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am apasat trimite ajung la punctajul testului + rezolvare */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.testChosen &&
            this.state.nrIntrebare !== -1 &&
            this.state.testTrimis &&
            this.state.punctajTest &&
            !this.state.veziRezolvare && (
              <Container width="fit-content">
                <Card marginLeft={20}>
                  <Typography variant="subtitle1" margin={2}>
                    {this.state.punctajTest < 50
                      ? 'Mai ai de exersat! Punctajul obtinut este: '
                      : 'Felicitari! Ai obtinut punctajul: '}
                    {this.state.punctajTest} !
                  </Typography>
                </Card>
              </Container>
            )}
          {this.state.capitolChosen &&
            this.state.testChosen &&
            this.state.nrIntrebare !== -1 &&
            this.state.testTrimis &&
            this.state.punctajTest &&
            !this.state.veziRezolvare &&
            this.state.raspunsuriTestByUser.map((raspunsUser, index) => (
              <Grid key={raspunsUser._id} item container spacing={1.5} padding="0">
                <Container width="100%" padding="0">
                  <Card padding="0">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      margin={1.5}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          color:
                            raspunsUser === this.state.raspunsuriCorecte[index] ? 'green' : 'red'
                        }}
                      >
                        Exercitiul {index + 1}
                        {'          '}
                      </Typography>
                      &nbsp;
                      {raspunsUser === this.state.raspunsuriCorecte[index] ? (
                        <CheckCircleOutlineRoundedIcon
                          style={{
                            color: 'green'
                          }}
                        />
                      ) : (
                        <CloseRoundedIcon
                          style={{
                            color: 'red'
                          }}
                        />
                      )}
                      <Button
                        className="next-question"
                        style={{
                          visibility:
                            raspunsUser === this.state.raspunsuriCorecte[index]
                              ? 'hidden'
                              : 'visible'
                        }}
                        onClick={() => {
                          this.setState({ veziRezolvare: true });
                          this.setState({ nrExercitiuAles: index });
                        }}
                      >
                        Vezi rezolvarea
                      </Button>
                    </Stack>
                  </Card>
                </Container>
              </Grid>
            ))}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* vezi rezolvare exercitiu ales */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen &&
            this.state.testChosen &&
            this.state.nrIntrebare !== -1 &&
            this.state.punctajTest &&
            this.state.testTrimis &&
            this.state.veziRezolvare && (
              <Grid
                key={this.state.exercitiiTest[this.state.nrExercitiuAles][0]._id}
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
                      <Markdown>
                        {this.state.exercitiiTest[this.state.nrExercitiuAles][0].cerinta}
                      </Markdown>{' '}
                    </h2>
                    <div className="btn-container">
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiiTest[this.state.nrExercitiuAles][0].varianta1 ===
                            this.state.raspunsuriCorecte[this.state.nrExercitiuAles]
                              ? 'green'
                              : 'red'
                        }}
                      >
                        A. {this.state.exercitiiTest[this.state.nrExercitiuAles][0].varianta1}
                      </Button>
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiiTest[this.state.nrExercitiuAles][0].varianta2 ===
                            this.state.raspunsuriCorecte[this.state.nrExercitiuAles]
                              ? 'green'
                              : 'red'
                        }}
                      >
                        B. {this.state.exercitiiTest[this.state.nrExercitiuAles][0].varianta2}
                      </Button>
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiiTest[this.state.nrExercitiuAles][0].varianta3 ===
                            this.state.raspunsuriCorecte[this.state.nrExercitiuAles]
                              ? 'green'
                              : 'red'
                        }}
                      >
                        C. {this.state.exercitiiTest[this.state.nrExercitiuAles][0].varianta3}
                      </Button>
                      <Button
                        className="answer-btn"
                        style={{
                          color:
                            this.state.exercitiiTest[this.state.nrExercitiuAles][0].varianta4 ===
                            this.state.raspunsuriCorecte[this.state.nrExercitiuAles]
                              ? 'green'
                              : 'red'
                        }}
                      >
                        D. {this.state.exercitiiTest[this.state.nrExercitiuAles][0].varianta4}
                      </Button>
                    </div>
                  </article>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <h2>
                      <b>Rezolvare:</b>
                    </h2>
                    <Typography variant="subtitle1">
                      <Markdown>
                        {this.state.exercitiiTest[this.state.nrExercitiuAles][0].rezolvare}
                      </Markdown>
                    </Typography>
                  </Stack>
                </section>
              </Grid>
            )}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {/* daca am ales sa adaug un test atunci ajung la formular */}
          {/* ------------------------------------------------------------------------------------------------------------- */}
          {this.state.capitolChosen && !this.state.testChosen && this.state.adaugaTestChosen && (
            <Backdrop />
          )}
          {this.state.capitolChosen && !this.state.testChosen && this.state.adaugaTestChosen && (
            <ModalFisaTeorie
              title="Adauga test"
              numeButon="Adauga test"
              canCancel
              canConfirm
              onCancel={this.modalCancelHandlerAdaugaTest}
              onConfirm={this.modalConfirmHandler}
              confirmText="Confirma"
            >
              <Paper>
                <TextField
                  id="Exercitiu 1"
                  label="Exercitiu 1"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Exercitiu 1"
                  inputRef={this.exercitiu1TestRef}
                  multiline
                />
                <TextField
                  id="Exercitiu 2"
                  label="Exercitiu 2"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Exercitiu 2"
                  inputRef={this.exercitiu2TestRef}
                  multiline
                />
                <TextField
                  id="Exercitiu 3"
                  label="Exercitiu 3"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Exercitiu 3"
                  inputRef={this.exercitiu1TestRef}
                  multiline
                />
                <TextField
                  id="Exercitiu 4"
                  label="Exercitiu 4"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Exercitiu 4"
                  inputRef={this.exercitiu1TestRef}
                  multiline
                />
                <TextField
                  id="Exercitiu 5"
                  label="Exercitiu 5"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Exercitiu 5"
                  inputRef={this.exercitiu1TestRef}
                  multiline
                />
                <TextField
                  id="Exercitiu 6"
                  label="Exercitiu 6"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Exercitiu 6"
                  inputRef={this.exercitiu1TestRef}
                  multiline
                />
                <TextField
                  id="Exercitiu 7"
                  label="Exercitiu 7"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Exercitiu 7"
                  inputRef={this.exercitiu7TestRef}
                  multiline
                />
                <TextField
                  id="Exercitiu 8"
                  label="Exercitiu 8"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Exercitiu 8"
                  inputRef={this.exercitiu8TestRef}
                  multiline
                />
                <TextField
                  id="Exercitiu 9"
                  label="Exercitiu 9"
                  style={{ width: '100%' }}
                  margin="dense"
                  placeholder="Exercitiu 9"
                  inputRef={this.exercitiu9TestRef}
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
TesteDB.contextType = AuthContext;
export default TesteDB;
