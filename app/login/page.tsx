"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        alert("Đăng nhập thành công!");
        router.push("/dashboard/users");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

                <input
                    className="w-full border p-3 rounded mb-3"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    className="w-full border p-3 rounded mb-4"
                    placeholder="Mật khẩu"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button
                    onClick={submit}
                    className="w-full bg-blue-600 text-white py-3 rounded"
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    );
}
