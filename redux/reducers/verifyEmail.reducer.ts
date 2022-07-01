import { accountConstants } from '../constants';

function verifyEmail(state: any = {}, action: any) {
  switch (action.type) {
    case accountConstants.VERIFY_EMAIL_REQUEST:
      return {
        emailVerified: 'Verifying',
      };
    case accountConstants.VERIFY_EMAIL_SUCCESS:
      return {
        emailVerified: 'Verified',
      };
    case accountConstants.VERIFY_EMAIL_FAILURE:
      return {
        error: action.error,
        emailVerified: 'Failed',
      };
    default:
      return state;
  }
}
export default verifyEmail;
