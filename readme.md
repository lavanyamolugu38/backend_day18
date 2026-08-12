# WorkHub – Day 18 Backend & End-to-End Integration

## Project Overview

WorkHub is a full-stack project and timesheet management application.

Day 18 focused on connecting the Next.js frontend with the Node.js backend and Supabase database to make the application work with real data.

## Technologies Used

* Next.js 16.3.0
* React
* TypeScript
* Tailwind CSS
* Node.js
* Express.js
* Supabase
* PostgreSQL
* REST API

## Project Structure

```text
workhub-slice
├── frontend-next
│   ├── app
│   │   ├── api
│   │   │   └── dashboard
│   │   │       └── route.ts
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── ...
│   └── ...
│
├── backend_day18
│   ├── config
│   ├── middleware
│   ├── routes
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── README.md
└── reflection.md
```

## Application Architecture

```text
Next.js Frontend
      │
      ▼
Next.js API Route
/api/dashboard
      │
      ▼
Supabase
      │
      ├── Projects
      ├── Tasks
      └── Timesheet Entries

Next.js Frontend
      │
      ▼
Node.js / Express Backend
      │
      └── Employees API
```

## Backend

The Node.js backend is located in:

```text
backend_day18
```

Start the backend:

```powershell
cd "C:\Users\Administrator.BOBSEV\Desktop\backend_day18"
node index.js
```

Backend runs on:

```text
http://127.0.0.1:3001
```

## Frontend

The Next.js frontend is located in:

```text
frontend-next
```

Start the frontend:

```powershell
cd "C:\Users\Administrator.BOBSEV\Desktop\intigration day16\frontend-next"
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

## Dashboard

Open the dashboard:

```text
http://localhost:3000/dashboard
```

The dashboard displays:

* Total Projects
* Active Tasks
* Hours Logged
* Total Employees

## Dashboard API

The dashboard API route is:

```text
app/api/dashboard/route.ts
```

Endpoint:

```text
GET /api/dashboard
```

The API retrieves real data from Supabase.

The dashboard API returns:

* Projects
* Tasks
* Timesheet entries

## API Verification

The API was tested using:

```text
http://localhost:3000/api/dashboard
```

The API successfully returned real Supabase data.

At the time of testing:

* Projects: 4
* Tasks: 1
* Timesheet entries: 0

This confirmed that the frontend API route was successfully connected to Supabase.

## Environment Variables

Environment variables are used to keep configuration and secrets outside the source code.

Examples:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Backend environment variables are stored in the backend `.env` file.

Do not commit `.env` files or secret keys to GitHub.

## Error Handling

The dashboard API uses error handling for failed Supabase requests.

The frontend also handles loading and error states while fetching dashboard data.

## Integration Issue Fixed

During integration, a routing conflict occurred because `route.ts` was accidentally created inside:

```text
app/dashboard
```

while `page.tsx` already existed in the same route.

Next.js reported:

```text
Conflicting route and page at /dashboard
```

The issue was fixed by removing the incorrect file and creating the API route at:

```text
app/api/dashboard/route.ts
```

The final structure is:

```text
app
├── dashboard
│   └── page.tsx
│
└── api
    └── dashboard
        └── route.ts
```

## Running the Application

Open two terminals.

### Terminal 1 – Backend

```powershell
cd "C:\Users\Administrator.BOBSEV\Desktop\backend_day18"
node index.js
```

### Terminal 2 – Frontend

```powershell
cd "C:\Users\Administrator.BOBSEV\Desktop\intigration day16\frontend-next"
npm run dev
```

Then open:

```text
http://localhost:3000/dashboard
```

## Day 18 Outcome

The frontend and backend were successfully connected.

The dashboard receives real Project, Task, and Timesheet data from Supabase through the Next.js API route.

The integration also included debugging routing conflicts, API connectivity, environment variables, loading states, and error handling.

## Future Improvements

* Complete Supabase Auth integration
* Protect all API endpoints with JWT
* Add POST `/timesheets`
* Connect the timesheet form to the API
* Verify logged hours are persisted after refresh
* Verify unauthenticated requests return `401`
