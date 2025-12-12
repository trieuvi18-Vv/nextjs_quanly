"use client";

import { useState, useEffect } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "" });
    const [editId, setEditId] = useState("");

    // Lấy danh sách user từ API
    const loadUsers = async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // Thêm user
    const addUser = async () => {
        await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(form),
        });

        setForm({ name: "", email: "" });
        loadUsers();
    };

    // Cập nhật user
    const updateUser = async () => {
        await fetch(`/api/users/${editId}`, {
            method: "PUT",
            body: JSON.stringify(form),
        });

        setEditId("");
        setForm({ name: "", email: "" });
        loadUsers();
    };

    // Xoá user
    const deleteUser = async (id: string) => {
        await fetch(`/api/users/${id}`, {
            method: "DELETE",
        });

        loadUsers();
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Quản lý User</h1>

            <div style={{ marginBottom: 20 }}>
                <input
                    placeholder="Tên"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                {editId ? (
                    <button onClick={updateUser}>Cập nhật</button>
                ) : (
                    <button onClick={addUser}>Thêm</button>
                )}
            </div>

            <ul>
                {users.map((u: any) => (
                    <li key={u._id} style={{ marginBottom: 10 }}>
                        <b>{u.name}</b> — {u.email}

                        <button
                            style={{ marginLeft: 10 }}
                            onClick={() => {
                                setEditId(u._id);
                                setForm({ name: u.name, email: u.email });
                            }}
                        >
                            Sửa
                        </button>

                        <button
                            style={{ marginLeft: 10, color: "red" }}
                            onClick={() => deleteUser(u._id)}
                        >
                            Xoá
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
