import { FC, createRef, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { alertActions } from '../../redux/actions';

interface AlertProps {
  id?: any;
}

const Alert: FC<AlertProps> = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { id } = props;

  /* close alert callback */
  const handleClose = () => {
    dispatch(alertActions.closeSnackbar(id));
  };

  /* find this alert in state and get variant */
  const { notifications } = useSelector((state) => state.alert);
  const variant = notifications.find((notification) => notification.key === id)?.options?.variant;

  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      severity={variant}
      onClose={handleClose}
      {...props}
    />
  );
});

export interface AlertProviderProps {
  children?: any;
}

const AlertProvider: FC<AlertProviderProps> = function AlertProvider({ children = null }) {
  const notistackRef = createRef();

  return (
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={5}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Slide}
      /* eslint-disable react/no-unstable-nested-components */
      content={(key, message) => <Alert id={key}>{message}</Alert>}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AlertProvider;
