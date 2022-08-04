import { handleResponse } from '../../utils';
import {
  IAccount,
  ICredentialsPayload,
  IGoogleCredentialsPayload,
  IFacebookCredentialsPayload,
  IChangePasswordPayload,
  IValidateResetTokenPayload,
  IResetPasswordPayload,
  IVerifyEmailPayload,
} from '../types/types';

function authenticate() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/authenticate`, requestOptions).then(handleResponse);
}

function login(payload: ICredentialsPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/login`, requestOptions).then(handleResponse);
}

function demoLogin() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/demo-login`, requestOptions).then(handleResponse);
}

function loginWithGoogle(payload: IGoogleCredentialsPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/login-google`, requestOptions).then(handleResponse);
}

function loginWithFacebook(payload: IFacebookCredentialsPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/login-facebook`, requestOptions).then(handleResponse);
}

function logout() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/logout`, requestOptions).then(handleResponse);
}

function register(payload: IAccount) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/register`, requestOptions).then(handleResponse);
}

function verifyEmail(payload: IVerifyEmailPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/verify-email`, requestOptions).then(handleResponse);
}

function changePassword(payload: IChangePasswordPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/change-password`, requestOptions).then(handleResponse);
}

function resetPassword(payload: IResetPasswordPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/reset-password`, requestOptions).then(handleResponse);
}

function validateResetToken(payload: IValidateResetTokenPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/validate-reset-token`, requestOptions).then(handleResponse);
}

function updateAccount(id: string, user: IAccount) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, user }),
  };

  return fetch(`/api/account`, requestOptions).then(handleResponse);
}

function getAccount(id: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  };

  return fetch(`/api/account`, requestOptions).then(handleResponse);
}

function deleteAccount(id: string) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  };

  return fetch(`/api/account`, requestOptions).then(handleResponse);
}

const accountService = {
  authenticate,
  login,
  demoLogin,
  loginWithGoogle,
  loginWithFacebook,
  logout,
  register,
  verifyEmail,
  changePassword,
  resetPassword,
  validateResetToken,
  update: updateAccount,
  get: getAccount,
  delete: deleteAccount,
};
export default accountService;
