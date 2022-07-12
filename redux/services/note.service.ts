import { handleResponse } from '../../utils';

function deleteNote(projectId: string | string[], id: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/projects/${projectId}/bugs/${id}`, requestOptions).then(handleResponse);
}

function createNote(projectId: string | string[], bugId: string | string[], payload: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  };

  return fetch(`/api/projects/${projectId}/bugs/${bugId}`, requestOptions).then(handleResponse);
}

function updateNote(projectId: string | string[], id: number, payload: string) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  };

  return fetch(`/api/projects/${projectId}/bugs/${id}`, requestOptions).then(handleResponse);
}

const noteService = {
  deleteNote,
  createNote,
  updateNote,
};
export default noteService;
