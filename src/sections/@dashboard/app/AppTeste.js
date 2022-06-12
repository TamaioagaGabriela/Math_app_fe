// material
import { alpha, styled } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { Card, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import Iconify from '../../../components/Iconify';

import AuthContext from '../../../context/auth-context';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppTeste() {
  let sumaPercentageTeste = 0;
  let testePercentage = 0;
  const [capitole, setCapitole] = useState([]);
  const [teste, setTeste] = useState([]);
  const [rezolvariTeste, setRezolvariTeste] = useState([]);

  const context = useContext(AuthContext);
  const [alreadyFetch, setAlreadyFetch] = useState(false);

  const fetchCapitole = () => {
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
        setCapitole(resData.data.capitole);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRezolvariTeste = () => {
    const requestBody = {
      query: `
        query{
           rezolvariTeste{
              _id
              test{
                _id
                capitol_id
              }
              user{
                _id
                email
              }
              punctaj
              raspunsuri_user
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
        setRezolvariTeste(resData.data.rezolvariTeste);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTeste = () => {
    const requestBody = {
      query: `
        query{
            teste{
                _id
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
        setTeste(resData.data.teste);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPercentageTestPerCapitol = (capitolId) => {
    const testeFiltrate = teste.filter((test) => test.capitol_id === capitolId);

    // toate rezolvarile CORECTE ale unui user, filtrate in functie de capitolul testului
    const rezolvariTesteFiltrate = rezolvariTeste.filter(
      (rezolvare) =>
        rezolvare.user._id === context.userId && rezolvare.test.capitol_id === capitolId
    );

    const idTesteRezolvate = rezolvariTesteFiltrate.map((x) => x.test._id);
    const rezolvariTesteDistincte = [...new Set(idTesteRezolvate)];

    if (Number.isNaN(parseInt((100 * rezolvariTesteDistincte.length) / testeFiltrate.length, 10)))
      return 0;

    return parseInt((100 * rezolvariTesteDistincte.length) / testeFiltrate.length, 10);
  };

  const getTestePercentage = () => {
    const capitoleFiltrate = capitole.filter((capitol) => capitol.clasa === context.clasa);
    for (let i = 0; i < capitoleFiltrate.length; i += 1) {
      sumaPercentageTeste += getPercentageTestPerCapitol(capitoleFiltrate[i]._id);
    }
    testePercentage = parseInt(sumaPercentageTeste / capitoleFiltrate.length, 10);
  };

  if (!alreadyFetch) {
    setAlreadyFetch(true);
    fetchCapitole();
    fetchTeste();
    fetchRezolvariTeste();
  }

  getTestePercentage();

  return (
    <Link underline="none" component={RouterLink} to="/dashboard/teste">
      <RootStyle>
        <IconWrapperStyle>
          <Iconify icon="fluent:clipboard-clock-20-filled" width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="h3">Teste</Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
          Progres: {testePercentage}%{/* 54% */}
        </Typography>
      </RootStyle>
    </Link>
  );
}
