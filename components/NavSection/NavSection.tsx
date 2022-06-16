import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Collapse,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from '../Link/Link';

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ListSubheaderStyle = styled(ListSubheader)({
  paddingLeft: '40px',
  textTransform: 'uppercase',
  boxSizing: 'border-box',
  listStyle: 'none',
  fontWeight: 700,
  lineHeight: 1.5,
  fontSize: '0.75rem',
  letterSpacing: '1.1px',
  color: 'rgb(33, 43, 54)',
  marginTop: '24px',
  marginBottom: '16px',
});

interface ISidebarConfig {
  title: string;
  path?: string;
  icon?: any;
  newTab?: boolean;
  children?: any;
}

interface NavItemProps {
  item: ISidebarConfig;
  active: (path: any) => boolean;
}

const NavItem: FC<NavItemProps> = function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          {icon && <item.icon sx={{ marginRight: '15px' }} />}
          <ListItemText disableTypography primary={title} />
          {open && <KeyboardArrowDownIcon />}
          {!open && <KeyboardArrowDownIcon sx={{ transform: 'rotate(-90deg)' }} />}
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((childItem) => {
              const isActiveSub = active(childItem.path);

              return (
                <ListItemStyle
                  key={childItem.title}
                  component={Link}
                  href={childItem.path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: () => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={childItem.title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return path ? (
    <ListItemStyle
      component={Link}
      href={path}
      target={item.newTab ? '_blank' : ''}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      {icon && <item.icon sx={{ marginRight: '15px' }} />}
      <ListItemText disableTypography primary={title} />
      {item.newTab && <OpenInNewIcon />}
    </ListItemStyle>
  ) : (
    <ListSubheaderStyle>{title}</ListSubheaderStyle>
  );
};

interface NavSectionProps {
  navConfig: ISidebarConfig[];
  other: any;
}

const NavSection: FC<NavSectionProps> = function NavSection({ navConfig, ...other }) {
  const { pathname } = useRouter();
  const match = (path) => path && path === pathname;

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;
