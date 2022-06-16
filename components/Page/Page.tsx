import { FC, forwardRef } from 'react';
import { Box } from '@mui/material';

export interface PageProps {
  title?: string;
}

const Page: FC<PageProps> = forwardRef((props, ref) => {
  const { title, children, ...other } = props;
  return (
    <Box ref={ref} {...other}>
      <title>{title}</title>
      {children}
    </Box>
  );
});

export default Page;
