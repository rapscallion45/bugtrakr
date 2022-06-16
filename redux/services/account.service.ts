import { handleResponse } from '../../utils';

function authenticate() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/authenticate`, requestOptions).then(handleResponse);
}

function login(username: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
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

function loginWithGoogle(idToken: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  };

  return fetch(`/api/login-google`, requestOptions).then(handleResponse);
}

function loginWithFacebook(facebookId: string, accessToken: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ facebookId, accessToken }),
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

function register(user: IAccount) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`/api/register`, requestOptions).then(handleResponse);
}

function verifyEmail(token: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  };

  return fetch(`/api/verify-email`, requestOptions).then(handleResponse);
}

function forgotPassword(email: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  };

  return fetch(`/api/forgot-password`, requestOptions).then(handleResponse);
}

function resetPassword(token: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  };

  return fetch(`/api/reset-password`, requestOptions).then(handleResponse);
}

function validateResetToken(token: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
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
  forgotPassword,
  resetPassword,
  validateResetToken,
  update: updateAccount,
  get: getAccount,
  delete: deleteAccount,
};
export default accountService;
