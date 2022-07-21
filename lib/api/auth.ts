import {
  IVerifyEmailPayload,
  IChangePasswordPayload,
  IResetPasswordPayload,
  IValidateResetTokenPayload,
} from '../../redux/types/types';

const { API_REST_URL } = process.env;

export async function authenticateUser(token: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/authenticate`, requestOptions);
}

export async function loginUser({ username, password }) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${API_REST_URL}/login`, requestOptions);
}

export async function registerUser(body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/signup`, requestOptions);
}

export async function verifyEmail(payload: IVerifyEmailPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`${API_REST_URL}/verify-email`, requestOptions);
}

export async function changePassword(payload: IChangePasswordPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`${API_REST_URL}/change-password`, requestOptions);
}

export async function resetPassword(payload: IResetPasswordPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`${API_REST_URL}/reset-password`, requestOptions);
}

export async function validatePasswordReset(payload: IValidateResetTokenPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`${API_REST_URL}/validate-reset-token`, requestOptions);
}
