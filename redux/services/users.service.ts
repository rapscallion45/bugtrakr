import { handleResponse } from '../../utils';

function getUsers() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/users`, requestOptions).then(handleResponse);
}

const usersService = {
  getUsers,
};
export default usersService;
