import type {} from 'next-auth/react';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    token?: string;
    username?: string;
  }
  interface Session {
    user: DefaultSession['user'] & { uid: string; username: string; demo: boolean };
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    token?: string;
    uid?: string;
    username?: string;
  }
}

// NextAuth v4 still references the pre-React 19 global JSX namespace.
declare module 'next-auth/react' {
  function SessionProvider(props: import('next-auth/react').SessionProviderProps): React.JSX.Element;
}
