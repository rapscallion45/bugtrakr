import { accountConstants } from '../constants';

function registration(state: any = {}, action: any) {
  switch (action.type) {
    case accountConstants.REGISTER_REQUEST:
      return {
        registering: true,
      };
    case accountConstants.REGISTER_SUCCESS:
      return {
        registered: true,
        email: action.email,
      };
    case accountConstants.REGISTER_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
export default registration;
