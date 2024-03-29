import { IProjectPayload } from '../../redux/types/types';

const { API_REST_URL } = process.env;

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

export async function createProject(token: string, payload: IProjectPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(payload),
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
