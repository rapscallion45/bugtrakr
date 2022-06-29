interface IAccount {
  displayName?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
  photoURL?: string;
  address?: string;
  city?: string;
  country?: string;
  postcode?: string;
  description?: string;
}

type AccountState = {
  loading?: boolean;
  loaded?: boolean;
  error?: string;
  user?: IAccount;
};

type AccountAction = {
  type: string;
  error?: string;
  userData?: IAccount;
};

type AlertState = {
  loading?: boolean;
  loaded?: boolean;
  error?: string;
  notifications?: any[];
};

type AlertAction = {
  type: string;
  error?: string;
  key?: string;
  dismissAll?: boolean;
  notification?: any;
};

type AuthenticationState = {
  authenticating?: boolean;
  loggedIn?: boolean;
  demo?: boolean;
  user?: IAccount;
};

type AuthenticationAction = {
  type: string;
  userData?: IAccount;
};

type ChangePasswordState = {
  requestingPassword?: boolean;
  error?: string;
};

type ChangePasswordAction = {
  type: string;
  error?: string;
};

type ForgotPasswordState = {
  requestingPassword?: boolean;
  error?: string;
};

type ForgotPasswordAction = {
  type: string;
  error?: string;
};

type RegistrationState = {
  registering?: boolean;
  error?: string;
};

type RegistrationAction = {
  type: string;
  error?: string;
};

type ResetPasswordState = {
  resettingPassword?: boolean;
  error?: string;
};

type ResetPasswordAction = {
  type: string;
  error?: string;
};

type ValidateResetTokenState = {
  tokenValid?: string;
  error?: string;
};

type ValidateResetTokenAction = {
  type: string;
  error?: string;
};

type VerifyEmailState = {
  emailVerified?: string;
  error?: string;
};

type VerifyEmailAction = {
  type: string;
  error?: string;
};

type BugPriority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  username: string;
}

interface IProject {
  id: number;
  title: string;
  body: string;
}

interface IProjectMember {
  id: number;
  joinedAt: Date;
  member: User;
}

interface ProjectState {
  id?: string;
  name?: string;
  members?: IProjectMember[];
  bugs?: Array<{ id: string }>;
  createdBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProjectAction = {
  type?: string;
  projectId?: String;
  projectsData?: ProjectState[];
  error?: string;
};
