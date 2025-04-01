"use client"
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { IdCard, User, Mail } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BorderBeam } from "@/components/magicui/border-beam";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";

export default function DashboardInterface() {
    const [user, setUser] = useState<{ id: string; name?: string; email?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            router.push("/login");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await api.profile(token);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "無法驗證身份");
                }

                const data = await response.json();
                setUser(data);
                toast.success("Login Successful !");
            } catch (error: any) {
                console.error("獲取用戶資料失敗:", error);
                toast.error(error.message || "身份驗證失敗，請重新登入");
                localStorage.removeItem("token");
                router.push("/login");
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged Out");
        router.push("/login");
    };

    if (!user) {
        return (
            <div className="flex w-full h-screen items-center justify-center font-bold">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <Card className="relative w-[450px] overflow-hidden">
            <CardHeader>
                <CardTitle>User infomation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 font-bold">
                    <p className='flex gap-2'><User />User ID : {user.id}</p>
                    {user.name && <p className='flex gap-2'><IdCard />Name : {user.name}</p>}
                    {user.email && <p className='flex gap-2'><Mail />Email : {user.email}</p>}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleLogout}>登出</Button>
            </CardFooter>
            <BorderBeam duration={8} size={100} />
        </Card>
    )
}
