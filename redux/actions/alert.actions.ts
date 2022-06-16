import { alertConstants } from '../constants';

function enqueueSnackbar(notification) {
  const key = notification.options && notification.options.key;

  return {
    type: alertConstants.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
}

function closeSnackbar(key: string) {
  return {
    type: alertConstants.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
  };
}

function removeSnackbar(key: string) {
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
