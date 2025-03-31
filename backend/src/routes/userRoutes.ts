// src/routes/userRoute.ts
import { Router } from 'express';
import { register, getProfile } from '../controllers/Controller';
import jwt from 'jsonwebtoken';

const router = Router();

// JWT 驗證 middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: '請提供 token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: '無效的 token' });
  }
};

// 註冊使用者
router.post('/register', register);

// 取得個人資料
router.get('/profile', authenticateToken, getProfile);

export default router;