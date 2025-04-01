"use client"
import { z } from 'zod';
import Link from 'next/link';
import { api } from '@/lib/api'
import toast from 'react-hot-toast';
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/magicui/border-beam"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const userSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Must be at least 6 characters'),
});
type UserSchema = z.infer<typeof userSchema>;

export default function LoginInterface() {
    const [formData, setFormData] = useState<UserSchema>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof UserSchema, string>>>({}); //處理錯誤訊息

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //更新表單狀態，確保輸入值與 state 同步
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            userSchema.parse(formData);
            setErrors({});

            const response = await api.login(formData);
            const data = await response.json()

            if (!response.ok) {
                if (response.status === 401) {
                    if (data.message === "Invalid Password") {
                        toast.error("Invalid Password");
                    } else if (data.message === "User not exists") {
                        toast.error("User Not Exists");
                    }
                } else {
                    toast.error(data.message || "Registration failed");
                }
                throw new Error(data.message || "註冊失敗");
            }

            // 儲存 JWT token
            const token = data.token;
            localStorage.setItem("token", token); // 將 token 儲存在 localStorage


            console.log('登入成功:', { formData, token });
            window.location.href = "/dashboard";
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof UserSchema, string>> = {};
                error.errors.forEach(err => {
                    const field = err.path[0] as keyof UserSchema;
                    newErrors[field] = err.message;
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <Card className="relative w-[350px] overflow-hidden">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href='/register'>
                    <Button variant="outline" type="button">Register</Button>
                </Link>
                <Button onClick={handleSubmit}>
                    Login
                </Button>
            </CardFooter>
            <BorderBeam duration={8} size={100} />
        </Card>
    )
}
