// material
import { alpha, styled } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { Card, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// component
import Iconify from '../../../components/Iconify';
import AuthContext from '../../../context/auth-context';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppFormule() {
  let sumaPercentageFormule = 0;
  let formulePercentage = 0;
  const [capitole, setCapitole] = useState([]);
  const [subcapitole, setSubcapitole] = useState([]);
  const [fiseFormule, setFiseFormule] = useState([]);
  const [accesariFiseFormule, setAccesariFiseFormule] = useState([]);

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

  const fetchFiseFormule = () => {
    const requestBody = {
      query: `
        query{
          fiseFormule{
            _id
            subcapitol_id
            titlu
            descriere
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
        setFiseFormule(resData.data.fiseFormule);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAccesariFiseFormule = () => {
    const requestBody = {
      query: `
        query{
            accesariFise{
              _id
              user {
                _id
                email
              }  
              fisa{
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
        setAccesariFiseFormule(resData.data.accesariFise);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPercentageFormulePerCapitol = (capitolId) => {
    const subcapitoleFiltrate = subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === capitolId
    );

    let count = 0;

    for (let i = 0; i < subcapitoleFiltrate.length; i += 1) {
      // toate accesarile unui user, filtrate in functie de capitol
      const accesariSubcapitole = accesariFiseFormule.filter(
        (accesare) =>
          accesare.user._id === context.userId &&
          accesare.fisa.subcapitol_id === subcapitoleFiltrate[i]._id
      );

      if (accesariSubcapitole.length >= 1) count += 1;
    }

    if (Number.isNaN(parseInt((100 * count) / subcapitoleFiltrate.length, 10))) return 0;

    return parseInt((100 * count) / subcapitoleFiltrate.length, 10);
  };

  const getFormulePercentage = () => {
    const capitoleFiltrate = capitole.filter((capitol) => capitol.clasa === context.clasa);
    for (let i = 0; i < capitoleFiltrate.length; i += 1) {
      sumaPercentageFormule += getPercentageFormulePerCapitol(capitoleFiltrate[i]._id);
    }
    formulePercentage = parseInt(sumaPercentageFormule / capitoleFiltrate.length, 10);
  };

  if (!alreadyFetch) {
    setAlreadyFetch(true);
    fetchCapitole();
    fetchSubcapitole();
    fetchFiseFormule();
    fetchAccesariFiseFormule();
  }

  getFormulePercentage();

  return (
    <Link underline="none" component={RouterLink} to="/dashboard/formule">
      <RootStyle>
        <IconWrapperStyle>
          <Iconify icon="eva:file-text-fill" width={24} height={24} />
        </IconWrapperStyle>
        {/* <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography> */}
        <Typography variant="h3">Formule</Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
          Progres: {formulePercentage}%
        </Typography>
      </RootStyle>
    </Link>
  );
}
