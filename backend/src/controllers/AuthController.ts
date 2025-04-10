// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUser, findUserById, createUser } from '../data/Users';

interface AuthRequest extends Request {
  userId?: number; // userId 來自 JWT 中間件的解碼
}

// 註冊使用者
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // 檢查使用者是否已存在
    const existingUser = await findUser(email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    // 密碼加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 創建新使用者
    const newUser = await createUser(username, email, hashedPassword);
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤', error });
  }
}

// 登入使用者
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // 檢查使用者是否存在
    const user = await findUser(email);
    if (!user) {
      res.status(401).json({ message: 'User not exists' });
      return;
    }

    // 驗證密碼
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // 生成 JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤', error });
  }
}

// 取得個人資料（需要驗證 token）
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
      const userId = req.userId;
      if (!userId) {
          res.status(401).json({ message: '未授權' });
          return;
      }

      const user = await findUserById(userId);
      if (!user) {
          res.status(404).json({ message: '使用者不存在' });
          return;
      }

      res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
      console.error('獲取用戶資料錯誤:', error);
      res.status(500).json({ message: '伺服器錯誤', error });
  }
};