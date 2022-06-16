import { useDispatch } from 'react-redux';
import { alertActions, accountActions } from '../../redux/actions';

const useGoogleLoginButtonController = () => {
  const dispatch = useDispatch();

  const onSuccess = (resp) => {
    dispatch(accountActions.loginWithGoogle(resp.tokenId));
  };

  const onFailure = (resp) => {
    dispatch(
      alertActions.enqueueSnackbar({
        message: resp.details,
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
