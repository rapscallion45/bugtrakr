import { handleResponse } from '../../utils';

function getBug(projectId: string) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/projects/${projectId}/bugs`, requestOptions).then(handleResponse);
}

function deleteBug(projectId: string, id: string) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  };

  return fetch(`/api/projects/${projectId}/bugs`, requestOptions).then(handleResponse);
}

function createBug(projectId: string, name: string, members: string[]) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, members }),
  };

  return fetch(`/api/projects/${projectId}/bugs`, requestOptions).then(handleResponse);
}

function updateBug(projectId: string, id: string, name: string) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  };

  return fetch(`/api/projects/${projectId}/bugs`, requestOptions).then(handleResponse);
}

function updateBugNotes(projectId: string, id: string, members: string[]) {
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
