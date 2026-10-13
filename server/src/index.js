import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import todosRouter from './routes/todos.js';

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todos';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/todos', todosRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Express 5 forwards rejected promises from async handlers here.
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ error: message });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid todo id' });
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

try {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
} catch (err) {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
}
