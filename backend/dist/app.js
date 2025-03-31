"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // 解析 JSON 請求主體
app.use('/api', userRoutes_1.default); // 將路由掛載到 /api 路徑下
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`伺服器運行於 http://localhost:${PORT}`);
});
