export default function Chip() {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
        colorSecondary: {
          color: 'inherit',
        },
        label: {
          paddingTop: '1px',
        },
      },
    },
  };
}
