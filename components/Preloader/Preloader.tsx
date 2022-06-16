import { FC } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Preloader: FC = function Preloader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100vw',
        height: '100vh',
        margin: 'auto',
      }}
    >
      <Box sx={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box width={200} component="img" src="/static/logo.png" />
        <CircularProgress color="primary" sx={{ margin: '15px 0' }} />
      </Box>
    </Box>
  );
};
export default Preloader;
