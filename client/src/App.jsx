import { useEffect, useState } from 'react';
import * as api from './api.js';
import TodoForm from './components/TodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getTodos()
      .then(setTodos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(values) {
    const todo = await api.createTodo(values);
    setTodos((prev) => [todo, ...prev]);
  }

  async function handleUpdate(id, values) {
    const updated = await api.updateTodo(id, values);
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  // Toggle and delete update the UI right away and roll back if the request fails.
  async function handleToggle(id) {
    const previous = todos;
    setTodos((prev) => prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t)));
    try {
      await api.toggleTodo(id);
    } catch (err) {
      setTodos(previous);
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    const previous = todos;
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.deleteTodo(id);
    } catch (err) {
      setTodos(previous);
      setError(err.message);
    }
  }

  const remaining = todos.filter((t) => !t.done).length;

  let content;
  if (loading) {
    content = (
      <ul className="todo-list" aria-busy="true" aria-label="Loading todos">
        {[1, 2, 3].map((n) => (
          <li key={n} className="todo-item skeleton">
            <span className="skeleton-box skeleton-check" />
            <div className="todo-content">
              <span className="skeleton-box skeleton-title" />
              <span className="skeleton-box skeleton-text" />
            </div>
          </li>
        ))}
      </ul>
    );
  } else if (todos.length === 0) {
    content = <p className="status">Nothing to do yet. Add your first TODO above.</p>;
  } else {
    content = (
      <>
        <p className="summary">
          {remaining} of {todos.length} remaining
        </p>
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </>
    );
  }

  return (
    <main className="container">
      <h1>TODOs</h1>
      <TodoForm onSubmit={handleCreate} />

      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button className="link" onClick={() => setError('')}>Dismiss</button>
        </div>
      )}

      {content}
    </main>
  );
}
