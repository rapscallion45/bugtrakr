export interface IAccount {
  firstName?: string;
  lastName?: string;
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

export interface IAccountState {
  loading?: boolean;
  loaded?: boolean;
  error?: string;
  user?: IAccount;
}

export interface INotificationOptions {
  key?: number;
  variant?: string;
}

export interface INotification {
  key?: string;
  message?: string;
  options?: INotificationOptions;
}

export interface IAlertState {
  loading?: boolean;
  loaded?: boolean;
  error?: string;
  notifications?: INotification[];
}

export interface IUserState {
  id: string;
  username: string;
  token: string;
}

export interface IUserAuth {
  demo: boolean;
  id: string;
  username: string;
}

export interface IUser {
  id: string;
  username: string;
}

export interface IProjectMember {
  id: number;
  joinedAt: Date;
  member: IUser;
}

export interface INote {
  id: number;
  bugId: string;
  body: string;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectState {
  id: string;
  name: string;
  members: IProjectMember[];
  bugs: Array<{ id: string }>;
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export type BugPriority = 'low' | 'medium' | 'high';

export interface IBugState {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: BugPriority;
  notes: INote[];
  isResolved: boolean;
  createdBy: IUser;
  updatedBy?: IUser;
  closedBy?: IUser;
  reopenedBy?: IUser;
  closedAt?: Date;
  reopenedAt?: Date;
  updatedAt?: Date;
  createdAt: Date;
}

export type ProjectSortValues =
  | 'newest'
  | 'oldest'
  | 'a-z'
  | 'z-a'
  | 'most-bugs'
  | 'least-bugs'
  | 'most-members'
  | 'least-members';

export type ProjectMemberSortValues = 'newest' | 'oldest' | 'a-z' | 'z-a';

export type BugSortValues =
  | 'newest'
  | 'oldest'
  | 'a-z'
  | 'z-a'
  | 'closed'
  | 'reopened'
  | 'h-l'
  | 'l-h'
  | 'updated'
  | 'most-notes'
  | 'least-notes';

export type BugFilterValues = 'all' | 'closed' | 'open';

export interface ICredentialsPayload {
  username: string;
  password: string;
}

export interface IGoogleLoginPayload {
  tokenId: string;
}

export interface IFacebookLoginPayload {
  facebookId: string;
  authToken: string;
}

export interface IProjectPayload {
  name: string;
  members: string[];
}

export interface IBugPayload {
  title: string;
  description: string;
  priority: BugPriority;
}

export interface IEditedBugData extends IBugPayload {
  updatedAt: Date;
  updatedBy: IUser;
}

export interface IClosedReopenedBugData {
  isResolved: boolean;
  closedAt: Date;
  closedBy: IUser;
  reopenedAt: Date;
  reopenedBy: IUser;
}

export interface IVerifyEmailPayload {
  token: string;
  email: string;
}

export interface IChangePasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  resetToken: string;
  password: string;
  email: string;
}

export interface IValidateResetTokenPayload {
  resetToken: string;
  email: string;
}
