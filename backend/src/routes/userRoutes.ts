// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUsers, addUser } from '../controllers/userController';

const router = Router();

router.get('/users', getUsers); // GET /api/users - 取得所有使用者
router.post('/users', addUser); // POST /api/users - 新增使用者

export default router;