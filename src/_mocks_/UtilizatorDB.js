import React, { Component, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Grid, Container, Typography, Card, Box, Link, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';

const cover = `/static/mock-images/avatars/avatar_13.jpg`;
//  `/static/mock-images/avatars/illustration_student.png`;
//  '/static/mock-images/avatars/avatar_13.jpg';
//  `/static/mock-images/formule/subcapitole/subcap_2.png`;

const UtilizatorImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

export class UtilizatorDB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      //   listaUseri: null,
      detaliiUser: null
    };
  }

  componentDidMount() {
    this.fetchDetaliiUtilizator();
  }

  componentWillUnmount() {
    this.state.isActive = false;
  }

  fetchDetaliiUtilizator = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
            detaliiUser{
                _id
                username
                parola
                nume
                prenume
                email
                email_tutore
                clasa
                role
                confirmed
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
        this.setState({ detaliiUser: resData.data.detaliiUser });
        this.setState({ isLoading: false });
        this.getUserDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getUserDetails = async () => {
    this.setState({ isLoading: true });

    await this.setState((prevState) => ({
      detaliiUser: prevState.detaliiUser.filter((user) => user._id === this.context.userId)
    }));

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Container>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          //   alignItems="center"
          //   justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Link to="/dashboard/app" color="inherit" underline="hover" component={RouterLink}>
            <Button variant="outlined">Inapoi</Button>
          </Link>
        </Stack>

        <Grid container spacing={3} marginLeft="0.1%">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <Card>
              <Box sx={{ pt: '90%', position: 'relative' }}>
                <UtilizatorImgStyle
                  alt={this.state.detaliiUser[0].nume}
                  src={cover}
                  style={{
                    width: 320,
                    height: 320,
                    borderRadius: 10,
                    marginTop: 10,
                    marginLeft: 24
                  }}
                />
                {/* <Avatar
                  src="/static/illustrations/illustration_student.png"
                  sx={{ width: 190, height: 90 }} // mara
                  variant="rounded"
                /> */}
              </Box>
              <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle1">
                    <b>Nume: </b> {this.state.detaliiUser[0].nume}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Prenume: </b> {this.state.detaliiUser[0].prenume}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle1">
                    <b>Username: </b> {this.state.detaliiUser[0].username}
                  </Typography>
                  {this.state.detaliiUser[0].clasa !== '' && (
                    <Typography variant="subtitle1">
                      <b>Clasa: </b> {this.state.detaliiUser[0].clasa}
                    </Typography>
                  )}
                </Stack>
                <Typography variant="subtitle1">
                  <b>Email: </b> {this.state.detaliiUser[0].email}
                </Typography>
                {this.state.detaliiUser[0].email_tutore !== '' && (
                  <Typography variant="subtitle1">
                    <b>Email tutore: </b> {this.state.detaliiUser[0].email_tutore}
                  </Typography>
                )}
              </Stack>
            </Card>
          )}
        </Grid>
      </Container>
    );
  }
}
UtilizatorDB.contextType = AuthContext;
export default UtilizatorDB;
