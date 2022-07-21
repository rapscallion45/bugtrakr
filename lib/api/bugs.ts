import { IBugPayload } from '../../redux/types/types';

const { API_REST_URL } = process.env;

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
