const { API_REST_URL } = process.env;

export async function loginUser({ username, password }) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${API_REST_URL}/login`, requestOptions);
}

export async function registerUser(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/signup`, requestOptions);
}

export async function verifyEmail(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/users/verify-email`, requestOptions);
}

export async function forgotPassword(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/users/forgot-password`, requestOptions);
}

export async function resetPassword(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/users/reset-password`, requestOptions);
}

export async function validatePasswordReset(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/users/validate-reset-token`, requestOptions);
}

export async function getProjects(token) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects`, requestOptions);
}
