import { handleResponse } from '../../utils';
import {
  IAccount,
  IChangePasswordPayload,
  IValidateResetTokenPayload,
  IResetPasswordPayload,
  IVerifyEmailPayload,
} from '../types/types';

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
