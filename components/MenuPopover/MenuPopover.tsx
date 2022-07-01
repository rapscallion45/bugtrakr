import { FC } from 'react';
import { Popover, Theme } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

interface MenuPopoverProps {
  open?: boolean;
  children?: any;
  sx?: any;
  other?: any;
  onClose?: () => void;
  anchorEl: any;
  // all other props
  [x: string]: any;
}

const MenuPopover: FC<MenuPopoverProps> = function MenuPopover({
  open,
  children = null,
  sx = null,
  ...other
}) {
  return (
    <Popover
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: 'inherit',
          // @ts-ignore
          boxShadow: (theme: Theme) => theme.customShadows.z20,
          border: (theme: Theme) => `solid 1px ${theme.palette.grey[500_8]}`,
          width: 200,
          ...sx,
        },
      }}
      {...other}
    >
      <ArrowStyle className="arrow" />
      {children}
    </Popover>
  );
};

export default MenuPopover;
