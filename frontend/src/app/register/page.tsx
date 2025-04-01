"use client"
import React, { useState } from 'react'
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

const userSchema = z.object({
    username: z.string().min(3, 'Must be at least 3 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Must be at least 6 characters'),
});

type UserSchema = z.infer<typeof userSchema>;

export default function page() {
    const [formData, setFormData] = useState<UserSchema>({
        username: '',
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

            const response = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                })
            })

            const data = await response.json()

            if (!response.ok) {
                if (response.status === 400) {
                    toast.error("User already exists");
                } else {
                    toast.error(data.message || "Registration failed");
                }
                throw new Error(data.message || "註冊失敗");
            }

            toast.success("Registration successful!");
            console.log("註冊成功:", data);
            window.location.href = "/login";
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof UserSchema, string>> = {};
                error.errors.forEach(err => {
                    const field = err.path[0] as keyof UserSchema;
                    newErrors[field] = err.message;
                });
                setErrors(newErrors);
            }
            else {
                console.error("提交錯誤:", error);
            }
        }
    };

    return (
        <div className="flex w-full h-screen items-center justify-center">
            <Card className="relative w-[350px] overflow-hidden">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Create a new account to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Name</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm">{errors.username}</p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
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
                <CardFooter className="flex justify-between mt-4">
                    <Link href='/login'>
                        <Button variant="outline" type="button">
                            Back to Login
                        </Button>
                    </Link>

                    <Button onClick={handleSubmit}>
                        Register
                    </Button>
                </CardFooter>
                <BorderBeam duration={8} size={100} />
            </Card>
        </div>
    )
}
