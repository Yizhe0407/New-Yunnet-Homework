// src/controllers/userController.ts
import { Request, Response } from 'express';
import { users } from '../data/users';
import { User } from '../models/user';

export const getUsers = (req: Request, res: Response): void => {
  res.status(200).json(users);
};

export const addUser = (req: Request, res: Response): void => {
  const newUser: User = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    createdAt: new Date(),
  };
  users.push(newUser);
  res.status(201).json(newUser);
};