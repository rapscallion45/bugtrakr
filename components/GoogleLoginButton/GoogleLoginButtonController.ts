import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { alertActions, accountActions } from '../../redux/actions';

const useGoogleLoginButtonController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const onSuccess = (resp) => {
    dispatch(accountActions.loginWithGoogle({ tokenId: resp.tokenId }, goToDashboard));
  };

  const onFailure = (resp) => {
    dispatch(
      alertActions.enqueueSnackbar({
        message: resp.details || 'There was a problem with Google signin.',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      })
    );
  };

  return { onSuccess, onFailure };
};
export default useGoogleLoginButtonController;
