import { FC, ReactNode } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, Typography } from '@mui/material';

interface FeatureBarProps {
  description: string;
  action: ReactNode;
  hide: boolean;
}

const FeatureBar: FC<FeatureBarProps> = function FeatureBar({ description, action, hide }) {
  return (
    <Drawer anchor="bottom" open={!hide} onClose={() => {}} variant="temporary">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4}
        sx={{ backgroundColor: 'primary.main' }}
      >
        <Typography variant="body1" color="secondary.main" align="center" mr={4}>
          <b>{description}</b>
        </Typography>
        <Box py={4}>{action}</Box>
      </Box>
    </Drawer>
  );
};

export default FeatureBar;
