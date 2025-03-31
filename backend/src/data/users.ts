// src/data/users.ts
import { User } from '../models/user';

export let users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', createdAt: new Date() },
  { id: 2, name: 'Bob', email: 'bob@example.com', createdAt: new Date() },
];