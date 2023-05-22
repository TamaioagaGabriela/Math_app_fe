// material
import { alpha, styled } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { Card, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

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
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppExercitii() {
  let sumaPercentageExercitii = 0;
  let exercitiiPercentage = 0;
  const [capitole, setCapitole] = useState([]);
  const [subcapitole, setSubcapitole] = useState([]);
  const [exercitii, setExercitii] = useState([]);
  const [rezolvariExercitii, setRezolvariExercitii] = useState([]);

  const context = useContext(AuthContext);
  const [alreadyFetch, setAlreadyFetch] = useState(false);
  const { t } = useTranslation();

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

  const fetchSubcapitole = () => {
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
        setSubcapitole(resData.data.subcapitole);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchExercitii = () => {
    const requestBody = {
      query: `
        query{
        exercitii{
            _id
            cerinta
            subcapitol_id
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
        setExercitii(resData.data.exercitii);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRezolvariExercitii = () => {
    const requestBody = {
      query: `
        query{
            rezolvariExercitii{
              _id
              exercitiu{
                _id
                subcapitol_id
                raspuns_corect
              }
              user{
                _id
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
        setRezolvariExercitii(resData.data.rezolvariExercitii);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPercentageExercitiiPerSubcapitol = (subcapitolId) => {
    const exercitiiFiltrate = exercitii.filter(
      (exercitiu) => exercitiu.subcapitol_id === subcapitolId
    );
    // toate rezolvarile CORECTE ale unui user, filtrate in functie de subcapitol
    const rezolvariExercitiiFiltrate = rezolvariExercitii.filter(
      (rezolvare) =>
        rezolvare.user._id === context.userId &&
        rezolvare.status === 'CORECT' &&
        rezolvare.exercitiu.subcapitol_id === subcapitolId
    );
    const idExercitiiRezolvate = rezolvariExercitiiFiltrate.map((x) => x.exercitiu._id);
    const rezolvariExercitiiDistincte = [...new Set(idExercitiiRezolvate)];
    if (
      Number.isNaN(
        parseInt((100 * rezolvariExercitiiDistincte.length) / exercitiiFiltrate.length, 10)
      )
    )
      return 0;

    return parseInt((100 * rezolvariExercitiiDistincte.length) / exercitiiFiltrate.length, 10);
  };

  const getPercentageExercitiiPerCapitol = (capitolId) => {
    const subcapitoleFiltrate = subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === capitolId
    );
    let suma = 0;
    for (let i = 0; i < subcapitoleFiltrate.length; i += 1) {
      suma += getPercentageExercitiiPerSubcapitol(subcapitoleFiltrate[i]._id);
    }
    if (Number.isNaN(parseInt(suma / subcapitoleFiltrate.length, 10))) return 0;
    return parseInt(suma / subcapitoleFiltrate.length, 10);
  };

  const getExercitiiPercentage = () => {
    const capitoleFiltrate = capitole.filter((capitol) => capitol.clasa === context.clasa);
    for (let i = 0; i < capitoleFiltrate.length; i += 1) {
      sumaPercentageExercitii += getPercentageExercitiiPerCapitol(capitoleFiltrate[i]._id);
    }
    exercitiiPercentage = parseInt(sumaPercentageExercitii / capitoleFiltrate.length, 10);
  };

  if (!alreadyFetch) {
    setAlreadyFetch(true);
    fetchCapitole();
    fetchSubcapitole();
    fetchExercitii();
    fetchRezolvariExercitii();
  }

  getExercitiiPercentage();

  return (
    <Link underline="none" component={RouterLink} to="/dashboard/exercitii">
      <RootStyle>
        <IconWrapperStyle>
          <Iconify icon="fluent:clipboard-edit-20-filled" width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="h3">{t('Probleme')}</Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
          {t('Progres')}: {exercitiiPercentage}%{/* 64% */}
        </Typography>
      </RootStyle>
    </Link>
  );
}
