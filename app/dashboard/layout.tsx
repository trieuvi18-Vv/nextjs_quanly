"use client";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* SIDEBAR */}
            <aside className="w-64 bg-blue-600 text-white p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                <nav className="space-y-4">
                    <a href="/dashboard" className="block hover:underline">
                        Trang chủ
                    </a>
                    <a href="/dashboard/users" className="block hover:underline">
                        Quản lý người dùng
                    </a>
                </nav>
            </aside>

            {/* MAIN */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
