import React, { useRef, useState, useContext, Component } from 'react';
import { useNavigate } from 'react-router-dom';

// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemText, Button } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import AuthContext from '../../context/auth-context';

// ----------------------------------------------------------------------

const CLASE = [
  {
    value: '5',
    label: 'Clasa a 5-a'
  },
  {
    value: '6',
    label: 'Clasa a 6-a'
  },
  {
    value: '7',
    label: 'Clasa a 7-a'
  },
  {
    value: '8',
    label: 'Clasa a 8-a'
  },
  {
    value: '9',
    label: 'Clasa a 9-a'
  },
  {
    value: '10',
    label: 'Clasa a 10-a'
  },
  {
    value: '11',
    label: 'Clasa a 11-a'
  },
  {
    value: '12',
    label: 'Clasa a 12-a'
  }
];

// ----------------------------------------------------------------------

export default function ClasaPopover() {
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const changeClasa = (val) => {
    context.clasa = val;
    console.log(window.location.pathname);
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
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        Alege clasa
      </Button>
      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {CLASE.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === CLASE[0].value}
              onClick={() => {
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
