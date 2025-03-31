// src/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

// 掛載路由
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器運行於 http://localhost:${PORT}`);
});