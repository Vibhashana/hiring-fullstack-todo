import { Router } from 'express';
import Todo from '../models/Todo.js';

const router = Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description });
  res.status(201).json(todo);
});

router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true, runValidators: true }
  );
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

router.patch('/:id/done', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  todo.done = !todo.done;
  await todo.save();
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.status(204).end();
});

export default router;
