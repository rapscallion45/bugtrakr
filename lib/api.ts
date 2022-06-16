import { v4 as uuid } from 'uuid';
import client from '../apollo/client';
import REFRESH_TOKEN from '../apollo/mutations/refreshToken';
import LOGIN from '../apollo/mutations/login';
import UPDATE_USER_BY_ID from '../apollo/mutations/updateUserById';
import GET_USER_BY_ID from '../apollo/queries/getUserById';

const { NEXT_PUBLIC_WORDPRESS_SITE_REST_URL } = process.env;

export async function refreshToken({ token }) {
  const { data } = await client.query({
    query: REFRESH_TOKEN,
    variables: {
      input: {
        clientMutationId: uuid,
        jwtRefreshToken: token || '',
      },
    },
  });

  return data || {};
}

export async function loginUser({ username, password }) {
  const { data } = await client.query({
    query: LOGIN,
    variables: {
      input: {
        clientMutationId: uuid,
        username: username || '',
        password: password || '',
      },
    },
  });

  return data || {};
}

export function logoutUser() {
  /* clear apollo cache as user has logged out */
  client.resetStore();
}

export async function registerUser(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(`${NEXT_PUBLIC_WORDPRESS_SITE_REST_URL}/fplfrog/v1/users/register`, requestOptions);
}

export async function verifyEmail(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(
    `${NEXT_PUBLIC_WORDPRESS_SITE_REST_URL}/fplfrog/v1/users/verify-email`,
    requestOptions
  );
}

export async function forgotPassword(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(
    `${NEXT_PUBLIC_WORDPRESS_SITE_REST_URL}/fplfrog/v1/users/forgot-password`,
    requestOptions
  );
}

export async function resetPassword(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(
    `${NEXT_PUBLIC_WORDPRESS_SITE_REST_URL}/fplfrog/v1/users/reset-password`,
    requestOptions
  );
}

export async function validatePasswordReset(body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(
    `${NEXT_PUBLIC_WORDPRESS_SITE_REST_URL}/fplfrog/v1/users/validate-reset-token`,
    requestOptions
  );
}

export async function updateUserById(id, authToken, user) {
  const { data } = await client.query({
    query: UPDATE_USER_BY_ID,
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
      context: 'include',
    },
    variables: {
      input: {
        clientMutationId: uuid,
        id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
  });

  return data || {};
}

export async function getUserById(id, authToken) {
  const { data } = await client.query({
    query: GET_USER_BY_ID,
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
      context: 'include',
    },
    variables: {
      id,
    },
  });

  return data || {};
}
