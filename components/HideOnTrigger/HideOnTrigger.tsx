import { FC } from 'react';
import Slide from '@mui/material/Slide';

interface HideOnTriggerProps {
  trigger: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  children?: any;
}

const HideOnTrigger: FC<HideOnTriggerProps> = function HideOnTrigger({
  trigger,
  direction = 'down',
  children = null,
}) {
  return (
    <Slide appear direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnTrigger;
