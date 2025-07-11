This is a task-based test development model for Kameleon Labs. To log in, use the following credentials:



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
User: technology@kameleonlabs.ai
Password: #4nrsHSre1#@uPC$3ZR8


## Multi-provider Authentication Strategy
Multi-Provider Authentication Strategy
1. Logins
Azure/Odoo: Use the OAuth2 Authorization Code Flow with PKCE. Redirect the user to the provider's login page.
Custom APIs: Use JWTs stored in Redis.

Maintain a unified user profile that includes access to their different providers, allowing background user session management.
Store intermediate state (Redis, SessionStorage, LocalStorage) depending on the service type.

2. Token Storage and Renewal
Use Redis to store session security values, while short-lived expiration tokens are kept in Session Storage.

3. Authentication State in the UI
Validate data integrity and responses from different providers using services.

4. Considerations & Trade-offs
Security:

Use Redis storage to prevent client-side data leaks.