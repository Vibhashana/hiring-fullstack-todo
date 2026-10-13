import { useState } from 'react';
import TodoForm from './TodoForm.jsx';

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [leaving, setLeaving] = useState(false);

  if (editing) {
    return (
      <li className="todo-item">
        <TodoForm
          initial={todo}
          submitLabel="Save"
          onCancel={() => setEditing(false)}
          onSubmit={async (values) => {
            await onUpdate(todo._id, values);
            setEditing(false);
          }}
        />
      </li>
    );
  }

  return (
    <li
      className={`todo-item${todo.done ? ' done' : ''}${leaving ? ' leaving' : ''}`}
      // Remove the item only once its exit animation has finished.
      onAnimationEnd={(e) => e.animationName === 'fade-out' && onDelete(todo._id)}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo._id)}
        aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
      />
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.description && <p className="todo-description">{todo.description}</p>}
      </div>
      <div className="todo-actions">
        <button className="secondary" onClick={() => setEditing(true)}>Edit</button>
        <button className="danger" onClick={() => setLeaving(true)} disabled={leaving}>Delete</button>
      </div>
    </li>
  );
}
