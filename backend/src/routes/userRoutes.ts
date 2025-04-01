import { Router, Request, Response, NextFunction } from 'express';
import { register, login, getProfile } from '../controllers/Controller'; // 確保路徑正確
import jwt from 'jsonwebtoken';

// 自訂 Request 介面
interface AuthRequest extends Request {
    userId?: number;
}

const router = Router();

// JWT 驗證 middleware
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        res.status(401).json({ message: '請提供 token' });
        return; // 這裡不需要返回值，因為 res.json() 已經處理回應
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        req.userId = decoded.id;
        next(); // 繼續處理下一個中間件或路由
    } catch (error) {
        console.error('Token 驗證失敗:', error);
        res.status(403).json({ message: '無效的 token' });
        return; // 同樣不需要返回值
    }
};

// 註冊使用者
router.post('/register', register);

// 登入使用者
router.post('/login', login);

// 取得個人資料
router.get('/profile', authenticateToken, getProfile);

export default router;