import { FC } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: '7px',
  width: 40,
  height: 40,
  maxWidth: 60,
  [theme.breakpoints.up('sm')]: {
    width: 120,
    height: 60,
  },
  [theme.breakpoints.up('lg')]: {
    width: 60,
    height: 60,
  },
}));

interface Props {
  sx?: any;
}

const Logo: FC<Props> = function Logo({ sx = null }) {
  // @ts-ignore
  return <BoxStyle component="img" src="/static/logo.png" sx={{ ...sx }} />;
};

export default Logo;
