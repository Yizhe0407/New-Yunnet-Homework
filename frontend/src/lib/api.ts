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
type loginSchema = z.infer<typeof loginSchema>;

export const api = {
    register: async (data: UserSchema) => {
        const response = await fetch("http://localhost:4000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    },
    login: async (data: loginSchema) => {
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response;
    },
    profile: async (token: string) => {
        const response = await fetch("http://localhost:4000/api/auth/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response;
    }
}