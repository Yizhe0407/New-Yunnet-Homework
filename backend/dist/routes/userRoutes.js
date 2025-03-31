"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/users', userController_1.getUsers); // GET /api/users - 取得所有使用者
router.post('/users', userController_1.addUser); // POST /api/users - 新增使用者
exports.default = router;
