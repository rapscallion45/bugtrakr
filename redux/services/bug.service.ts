import { handleResponse } from '../../utils';
import { IBugPayload } from '../types/types';

function getBug(projectId: string) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/projects/${projectId}/bugs`, requestOptions).then(handleResponse);
}

function deleteBug(projectId: string | string[], id: string) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/projects/${projectId}/bugs/${id}`, requestOptions).then(handleResponse);
}

function createBug(projectId: string | string[], payload: IBugPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/projects/${projectId}/bugs`, requestOptions).then(handleResponse);
}

function updateBug(projectId: string | string[], id: string, payload: IBugPayload) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/projects/${projectId}/bugs/${id}`, requestOptions).then(handleResponse);
}

function updateBugNotes(projectId: string | string[], id: string, members: string[]) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, members }),
  };

  return fetch(`/api/projects/${projectId}/bug-notes`, requestOptions).then(handleResponse);
}

const bugService = {
  getBug,
  deleteBug,
  createBug,
  updateBug,
  updateBugNotes,
};
export default bugService;
