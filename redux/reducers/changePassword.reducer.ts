import { accountConstants } from '../constants';

function changePassword(state: any = {}, action: any) {
  switch (action.type) {
    case accountConstants.CHANGE_PASSWORD_REQUEST:
      return {
        requestingPassword: true,
      };
    case accountConstants.CHANGE_PASSWORD_SUCCESS:
      return {
        requestSuccess: true,
        email: action.email,
      };
    case accountConstants.CHANGE_PASSWORD_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
export default changePassword;
