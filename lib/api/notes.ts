const { API_REST_URL } = process.env;

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
