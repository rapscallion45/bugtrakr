import { FC } from 'react';
import { useMediaQuery, Theme } from '@mui/material';

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
  const breakpoint = width.substring(0, 2) as
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl';

  const hiddenUp = useMediaQuery((theme: Theme) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoint));

  if (width.includes('Down')) {
    return hiddenDown ? null : children;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : children;
  }

  return null;
};

export default MHidden;
