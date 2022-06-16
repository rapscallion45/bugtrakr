import { accountConstants } from '../constants';

function changePassword(state: ChangePasswordState = {}, action: ChangePasswordAction) {
  switch (action.type) {
    case accountConstants.CHANGE_PASSWORD_REQUEST:
      return {
        requestingPassword: true,
      };
    case accountConstants.CHANGE_PASSWORD_SUCCESS:
      return {};
    case accountConstants.CHANGE_PASSWORD_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
export default changePassword;
