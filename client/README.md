# TODO App (client)

React 19 frontend built with Vite. No UI library; styling is plain CSS in `src/index.css`.

## Setup & run

The backend must be running (see [../server/README.md](../server/README.md)).

```bash
# from the repo root
npm install
npm run dev:client      # http://localhost:5173
```

Or run client and server together from the root with `npm run dev`.

Production build:

```bash
npm run build           # outputs to client/dist
```

## Configuration

In development, Vite proxies `/api` requests to `http://localhost:5000` (see `vite.config.js`), so no config is needed.

If the API is hosted elsewhere, set `VITE_API_URL` (see `.env.example`), e.g. `VITE_API_URL=https://my-api.example.com`.

## Structure

```
src/
├── api.js                  # fetch wrapper for the REST API
├── App.jsx                 # state, data loading, handlers
├── components/
│   ├── TodoForm.jsx        # create/edit form with validation
│   └── TodoItem.jsx        # single todo row (toggle, edit, delete)
├── index.css
└── main.jsx
```

## Behaviour

- **Loading/error states:** shimmering skeleton rows while fetching, and a dismissible error banner for failed requests (including "server unreachable").
- **Validation:** title is required (whitespace-only is rejected), with length limits matching the server. Server validation errors are shown inline on the form.
- **Optimistic updates:** toggling and deleting update the UI immediately and roll back if the request fails. Create and edit wait for the server, so the form can show validation errors.
- Completed TODOs are struck through and faded.
- **Animations (CSS only):** items fade in when added and slide out when deleted. The checkbox pops when ticked, form errors shake, and the error banner slides in. All of this is reduced to near-instant when the OS "reduce motion" setting is on.

## Assumptions & limitations

- State is kept in `App` with `useState`; no state library, since the app is small.
- Single list, no filtering, sorting, or pagination.
- No authentication.
