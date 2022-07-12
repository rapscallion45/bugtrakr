import { handleResponse } from '../../utils';

function deleteNote(projectId: string | string[], bugId: string | string[], id: number) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/projects/${projectId}/bugs/${bugId}/notes/${id}`, requestOptions).then(
    handleResponse
  );
}

function createNote(projectId: string | string[], bugId: string | string[], payload: string) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/projects/${projectId}/bugs/${bugId}/notes`, requestOptions).then(
    handleResponse
  );
}

function updateNote(
  projectId: string | string[],
  bugId: string | string[],
  id: number,
  payload: string
) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch(`/api/projects/${projectId}/bugs/${bugId}/notes/${id}`, requestOptions).then(
    handleResponse
  );
}

const noteService = {
  deleteNote,
  createNote,
  updateNote,
};
export default noteService;
