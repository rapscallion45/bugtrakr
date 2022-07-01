import { alertConstants } from '../constants';
import { INotification } from '../types/types';

function enqueueSnackbar(notification: INotification) {
  const key = notification.options && notification.options.key;

  return {
    type: alertConstants.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
}

function closeSnackbar(key: any) {
  return {
    type: alertConstants.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
  };
}

function removeSnackbar(key: any) {
  return {
    type: alertConstants.REMOVE_SNACKBAR,
    key,
  };
}

const alertActions = {
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar,
};
export default alertActions;
