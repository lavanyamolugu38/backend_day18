
## `reflection.md`

```markdown
# Day 18 Reflection

## 1. What broke when I connected front to back, and how did I fix it?

When I connected the frontend and backend, I faced API connection and Next.js routing issues. I also accidentally created `route.ts` inside `app/dashboard`, which caused a route conflict because `page.tsx` already existed there. I fixed it by keeping the dashboard UI in `app/dashboard/page.tsx` and moving the API route to `app/api/dashboard/route.ts`.

## 2. How does the whole app fit together now?

The Next.js frontend runs on port 3000 and communicates with the backend running on port 3001. The dashboard uses the `/api/dashboard` route to retrieve Projects, Tasks, and Timesheet data from Supabase, while employee data is retrieved from the backend API.

## 3. Did AI forget the auth header or error handling?

AI-generated code can sometimes forget the Authorization header or loading and error handling. During this integration I checked the API calls and added error handling with `try/catch` and response status checks. For protected endpoints, the JWT must be sent using the `Authorization: Bearer <token>` header, and the token should never be logged or exposed.

## What I Learned

I learned how frontend, backend, API routes, authentication, and databases work together in a full-stack application.

I also learned how to debug integration problems by checking ports, API responses, file locations, and server output.

Testing `/api/dashboard` confirmed that the Next.js API route could successfully retrieve real data from Supabase.

## Final Reflection

This Day 18 work helped me understand that integration is not only about writing API calls. The frontend, backend, authentication, database, environment variables, error handling, and correct routing all need to work together for a reliable application.