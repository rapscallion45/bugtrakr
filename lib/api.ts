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

export async function deleteProject(token, id) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${id}`, requestOptions);
}

export async function createProject(token, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/projects`, requestOptions);
}

export async function updateProject(token, body) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/projects/${body.id}`, requestOptions);
}

export async function updateProjectMembers(token, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/projects/${body.id}/members`, requestOptions);
}

export async function leaveProject(token, id) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${id}/members/leave`, requestOptions);
}

export async function getBugs(token, id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${id}/bugs`, requestOptions);
}

export async function getUsers(token) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/users`, requestOptions);
}
