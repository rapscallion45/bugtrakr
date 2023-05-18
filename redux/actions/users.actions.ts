import { usersConstants } from '../constants';
import { usersService } from '../services';
import alertActions from './alert.actions';

function getUsers() {
  function request() {
    return { type: usersConstants.GET_REQUEST };
  }
  function success(usersData: any[]) {
    return { type: usersConstants.GET_SUCCESS, usersData };
  }
  function failure(error: string) {
    return { type: usersConstants.GET_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    usersService.getUsers().then(
      (users) => dispatch(success(users)),
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          alertActions.enqueueSnackbar({
            message: `Failed to retrieve user list: ${error.toString()}`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

const accountActions = {
  getUsers,
};
export default accountActions;
