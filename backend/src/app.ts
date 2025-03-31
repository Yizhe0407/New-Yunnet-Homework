// src/app.ts
import express, { Application } from 'express';
import userRoutes from './routes/userRoutes';

const app: Application = express();

app.use(express.json()); // 解析 JSON 請求主體
app.use('/api', userRoutes); // 將路由掛載到 /api 路徑下

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`伺服器運行於 http://localhost:${PORT}`);
});