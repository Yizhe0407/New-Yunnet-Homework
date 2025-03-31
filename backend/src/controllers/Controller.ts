// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUser, createUser } from '../data/users';

// 註冊使用者
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // 檢查使用者是否已存在
    const existingUser = await findUser(email);
    if (existingUser) {
      res.status(400).json({ message: '使用者已存在' });
      return;
    }

    // 密碼加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 創建新使用者
    const newUser = await createUser(email, hashedPassword);
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤', error });
  }
}

// 取得個人資料（需要驗證 token）
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const email = req.body.email;

  try {
    const user = await findUser(email);
    if (!user) {
      res.status(404).json({ message: '使用者不存在' });
      return;
    }

    res.status(200).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤', error });
  }
};