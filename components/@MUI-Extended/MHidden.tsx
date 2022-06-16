import { FC } from 'react';
import { useMediaQuery } from '@mui/material';

interface MHiddenProps {
  children?: any;
  width:
    | 'xsDown'
    | 'smDown'
    | 'mdDown'
    | 'lgDown'
    | 'xlDown'
    | 'xsUp'
    | 'smUp'
    | 'mdUp'
    | 'lgUp'
    | 'xlUp';
}

const MHidden: FC<MHiddenProps> = function MHidden({ width, children = null }) {
  const breakpoint = width.substring(0, 2);

  const hiddenUp = useMediaQuery((theme) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery((theme) => theme.breakpoints.down(breakpoint));

  if (width.includes('Down')) {
    return hiddenDown ? null : children;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : children;
  }

  return null;
};

export default MHidden;
