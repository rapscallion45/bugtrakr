export default function BottomNavigation(theme) {
  return {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: '75px',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: theme.palette.secondary.main,
          boxShadow:
            'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: '40px',
          paddingTop: '12px',
          color: '#c0c0c0',
          '&.Mui-selected': {
            paddingTop: '12px',
          },
        },
        label: {
          '&.Mui-selected': {
            fontSize: '0.75rem',
          },
        },
      },
    },
  };
}
