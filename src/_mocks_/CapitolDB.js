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
  FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../components/Label';
import AuthContext from '../context/auth-context';
import ModalFisaTeorie from './ModalFiseTeorie';
import Backdrop from '../components/Backdrop/Backdrop';
import { mockImgCapitol, mockImgSubcapitol } from '../utils/mockImages';
import Markdown from '../sections/@dashboard/teorie/TeorieComponent';
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

class CapitolDB extends Component {
  static context = AuthContext;

  constructor(props) {
    super(props);

    this.titluTeorieRef = React.createRef();
    this.descriereTeorieRef = React.createRef();
    this.linkVideoTeorieRef = React.createRef();

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
      adaugaTeorieChosen: false
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
  //   const formik = useFormik({
  //   initialValues: {
  //     gender: '',
  //     category: '',
  //     colors: '',
  //     priceRange: '',
  //     rating: ''
  //   },
  //   onSubmit: () => {
  //     setOpenFilter(false);
  //   }
  // });

  // const { resetForm, handleSubmit } = formik;

  // handleOpenFilter = () => {
  //    this.setState({ openFilter: true });
  // };

  // handleCloseFilter = () => {
  //    this.setState({ openFilter: true });
  // };

  // handleResetFilter = () => {
  //   handleSubmit();
  //   resetForm();
  // };

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
          console.log('adaugaaaa', fisaTeorie);
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
    console.log('setSubcapitol', subcapitolTeorie);
  };

  setAdaugaTeorieChosen = () => {
    this.setState({ adaugaTeorieChosen: true });
  };

  modalCancelHandlerAdaugaTeorie = () => {
    this.setState({ adaugaTeorieChosen: false });
    this.setState({ subcapitolChosen: false });
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
    console.log('isLoading', this.state.isLoading);
    console.log('capitol:', this.state.openFilter);

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
            {/* <ProductFilterSidebar
              formik=""
              isOpenFilter={false}
              onResetFilter={false}
              onOpenFilter={false}
              onCloseFilter={false}
            />
            <ProductSort /> */}
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
                canCancel
                canConfirm
                onCancel={this.modalCancelHandlerAdaugaTeorie}
                onConfirm={this.modalConfirmHandler}
                confirmText="Confirma"
              >
                <Card>
                  <Stack spacing={2} sx={{ p: 3 }}>
                    <FormControl>
                      <div className="form-control">
                        <label htmlFor="titlu">
                          <b>Titlu</b>
                          <textarea id="titlu" cols="53" rows="3" ref={this.titluTeorieRef} />
                        </label>

                        <label htmlFor="linkVideo">
                          <b>Link video explicativ</b>
                          <textarea
                            id="linkVideo"
                            cols="53"
                            rows="3"
                            ref={this.linkVideoTeorieRef}
                          />
                        </label>

                        <label htmlFor="descriere">
                          <b>Descriere</b>
                          <textarea
                            id="descriere"
                            cols="53"
                            rows="15"
                            ref={this.descriereTeorieRef}
                          />
                        </label>
                      </div>
                    </FormControl>
                  </Stack>
                </Card>
              </ModalFisaTeorie>
            )}
        </Grid>
      </container>
    );
  }
}

export default CapitolDB;
