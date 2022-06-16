export default function Table() {
  return {
    MuiTable: {
      styleOverrides: {
        root: {
          minWidth: '10px !important',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '6px 6px',
          width: '100px',
          verticalAlign: 'middle',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          verticalAlign: 'bottom',
        },
      },
    },
  };
}
