import { accountConstants } from '../constants';

function registration(state: RegistrationState = {}, action: RegistrationAction) {
  switch (action.type) {
    case accountConstants.REGISTER_REQUEST:
      return {
        registering: true,
      };
    case accountConstants.REGISTER_SUCCESS:
      return {};
    case accountConstants.REGISTER_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
export default registration;
