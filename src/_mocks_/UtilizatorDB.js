import React, { Component, useContext } from 'react';
// material
import { Stack, Button, Grid, Container, Typography, Card, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';

const cover = `/static/mock-images/capitole/capp_624623ca26d81302468d69ca.png`;

const UtilizatorImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const contextType = AuthContext;
// const context = useContext(AuthContext);

class UtilizatorDB extends Component {
  //   const context = useContext(AuthContext);
  //   static context = AuthContext;

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
        console.log('detaliiUser', this.state.detaliiUser);

        this.setState({ isLoading: false });
        this.getUserDetails();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  getUserDetails = async () => {
    this.setState({ isLoading: true });
    // const detaliiUser2 = this.state.detaliiUser.filter((user) => user._id === this.context.userId);
    // await this.setState({ detaliiUser: detaliiUser2, isLoading: false });
    console.log('this.context.userId', this.context.userId);
    console.log('this.context', contextType.context);

    console.log('contextType', contextType);

    await this.setState((prevState) => ({
      detaliiUser: prevState.detaliiUser.filter(
        (user) => user._id === '6259c4a623ca4e73a8cb0683'
        //   this.context.userId
      )
    }));

    this.setState({ isLoading: false });
    // console.log(this.state.detaliiUser[0].nume);
  };

  render() {
    // const utilizator = this.state.detaliiUser.filter((user) => user._id === this.context.userId);

    return (
      //   <AuthContext.Consumer>
      <Container>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          //   alignItems="center"
          //   justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Button variant="outlined" onClick={() => this.modalHandleClickInapoi()}>
            Inapoi
          </Button>
        </Stack>

        <Grid container spacing={3} marginLeft="0.1%">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <Card>
              <Box sx={{ pt: '90%', position: 'relative' }}>
                <UtilizatorImgStyle alt={this.state.detaliiUser[0].nume} src={cover} />
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
                  <Typography variant="subtitle1">
                    <b>Clasa: </b> {this.state.detaliiUser[0].clasa}
                  </Typography>
                </Stack>

                <Typography variant="subtitle1">
                  <b>Email: </b> {this.state.detaliiUser[0].email}
                </Typography>
                <Typography variant="subtitle1">
                  <b>Email tutore: </b> {this.state.detaliiUser[0].email_tutore}
                </Typography>
              </Stack>
            </Card>
          )}
        </Grid>
      </Container>
      //   </AuthContext.Consumer>
    );
  }
}
export default UtilizatorDB;
