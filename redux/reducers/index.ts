import { combineReducers } from 'redux';

import registration from './registration.reducer';
import verifyEmail from './verifyEmail.reducer';
import changePassword from './changePassword.reducer';
import resetPassword from './resetPassword.reducer';
import validateResetToken from './validateResetToken.reducer';
import account from './account.reducer';
import alert from './alert.reducer';
import projects from './projects.reducer';
import bugs from './bugs.reducer';
import users from './users.reducer';

const rootReducer = combineReducers({
  account,
  registration,
  verifyEmail,
  changePassword,
  resetPassword,
  validateResetToken,
  alert,
  projects,
  bugs,
  users,
});
export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
