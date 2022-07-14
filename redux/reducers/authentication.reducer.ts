import { accountConstants } from '../constants';

/**
 * If we're running in the browser, validate saved user details, if exists.
 *
 * App will start in 'validating' state on server, so that, initially, preloader
 * is rendered.
 * It is up to the client to detect whether or not a user's details are saved, and
 * to pass these details to the user auth validation.
 */
const ISSERVER = typeof window === 'undefined';
let user = {};
let initialState = { authenticating: true, user: null };
if (!ISSERVER) {
  user = JSON.parse(localStorage.getItem('user'));
  initialState = user ? { authenticating: true, user } : initialState;
}

function authentication(state: any = initialState, action: any) {
  switch (action.type) {
    case accountConstants.AUTHENTICATE_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case accountConstants.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authenticating: false,
        loggedIn: true,
        demo: !ISSERVER && Boolean(localStorage.getItem('demoMode')),
      };
    case accountConstants.LOGIN_REQUEST:
    case accountConstants.LOGIN_GOOGLE_REQUEST:
    case accountConstants.LOGIN_FACEBOOK_REQUEST:
      return {
        loggingIn: true,
        user: action.userData,
      };
    case accountConstants.DEMO_LOGIN_REQUEST:
      return {
        loggingIn: true,
        demo: true,
        user: action.userData,
      };
    case accountConstants.LOGIN_SUCCESS:
    case accountConstants.LOGIN_GOOGLE_SUCCESS:
    case accountConstants.LOGIN_FACEBOOK_SUCCESS:
      if (!ISSERVER) localStorage.setItem('user', JSON.stringify(action.userData));
      return {
        loggedIn: true,
        user: action.userData,
      };
    case accountConstants.DEMO_LOGIN_SUCCESS:
      if (!ISSERVER) localStorage.setItem('demoMode', 'yes');
      return {
        loggedIn: true,
        demo: true,
        user: action.userData,
      };
    case accountConstants.AUTHENTICATE_FAILURE:
    case accountConstants.LOGIN_FAILURE:
    case accountConstants.DEMO_LOGIN_FAILURE:
    case accountConstants.LOGIN_GOOGLE_FAILURE:
    case accountConstants.LOGIN_FACEBOOK_FAILURE:
    case accountConstants.LOGOUT:
      if (!ISSERVER) {
        localStorage.removeItem('user');
        localStorage.removeItem('demoMode');
      }
      return {};
    default:
      return state;
  }
}
export default authentication;
