import { IAccount } from '../../redux/types/types';

const { API_REST_URL } = process.env;

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

export async function updateUserById(token: string, id: string, payload: IAccount) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify(payload),
  };

  return fetch(`${API_REST_URL}/users/${id}`, requestOptions);
}
