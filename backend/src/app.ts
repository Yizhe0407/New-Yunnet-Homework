// src/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();

// 設定 CORS 允許來自前端的請求
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

// 掛載路由
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`伺服器運行於 http://localhost:${PORT}`);
});