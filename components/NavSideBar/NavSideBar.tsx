import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Box, Link as MuiLink, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import Link from '../Link/Link';
import ScrollBar from '../ScrollBar/ScrollBar';
import NavSection from '../NavSection/NavSection';
import MHidden from '../@MUI-Extended/MHidden';
import sideBarConfig from './sideBarConfig';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

interface DashboardSideBarProps {
  isOpenSidebar?: boolean;
  onCloseSidebar?: () => void;
}

const DashboardSideBar: FC<DashboardSideBarProps> = function DashboardSideBar({
  isOpenSidebar,
  onCloseSidebar,
}) {
  const { pathname } = useRouter();
  const userAuth = useSelector((state) => state.authentication?.user);
  const loggedIn = useSelector((state) => state.authentication?.loggedIn);
  const isDemo = useSelector((state) => state.authentication?.demo);
  const user = useSelector((state) => state.account?.user);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <ScrollBar
      sx={{
        height: '100%',
        overflowY: 'auto',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={Link} href="/" sx={{ display: 'inline-flex' }}>
          <Box width={100} component="img" src="/static/logo.png" />
        </Box>
      </Box>
      <Box sx={{ mb: 2, mx: 2.5 }}>
        <AccountStyle>
          {loggedIn && !isDemo && (
            <MuiLink underline="none" component={Link} href="/dashboard/my-account">
              <Avatar src={user?.avatar?.url} alt={userAuth?.firstName} />
            </MuiLink>
          )}
          <Box sx={{ ml: 2 }}>
            <Typography variant="h4" sx={{ color: 'text.primary' }}>
              {loggedIn && !isDemo
                ? `Hi, ${userAuth?.firstName}! 👋`
                : `Hi! Welcome to ${process.env.APP_NAME}! 👋`}
            </Typography>
          </Box>
        </AccountStyle>
      </Box>
      <NavSection navConfig={sideBarConfig} />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'grey.200',
          }}
        >
          <Box
            component="img"
            src="/static/logo.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          {loggedIn && !isDemo && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography gutterBottom variant="h6">
                Want more?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Upgrade your membership plan to gain access to more analysis tools!
              </Typography>
            </Box>
          )}
          {(!loggedIn || isDemo) && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography gutterBottom variant="h6">
                Sign Up
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Create an account to begin tracking your projects!
              </Typography>
            </Box>
          )}

          {loggedIn && !isDemo && (
            <Button fullWidth component={Link} href="/dashboard/my-account" variant="contained">
              Upgrade Plan
            </Button>
          )}
          {(!loggedIn || isDemo) && (
            <Button fullWidth component={Link} href="/login" variant="contained">
              Create Account
            </Button>
          )}
        </Stack>
      </Box>
    </ScrollBar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
};

export default DashboardSideBar;
