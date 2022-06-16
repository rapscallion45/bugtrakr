import { FC } from 'react';
import { styled } from '@mui/styles';
import Box from '@mui/material/Box';
import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';

const BoxWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const BoxInner = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '100px 20px',
  maxWidth: '350px',
});

interface ErrorDialogueProps {
  displayText?: string;
}

const ErrorDialogue: FC<ErrorDialogueProps> = function ErrorDialogue({ displayText = null }) {
  return (
    <BoxWrapper>
      <BoxInner>
        <WarningIcon fontSize="large" color="error" sx={{ margin: '15px 0' }} />
        {displayText && (
          <Typography variant="h6" component="h6" align="center">
            {displayText}
          </Typography>
        )}
      </BoxInner>
    </BoxWrapper>
  );
};

export default ErrorDialogue;
