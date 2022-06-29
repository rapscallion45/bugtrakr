import { handleResponse } from '../../utils';

function getProject() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/projects`, requestOptions).then(handleResponse);
}

function deleteProject(id: string) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  };

  return fetch(`/api/projects`, requestOptions).then(handleResponse);
}

function createProject(name: string, members: string[]) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, members }),
  };

  return fetch(`/api/projects`, requestOptions).then(handleResponse);
}

function updateProject(id: string, name: string, members: string[]) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, members }),
  };

  return fetch(`/api/projects`, requestOptions).then(handleResponse);
}

const projectService = {
  getProject,
  deleteProject,
  createProject,
  updateProject,
};
export default projectService;
