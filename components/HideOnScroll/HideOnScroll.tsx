import { useScrollTrigger, Slide } from '@mui/material';

const HideOnScroll: React.FC<{ children: React.ReactElement<any, any> }> = function HideOnScroll({
  children,
}) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear direction="up" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
