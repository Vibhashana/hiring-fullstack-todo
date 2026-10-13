# Full Stack TODO App

A simple TODO app built with **React (Vite)** on the frontend and **Express + MongoDB (Mongoose)** on the backend, set up as an **npm workspaces** monorepo.

```
hiring-fullstack-todo/
├── client/   # React frontend (Vite)
├── server/   # Express REST API + Mongoose
└── package.json  # npm workspaces root
```

## Features

- List, create, edit, and delete TODOs
- Toggle done/undone (completed items are struck through and faded)
- Client- and server-side validation with readable error messages
- Loading, empty, and error states
- Optimistic updates for toggle and delete (rolled back if the request fails)

## Quick start

Requirements: Node.js 20.6+ and a MongoDB instance (local, Docker, or Atlas).

```bash
# 1. Install dependencies for both workspaces
npm install

# 2. Configure the server
cp server/.env.example server/.env   # edit MONGODB_URI if needed

# 3. (Optional) start MongoDB locally with Docker
docker run -d --name todo-mongo -p 27017:27017 mongo:7

# 4. Run client and server together
npm run dev
```

- Client: http://localhost:5173
- API: http://localhost:5000/api/todos

In development, Vite proxies `/api` to the server, so no CORS or URL config is needed.

## API

| Method | Endpoint               | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| GET    | `/api/todos`           | Get all TODO items                  |
| POST   | `/api/todos`           | Create a new TODO item              |
| PUT    | `/api/todos/:id`       | Update a TODO (title/description)   |
| PATCH  | `/api/todos/:id/done`  | Toggle the done status              |
| DELETE | `/api/todos/:id`       | Delete a TODO                       |

See [client/README.md](client/README.md) and [server/README.md](server/README.md) for details.
