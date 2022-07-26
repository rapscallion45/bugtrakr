import { accountConstants } from '../constants';
import { accountService } from '../services';
import alertActions from './alert.actions';
import {
  IAccount,
  IUser,
  IUserAuth,
  ICredentialsPayload,
  IValidateResetTokenPayload,
  IResetPasswordPayload,
  IChangePasswordPayload,
  IGoogleCredentialsPayload,
  IFacebookCredentialsPayload,
  IVerifyEmailPayload,
} from '../types/types';

function authenticate() {
  function request() {
    return { type: accountConstants.AUTHENTICATE_REQUEST };
  }
  function success(userData: IUserAuth) {
    return { type: accountConstants.AUTHENTICATE_SUCCESS, userData };
  }
  function failure(error: string) {
    return { type: accountConstants.AUTHENTICATE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.authenticate().then(
      (data) => {
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: 'Your user session has expired. Please login again.',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function login(payload: ICredentialsPayload, nextPage: () => void) {
  function request() {
    return { type: accountConstants.LOGIN_REQUEST };
  }
  function success(userData: IUser) {
    return { type: accountConstants.LOGIN_SUCCESS, userData };
  }
  function failure(error: string) {
    return { type: accountConstants.LOGIN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.login(payload).then(
      (user) => {
        dispatch(success(user));
        if (nextPage) nextPage();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function demoLogin(nextPage: () => void) {
  function request() {
    return { type: accountConstants.DEMO_LOGIN_REQUEST };
  }
  function success(userData: IUser) {
    return { type: accountConstants.DEMO_LOGIN_SUCCESS, userData };
  }
  function failure(error: string) {
    return { type: accountConstants.DEMO_LOGIN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.demoLogin().then(
      (user) => {
        dispatch(success(user));
        if (nextPage) nextPage();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function loginWithGoogle(payload: IGoogleCredentialsPayload, nextPage: () => void) {
  function request() {
    return { type: accountConstants.LOGIN_FACEBOOK_REQUEST };
  }
  function success(userData: IAccount) {
    return { type: accountConstants.LOGIN_FACEBOOK_SUCCESS, userData };
  }
  function failure(error: string) {
    return { type: accountConstants.LOGIN_FACEBOOK_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.loginWithGoogle(payload).then(
      (user) => {
        dispatch(success(user));
        if (nextPage) nextPage();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function loginWithFacebook(payload: IFacebookCredentialsPayload, nextPage: () => void) {
  function request() {
    return { type: accountConstants.LOGIN_FACEBOOK_REQUEST };
  }
  function success(userData: IAccount) {
    return { type: accountConstants.LOGIN_FACEBOOK_SUCCESS, userData };
  }
  function failure(error: string) {
    return { type: accountConstants.LOGIN_FACEBOOK_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.loginWithFacebook(payload).then(
      (user) => {
        dispatch(success(user));
        if (nextPage) nextPage();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function logout() {
  accountService.logout();
  return { type: accountConstants.LOGOUT };
}

function register(payload: IAccount, nextPage: () => void) {
  function request() {
    return { type: accountConstants.REGISTER_REQUEST };
  }
  function success(email: string) {
    return { type: accountConstants.REGISTER_SUCCESS, email };
  }
  function failure(error: string) {
    return { type: accountConstants.REGISTER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.register(payload).then(
      (data) => {
        dispatch(success(data?.email));
        dispatch(
          alertActions.enqueueSnackbar({
            message: data?.info?.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'info',
            },
          })
        );
        if (nextPage) nextPage();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function verifyEmail(payload: IVerifyEmailPayload) {
  function request() {
    return { type: accountConstants.VERIFY_EMAIL_REQUEST };
  }
  function success(message: string) {
    return { type: accountConstants.VERIFY_EMAIL_SUCCESS, message };
  }
  function failure(error: string) {
    return { type: accountConstants.VERIFY_EMAIL_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    accountService.verifyEmail(payload).then(
      (message) => {
        dispatch(success(message.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: message.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function resetEmailVerification() {
  return { type: accountConstants.VERIFY_EMAIL_RESET };
}

function changePassword(payload: IChangePasswordPayload, nextPage: () => void) {
  function request() {
    return { type: accountConstants.CHANGE_PASSWORD_REQUEST };
  }
  function success(email: string) {
    return { type: accountConstants.CHANGE_PASSWORD_SUCCESS, email };
  }
  function failure(error: string) {
    return { type: accountConstants.CHANGE_PASSWORD_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.changePassword(payload).then(
      (data) => {
        dispatch(success(data?.email));
        dispatch(
          alertActions.enqueueSnackbar({
            message: data?.info?.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'info',
            },
          })
        );
        if (nextPage) nextPage();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function resetPassword(payload: IResetPasswordPayload) {
  function request() {
    return { type: accountConstants.RESET_PASSWORD_REQUEST };
  }
  function success(message: string) {
    return { type: accountConstants.RESET_PASSWORD_SUCCESS, message };
  }
  function failure(error: string) {
    return { type: accountConstants.RESET_PASSWORD_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.resetPassword(payload).then(
      (message) => {
        dispatch(success(message.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: message.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function resetPasswordReset() {
  return { type: accountConstants.RESET_PASSWORD_RESET };
}

function validateResetToken(payload: IValidateResetTokenPayload) {
  function request() {
    return { type: accountConstants.VALIDATE_RESET_TOKEN_REQUEST };
  }
  function success() {
    return { type: accountConstants.VALIDATE_RESET_TOKEN_SUCCESS };
  }
  function failure(error: string) {
    return { type: accountConstants.VALIDATE_RESET_TOKEN_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.validateResetToken(payload).then(
      () => {
        dispatch(success());
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function resetTokenValidation() {
  return { type: accountConstants.VALIDATE_RESET_TOKEN_RESET };
}

function updateAccount(id: string, user: IAccount) {
  function request(userData: IAccount) {
    return { type: accountConstants.UPDATE_REQUEST, userData };
  }
  function success(userData: IAccount) {
    return { type: accountConstants.UPDATE_SUCCESS, userData };
  }
  function failure(userData: IAccount, error: string) {
    return { type: accountConstants.UPDATE_FAILURE, userData, error };
  }

  return (dispatch) => {
    dispatch(request(user));

    accountService.update(id, user).then(
      (userData) => {
        dispatch(success(userData));
        dispatch(
          alertActions.enqueueSnackbar({
            message: 'Profile updated successfully.',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(user, error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: error.toString(),
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

function getAccount(id: string) {
  function request() {
    return { type: accountConstants.GETDETAILS_REQUEST };
  }
  function success(userData: IAccount) {
    return { type: accountConstants.GETDETAILS_SUCCESS, userData };
  }
  function failure(error: string) {
    return { type: accountConstants.GETDETAILS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    accountService.get(id).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error.toString()))
    );
  };
}

function deleteAccount(id: string) {
  function request(userId: string) {
    return { type: accountConstants.DELETE_REQUEST, userId };
  }
  function success(userId: string) {
    return { type: accountConstants.DELETE_SUCCESS, userId };
  }
  function failure(userId: string, error: string) {
    return { type: accountConstants.DELETE_FAILURE, userId, error };
  }

  return (dispatch) => {
    dispatch(request(id));

    accountService.delete(id).then(
      () => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };
}

const accountActions = {
  authenticate,
  login,
  demoLogin,
  loginWithGoogle,
  loginWithFacebook,
  logout,
  register,
  verifyEmail,
  resetEmailVerification,
  changePassword,
  resetPassword,
  resetPasswordReset,
  validateResetToken,
  resetTokenValidation,
  update: updateAccount,
  get: getAccount,
  delete: deleteAccount,
};
export default accountActions;
