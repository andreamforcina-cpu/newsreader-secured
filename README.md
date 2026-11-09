# NewsReader — Assignment 9

React Context authentication demonstration with regular/admin roles, guarded saved/admin routes, and per-username bookmarks. Based on the RizeComputerScience/COMPSX-NewsReader template.

## Run

Requires Node 20.19+ or 22.12+.

1. Run `npm ci`.
2. Copy `.env.example` to `.env` and set your own NY Times API key. Enable Top Stories and Article Search for that key.
3. Run `npm run dev`. Use any nonempty demo username/password and select Regular or Admin.
4. Run `npm run lint` and `npm run build` to validate.

## Verify behavior

- Open `/saved` while logged out: redirects to login.
- Log in as Alice (regular), save an article, and log out.
- Log in as Bob (regular): Alice's bookmarks are absent. Save a different article.
- Log in as Alice again without refreshing: her bookmarks remain in this session.
- Regular users have no Admin link; opening `/admin` redirects home.
- Log in with the admin demo role: the Admin page displays the saved articles grouped by username.
- Duplicate bookmarks are ignored; removing one user's bookmark does not change another user's articles.
- Logout removes the current authenticated user. A full refresh resets all demo state.

## Deployment

Import this repository into Vercel using the Vite preset. Add `VITE_NY_TIMES_API_KEY` to the environment variables before deploying. The included rewrite supports direct links to SPA routes. Redeploy when the environment variable changes.

## Security scope

This is the frontend-only simulation requested by the course, not production authentication. Users select their demo role and all state lives in browser memory. Real authentication, role assignment, and per-user authorization must be enforced on a server. Do not enter real passwords or store private data here.

`.env` files are excluded from git. A Vite variable beginning with `VITE_` is embedded in the client bundle and is visible to browser users; environment configuration avoids committing the key, but does not make it secret. A real secret API key belongs behind a server-side proxy. React renders article text without raw HTML, external links use `noopener noreferrer`, and search terms are URL encoded.
