import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

const HelperStyle = styled('span')(({ theme }) => ({
  position: 'relative',
  top: '-20px',
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  paddingLeft: '15px',
  marginBottom: '10px',
}));

interface ValidatedCheckboxProps {
  onChange?: (e: any) => void;
  checkboxId?: string;
  checkboxName?: string;
  label?: any;
  value?: any;
  error?: any;
  helperText?: string;
}

const ValidatedCheckbox: FC<ValidatedCheckboxProps> = function ValidatedCheckbox({
  onChange,
  checkboxId,
  checkboxName,
  label,
  value,
  error,
  helperText,
}) {
  return (
    <>
      <FormControlLabel
        /* eslint-disable react/jsx-wrap-multilines */
        control={
          <Checkbox
            value={value}
            id={checkboxId}
            name={checkboxName}
            onChange={onChange}
            color="primary"
          />
        }
        label={
          <Typography variant="body2" sx={{ mt: '3px' }}>
            {label}
          </Typography>
        }
        sx={{ marginBottom: '10px' }}
      />
      <Box>{error && <HelperStyle>{helperText}</HelperStyle>}</Box>
    </>
  );
};

export default ValidatedCheckbox;
