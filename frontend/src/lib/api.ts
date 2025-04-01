// src/lib/api.ts
import { z } from 'zod';

const userSchema = z.object({
    username: z.string().min(3, 'Must be at least 3 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Must be at least 6 characters'),
});
type UserSchema = z.infer<typeof userSchema>;

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Must be at least 6 characters'),
});
type LoginSchema = z.infer<typeof loginSchema>; // 使用 PascalCase

export const api = {
    register: async (data: UserSchema) => {
        userSchema.parse(data); // 驗證資料
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    },
    login: async (data: LoginSchema) => {
        loginSchema.parse(data); // 驗證資料
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    },
    profile: async (token: string) => {
        const response = await fetch("/api/auth/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response;
    },
};