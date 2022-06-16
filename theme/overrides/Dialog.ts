export default function Dialog() {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          margin: '32px 10px',
          width: 'calc(100% - 20px)',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '8px',
        },
      },
    },
  };
}
