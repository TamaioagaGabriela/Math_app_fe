import React, { useRef, useState, useContext, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// material
import { alpha } from '@mui/material/styles';
import {
  Box,
  MenuItem,
  ListItemText,
  Button,
  Typography,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
// components
import { LanguageSelector } from '../../pages/Login';

import MenuPopover from '../../components/MenuPopover';
import AuthContext from '../../context/auth-context';
import LoginI18n from '../../pages/Logini18n'; // Import the LoginI18n component

// ----------------------------------------------------------------------

export default function ClasaPopover() {
  const [open, setOpen] = useState(false);
  const [clasaAleasa, setClasaAleasa] = useState('Clasa a 5-a');

  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { t } = useTranslation();

  const CLASE = [
    {
      value: '5',
      label: t('Clasa a 5-a')
    },
    {
      value: '6',
      label: t('Clasa a 6-a')
    },
    {
      value: '7',
      label: t('Clasa a 7-a')
    },
    {
      value: '8',
      label: t('Clasa a 8-a')
    },
    {
      value: '9',
      label: t('Clasa a 9-a')
    },
    {
      value: '10',
      label: t('Clasa a 10-a')
    },
    {
      value: '11',
      label: t('Clasa a 11-a')
    },
    {
      value: '12',
      label: t('Clasa a 12-a')
    }
  ];

  const changeClasa = (val) => {
    context.clasa = val;
    // console.log(window.location.pathname);
    navigate(window.location.pathname, { replace: true });
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorRef}
        onClick={() => {
          handleOpen();
          LanguageSelector();
          console.log('TEST1');
        }}
        sx={{
          padding: 0,
          width: 180,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        {t('Alege clasa')} - &nbsp;
        <Typography
          textTransform="lowercase"
          // fontStyle="italic"
          component="span"
          variant="subtitle2"
          sx={{ color: '#49BD47' }}
        >
          {t(`Clasa a ${context.clasa}-a`)}
        </Typography>
      </Button>
      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {CLASE.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === CLASE[0].value}
              onClick={() => {
                setClasaAleasa(option.label);
                changeClasa(option.value);
              }}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
