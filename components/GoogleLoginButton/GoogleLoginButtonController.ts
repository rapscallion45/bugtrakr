import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import jwt_deocde from 'jwt-decode';
import { useMediaQuery, useTheme } from '@mui/material';
import { alertActions, accountActions } from '../../redux/actions';
import { useScript } from '../../hooks';

const useGoogleLoginButtonController = (variant) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const googleLoginBtnRef = useRef();
  const [token, setToken] = useState<string>('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const onGoogleSignIn = (googleUser: any) => {
    const userCred = googleUser.credential;
    const payload = jwt_deocde(userCred);
    console.log(payload);
    setToken(userCred);
  };

  useScript(
    'https://accounts.google.com/gsi/client',
    () => {
      try {
        window.google.accounts.id.initialize({
          client_id: process.env.GOOGLE_CLIENT_ID,
          callback: onGoogleSignIn,
          auto_select: false,
        });

        window.google.accounts.id.renderButton(googleLoginBtnRef.current, {
          type: 'standard',
          size: 'large',
          width: isMobile ? '257' : '397',
          logo_alignment: 'center',
          text: variant === 'register' ? 'continue_with' : 'signin_with',
        });
      } catch (error) {
        dispatch(
          alertActions.enqueueSnackbar({
            message: error || 'There was a problem with Google signin.',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    },
    true,
    true
  );

  useEffect(() => {
    if (token) dispatch(accountActions.loginWithGoogle({ tokenId: token }, goToDashboard));
  }, [token]);

  return { googleLoginBtnRef };
};
export default useGoogleLoginButtonController;
