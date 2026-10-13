# TODO API (server)

Express 5 REST API that stores TODOs in MongoDB using Mongoose.

## Setup & run

```bash
# from the repo root
npm install
cp server/.env.example server/.env

npm run dev:server        # watch mode (node --watch)
# or
npm start                 # production mode
```

The server listens on `PORT` (default `5000`).

## Environment variables

| Variable      | Default                              | Description                |
| ------------- | ------------------------------------ | -------------------------- |
| `PORT`        | `5000`                               | HTTP port                  |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/todos`    | MongoDB connection string  |

`.env` is loaded with Node's built-in `--env-file` flag, so no `dotenv` dependency is needed (Node 20.6+).

## MongoDB connection notes

- **Local:** install MongoDB or run it in Docker:
  ```bash
  docker run -d --name todo-mongo -p 27017:27017 mongo:7
  ```
  and keep the default `MONGODB_URI`.
- **Atlas:** create a free cluster, add your IP to the network access list, and set
  `MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/todos`.

The server exits on startup if it cannot connect to MongoDB.

## Data model

```js
{
  _id: ObjectId,
  title: String,        // required, trimmed, max 200 chars
  description: String,  // optional, trimmed, max 1000 chars
  done: Boolean,        // default false
  createdAt: Date,
  updatedAt: Date
}
```

## Endpoints

| Method | Endpoint              | Body                         | Response              |
| ------ | --------------------- | ---------------------------- | --------------------- |
| GET    | `/api/todos`          | –                            | `200` array (newest first) |
| POST   | `/api/todos`          | `{ title, description? }`    | `201` created todo    |
| PUT    | `/api/todos/:id`      | `{ title, description? }`    | `200` updated todo    |
| PATCH  | `/api/todos/:id/done` | –                            | `200` toggled todo    |
| DELETE | `/api/todos/:id`      | –                            | `204` no content      |

Errors are returned as `{ "error": "message" }`:

- `400` – validation error (e.g. missing title) or malformed id
- `404` – todo not found
- `500` – unexpected server error

## Assumptions & limitations

- No authentication; all TODOs are shared by everyone using the API.
- No pagination; `GET /api/todos` returns all items.
- `PUT` replaces both title and description; omitting `description` keeps the current value.
- CORS is open to all origins to keep local development simple.
