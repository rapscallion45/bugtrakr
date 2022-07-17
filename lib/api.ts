import { IBugPayload, IUser } from '../redux/types/types';

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

export async function verifyEmail(body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/users/verify-email`, requestOptions);
}

export async function forgotPassword(body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/users/forgot-password`, requestOptions);
}

export async function resetPassword(body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/users/reset-password`, requestOptions);
}

export async function validatePasswordReset(body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/users/validate-reset-token`, requestOptions);
}

export async function getProjects(token: string) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects`, requestOptions);
}

export async function deleteProject(token: string, id: string) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${id}`, requestOptions);
}

export async function createProject(token: string, body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/projects`, requestOptions);
}

export async function updateProject(token: string, body: any) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/projects/${body.id}`, requestOptions);
}

export async function updateProjectMembers(token: string, body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(body),
  };

  return fetch(`${API_REST_URL}/projects/${body.id}/members`, requestOptions);
}

export async function removeProjectMember(token: string, body: any) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${body.id}/members/${body.memberId}`, requestOptions);
}

export async function leaveProject(token: string, id: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${id}/members/leave`, requestOptions);
}

export async function getBugs(token: string, projectId: string | string[]) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${projectId}/bugs`, requestOptions);
}

export async function getBugsByUser(token: string, userId: string | string[]) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/users/${userId}/bugs`, requestOptions);
}

export async function createBug(token: string, projectId: string | string[], payload: IBugPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(payload),
  };

  return fetch(`${API_REST_URL}/projects/${projectId}/bugs`, requestOptions);
}

export async function deleteBug(
  token: string,
  projectId: string | string[],
  id: string | string[]
) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${projectId}/bugs/${id}`, requestOptions);
}

export async function updateBug(
  token: string,
  projectId: string | string[],
  id: string | string[],
  payload: IBugPayload
) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(payload),
  };

  return fetch(`${API_REST_URL}/projects/${projectId}/bugs/${id}`, requestOptions);
}

export async function closeBug(token: string, projectId: string | string[], id: string | string[]) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${projectId}/bugs/${id}/close`, requestOptions);
}

export async function reopenBug(
  token: string,
  projectId: string | string[],
  id: string | string[]
) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${projectId}/bugs/${id}/reopen`, requestOptions);
}

export async function createNote(
  token: string,
  projectId: string | string[],
  bugId: string | string[],
  payload: string
) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify({ body: payload }),
  };

  return fetch(`${API_REST_URL}/projects/${projectId}/bugs/${bugId}/notes`, requestOptions);
}

export async function deleteNote(
  token: string,
  projectId: string | string[],
  id: string | string[]
) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/projects/${projectId}/notes/${id}`, requestOptions);
}

export async function updateNote(
  token: string,
  projectId: string | string[],
  id: string | string[],
  payload: string
) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify({ body: payload }),
  };

  return fetch(`${API_REST_URL}/projects/${projectId}/notes/${id}`, requestOptions);
}

export async function getUsers(token: string) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/users`, requestOptions);
}

export async function getUserById(token: string, id: string) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
  };

  return fetch(`${API_REST_URL}/users/${id}`, requestOptions);
}

export async function updateUserById(token: string, id: string, payload: IUser) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(payload),
  };

  return fetch(`${API_REST_URL}/users/${id}`, requestOptions);
}
