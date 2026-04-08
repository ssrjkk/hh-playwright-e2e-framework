const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const users = new Map();
const todos = new Map();
let authToken = null;

app.post('/api/auth/register', (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({ message: 'Missing required fields' });
  }
  if (users.has(email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const user = { id: uuidv4(), email, name, password };
  users.set(email, user);
  const token = uuidv4();
  authToken = token;
  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.get(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = uuidv4();
  authToken = token;
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ id: '1', email: 'test@test.com', name: 'Test User' });
});

app.get('/api/todos', (req, res) => {
  res.json({ todos: Array.from(todos.values()), total: todos.size, page: 1, limit: 10 });
});

app.post('/api/todos', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const todo = { id: uuidv4(), title, completed, userId: '1', createdAt: new Date().toISOString() };
  todos.set(todo.id, todo);
  res.status(201).json(todo);
});

app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.get(id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  const updated = { ...todo, ...req.body, updatedAt: new Date().toISOString() };
  todos.set(id, updated);
  res.json(updated);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  if (!todos.has(id)) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  todos.delete(id);
  res.status(204).send();
});

app.post('/api/todos/:id/toggle', (req, res) => {
  const { id } = req.params;
  const todo = todos.get(id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  todo.completed = !todo.completed;
  todos.set(id, todo);
  res.json(todo);
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = 3000;
app.listen(PORT, () => console.log(`Mock server running on http://localhost:${PORT}`));
