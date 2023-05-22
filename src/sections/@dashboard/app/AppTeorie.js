// material
import { alpha, styled } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { Card, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
// component
import Iconify from '../../../components/Iconify';
import AuthContext from '../../../context/auth-context';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppTeorie() {
  let sumaPercentageTeorie = 0;
  let teoriePercentage = 0;
  const [capitole, setCapitole] = useState([]);
  const [subcapitole, setSubcapitole] = useState([]);
  const [fiseTeorie, setFiseTeorie] = useState([]);
  const [accesariFiseTeorie, setAccesariFiseTeorie] = useState([]);

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

  const fetchFiseTeorie = () => {
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
        setFiseTeorie(resData.data.teorie);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAccesariFiseTeorie = () => {
    const requestBody = {
      query: `
        query{
            accesariTeorie{
              _id
              user {
                _id
              }  
              teorie{
                _id
                subcapitol_id
              }
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
        setAccesariFiseTeorie(resData.data.accesariTeorie);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPercentageTeoriePerCapitol = (capitolId) => {
    const subcapitoleFiltrate = subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === capitolId
    );

    let count = 0;
    for (let i = 0; i < subcapitoleFiltrate.length; i += 1) {
      // toate accesarile unui user, filtrate in functie de capitol
      const accesariSubcapitole = accesariFiseTeorie.filter(
        (accesare) =>
          accesare.user._id === context.userId &&
          accesare.teorie.subcapitol_id === subcapitoleFiltrate[i]._id
      );
      if (accesariSubcapitole.length >= 1) count += 1;
    }
    if (Number.isNaN(parseInt((100 * count) / subcapitoleFiltrate.length, 10))) return 0;

    return parseInt((100 * count) / subcapitoleFiltrate.length, 10);
  };

  const getTeoriePercentage = () => {
    const capitoleFiltrate = capitole.filter((capitol) => capitol.clasa === context.clasa);
    for (let i = 0; i < capitoleFiltrate.length; i += 1) {
      sumaPercentageTeorie += getPercentageTeoriePerCapitol(capitoleFiltrate[i]._id);
    }
    teoriePercentage = parseInt(sumaPercentageTeorie / capitoleFiltrate.length, 10);
  };

  if (!alreadyFetch) {
    setAlreadyFetch(true);
    fetchCapitole();
    fetchSubcapitole();
    fetchFiseTeorie();
    fetchAccesariFiseTeorie();
  }

  getTeoriePercentage();

  return (
    <Link underline="none" component={RouterLink} to="/dashboard/teorie">
      <RootStyle>
        <IconWrapperStyle>
          <Iconify icon="fluent:book-20-filled" width={24} height={24} />
        </IconWrapperStyle>
        <Typography variant="h3">{t('Lecții teoretice')}</Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
          {t('Progres')}: {teoriePercentage}%{/* 57% */}
        </Typography>
      </RootStyle>
    </Link>
  );
}
