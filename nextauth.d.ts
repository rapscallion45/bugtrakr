import { DefaultUser } from 'next-auth';

/**
 * nextauth.d.ts
 *
 * Extensions to NextAuth "User" AND "Session" objects
 *
 */

interface IUser extends DefaultUser {
  /**
   * User ID
   */
  uid: string;
  /**
   * User's username
   */
  username?: string;
  /**
   * Demo mode account flag
   */
  demo: boolean;
}

declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
