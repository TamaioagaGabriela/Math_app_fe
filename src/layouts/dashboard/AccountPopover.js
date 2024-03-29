import { useRef, useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
import AuthContext from '../../context/auth-context';
//
import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Pagina principala',
    icon: 'eva:home-fill',
    linkTo: '/dashboard/app'
  },
  {
    label: 'Profil',
    icon: 'eva:person-fill',
    linkTo: '/dashboard/utilizator'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const logout = () => {
    context.token = null;
    context.userId = null;
    context.role = null;
    context.nume = null;
    context.clasa = null;
    context.email = null;
    context.subcapitolId = undefined;
    context.capitolId = undefined;
    navigate('/dashboard/app', { replace: true });
  };

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { t } = useTranslation();

  const MENU_OPTIONS = [
    {
      label: t('Pagina principala'),
      icon: 'eva:home-fill',
      linkTo: '/dashboard/app'
    },
    {
      label: t('Profil'),
      icon: 'eva:person-fill',
      linkTo: '/dashboard/utilizator'
    }
  ];

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar
          src={context.role === 'Student' ? account.photoURL1 : account.photoURL2}
          sx={{ width: 50, height: 50 }} // mara
          alt="photoURL"
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {context.nume}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {context.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            // ref={contextRef}
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
            // contextuser={context}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
