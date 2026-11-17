# BugTrakr

BugTrakr tracks projects, their members, and the bugs reported against them. The frontend runs Next.js 16, React 19, MUI, Redux, and NextAuth. The [project site](https://bugtrakr.vercel.app) and the [Express API](https://github.com/rapscallion45/bugtrakr-server) deploy separately.

## Using BugTrakr

- **Try the demo.** Choose the demo sign-in on the login page. Demo visitors share the same account and project data. Use sample information. To keep your own projects, choose **Create Account** and register separately.
- **Sign in.** Use a BugTrakr username and password, or a configured Google or GitHub provider. To attach GitHub to an existing account, sign in first and choose **Connect GitHub account** in **My Account**. Your verified primary GitHub email must match the account email.
- **Manage projects.** Create a project in the dashboard and choose registered users from the member picker. The project owner can rename the project and manage membership. Open a project to see its bugs and members.
- **Track bugs.** Create a bug with a title, description, and priority. Open it to read or add notes, edit it, or change its status. **My Bugs** lists bugs you reported across projects. The row menu on mobile includes the same edit, close, reopen, and delete actions, subject to permissions.
- **Recover an account.** Choose **Forgot Password**, request a code for the registered email, then enter the code and a new password. The recovery code expires after five minutes and can be used once. The shared demo account has a fixed password.

## How requests work

The browser sends its NextAuth session cookie to the Next.js API routes under `/api`. On sign-in the frontend exchanges credentials, a Google ID token, or a GitHub access token for a BugTrakr identity. NextAuth keeps the backend credential inside the encrypted session token. Protected Next.js routes read it server-side and call Express with `x-auth-token`. Express reads and writes PostgreSQL. The browser-visible session contains account information for the UI.

## Local development

Use Node 24 and npm. Start the [API and database](https://github.com/rapscallion45/bugtrakr-server#local-development), run `npm ci` here, and create `.env.local` with the following settings.

| Name | Local value or purpose |
| --- | --- |
| `API_REST_URL` | Full API origin, such as `http://localhost:3001` |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | A persistent, randomly generated session-encryption secret |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth client for web sign-in |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth app for sign-in and account linking |

Run `npm run dev` and open [localhost:3000](http://localhost:3000). Each OAuth button appears when both variables for that provider are present. Register the callback URLs on the **frontend** origin, using `/api/auth/callback/google` and `/api/auth/callback/github`. Configure matching provider credentials on the API as described in its README.

## Hosting on Vercel

Deploy this repository as a Next.js project and the API as a separate project. Point `API_REST_URL` at the API's stable HTTPS origin and `NEXTAUTH_URL` at the public frontend origin. Configure production and preview values separately and redeploy after changing environment variables. For local changes, `vercel deploy --prod --skip-domain` builds a production candidate and `vercel promote <deployment-url>` assigns the live domain after verification.

For GitHub, register a web OAuth app with the homepage `https://bugtrakr.vercel.app` and callback `https://bugtrakr.vercel.app/api/auth/callback/github`. For Google, register a web application OAuth client with redirect URI `https://bugtrakr.vercel.app/api/auth/callback/google`. Enter provider secrets in the Vercel project settings. [GitHub OAuth app setup](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) · [Google web application credentials](https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred)

Before publishing, check the API's `/healthz`, open the demo dashboard, open its sample project, and check **My Bugs**. Test OAuth callbacks and email delivery with accounts you control once provider settings are configured.

## Checks

| Command | What it verifies |
| --- | --- |
| `npm run lint` and `npm run format:check` | Manage's ESLint and Prettier conventions plus Next.js rules |
| `npm run typecheck` | TypeScript |
| `npm test -- --runInBand` | Component, state, and API regression tests |
| `npm run build && npm run test:auth:production` | A production build and a real credentials sign-in against a local fixture API |
| `node scripts/check-demo.mjs https://bugtrakr.vercel.app` | Read-only check of the live demo dashboard, project, bug list, and member directory |
