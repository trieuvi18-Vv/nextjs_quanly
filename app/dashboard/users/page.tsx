"use client";

import { useEffect, useState } from "react";

type User = {
    _id: string;
    name: string;
    email: string;
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [form, setForm] = useState({ name: "", email: "" });
    const [editId, setEditId] = useState<string | null>(null);

    // 1) Load danh sách
    const loadUsers = async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // 2) Submit: nếu có editId thì PUT, không có thì POST
    const submit = async () => {
        if (!form.name || !form.email) return;

        if (editId) {
            // UPDATE
            const res = await fetch(`/api/users/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const updatedUser = await res.json();

            // cập nhật UI ngay
            setUsers((prev) => prev.map((u) => (u._id === editId ? updatedUser : u)));
            setEditId(null);
            setForm({ name: "", email: "" });
            return;
        }

        // CREATE
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const newUser = await res.json();

        // thêm vào UI ngay
        setUsers((prev) => [newUser, ...prev]);
        setForm({ name: "", email: "" });
    };

    // 3) Xóa: DELETE và xóa khỏi state ngay
    const remove = async (id: string) => {
        const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (data.success) {
            setUsers((prev) => prev.filter((u) => u._id !== id));
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Quản lý người dùng</h1>

            <div className="bg-white shadow-lg p-6 rounded-xl mb-8 max-w-lg">
                <input
                    placeholder="Tên người dùng"
                    className="w-full p-3 border rounded-lg mb-3"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg mb-4"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <button
                    onClick={submit}
                    className={`w-full text-white rounded-lg py-3 ${
                        editId ? "bg-blue-600" : "bg-green-600"
                    }`}
                >
                    {editId ? "Cập nhật" : "Thêm mới"}
                </button>
            </div>

            <div className="space-y-4 max-w-lg">
                {users.map((u) => (
                    <div
                        key={u._id}
                        className="bg-white shadow-md p-5 rounded-lg flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-bold">{u.name}</h3>
                            <p className="text-gray-600">{u.email}</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => {
                                    setEditId(u._id);
                                    setForm({ name: u.name, email: u.email });
                                }}
                            >
                                Sửa
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => remove(u._id)}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
