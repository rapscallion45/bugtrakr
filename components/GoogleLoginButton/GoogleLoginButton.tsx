import React, { FC } from 'react';
import { styled } from '@mui/styles';
import { Box } from '@mui/material';
import useGoogleLoginButtonController from './GoogleLoginButtonController';

const GoogleLoginBtnStyle = styled(Box)(() => ({
  padding: '10px 0',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

interface GoogleLoginButtonProps {
  variant: 'login' | 'register';
}

const GoogleLoginButton: FC<GoogleLoginButtonProps> = function GoogleLoginButton({
  variant = 'login',
}) {
  const { googleLoginBtnRef } = useGoogleLoginButtonController(variant);

  return <GoogleLoginBtnStyle ref={googleLoginBtnRef} />;
};
export default React.memo(GoogleLoginButton);
