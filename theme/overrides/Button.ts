export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          border: '2px solid',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          '&:hover': {
            color: theme.palette.success.main,
            backgroundColor: theme.palette.primary.main,
          },
        },
        containedSecondary: {
          color: theme.palette.grey[500],
          backgroundColor: 'white',
          '&:hover': {
            color: theme.palette.grey[500],
            backgroundColor: 'white',
          },
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
