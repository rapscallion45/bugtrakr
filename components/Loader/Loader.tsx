import { FC } from 'react';
import { styled } from '@mui/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ErrorDialogue from '../ErrorDialogue/ErrorDialogue';

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

interface LoaderProps {
  dataLoading: boolean;
  dataError: boolean;
  dataLoaded: boolean;
  loadingText?: string;
  errorText?: string;
  children?: any;
}

const Loader: FC<LoaderProps> = function Loader({
  dataLoading,
  dataError,
  dataLoaded,
  loadingText = null,
  errorText = null,
  children = null,
}) {
  return (
    <>
      {dataLoading && (
        <BoxWrapper>
          <BoxInner>
            <CircularProgress color="primary" sx={{ margin: '15px 0' }} />
            {loadingText && (
              <Typography variant="h6" component="h6">
                {loadingText}
              </Typography>
            )}
          </BoxInner>
        </BoxWrapper>
      )}
      {dataError && !dataLoading && <ErrorDialogue displayText={errorText} />}
      {dataLoaded && !dataError && children}
    </>
  );
};

export default Loader;
