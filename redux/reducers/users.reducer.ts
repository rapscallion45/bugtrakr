import { usersConstants } from '../constants';

function projects(state: UsersState = {}, action: UsersAction) {
  switch (action.type) {
    case usersConstants.GET_REQUEST:
      return {
        loading: true,
      };
    case usersConstants.GET_SUCCESS:
      return {
        loaded: true,
        data: action.usersData,
      };
    case usersConstants.GET_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
export default projects;
