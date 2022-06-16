import { FC } from 'react';
import Slide from '@mui/material/Slide';

interface HideOnTriggerProps {
  trigger: boolean;
  direction?: string;
  children?: any;
}

const HideOnTrigger: FC<HideOnTriggerProps> = function HideOnTrigger({
  trigger,
  direction = '',
  children = null,
}) {
  return (
    <Slide appear direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnTrigger;
