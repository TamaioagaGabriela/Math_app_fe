import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import { t } from 'i18next';

import { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mocks_
import account from '../../_mocks_/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import AuthContext from '../../context/auth-context';
//
import SidebarConfig from './SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const context = useContext(AuthContext);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo sx={{ width: '100%', height: '100%' }} />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="/dashboard/utilizator">
          <AccountStyle>
            <Avatar
              src={context.role === 'Student' ? account.photoURL1 : account.photoURL2}
              alt="photoURL"
              sx={{ width: 50, height: 50 }} // mara
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {context.nume}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {context.role === 'Student' ? t('Elev') : context.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={SidebarConfig()} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: 'relative' }}
        >
          {/* <Box
            component="img"
            src="/static/illustrations/illustration_student.png"
            sx={{ width: 200, position: 'absolute', top: -150 }}
          /> */}
          <Avatar
            src="/static/illustrations/illustration_student.png"
            sx={{ width: 190, height: 190, top: -100 }} // mara
            variant="rounded"
          />
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
