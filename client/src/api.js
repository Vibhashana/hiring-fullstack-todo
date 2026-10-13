const BASE_URL = `${import.meta.env.VITE_API_URL || ''}/api/todos`;

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(BASE_URL + path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('Could not reach the server. Is it running?');
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const getTodos = () => request('');
export const createTodo = (todo) => request('', { method: 'POST', body: JSON.stringify(todo) });
export const updateTodo = (id, todo) => request(`/${id}`, { method: 'PUT', body: JSON.stringify(todo) });
export const toggleTodo = (id) => request(`/${id}/done`, { method: 'PATCH' });
export const deleteTodo = (id) => request(`/${id}`, { method: 'DELETE' });
