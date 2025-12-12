import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await connectDB();

    const { email, password } = await request.json();

    // 1) Validate input
    if (!email || !password) {
        return NextResponse.json(
            { message: "Thiếu thông tin (email/password)" },
            { status: 400 }
        );
    }

    // 2) Find user
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json(
            { message: "Email không tồn tại" },
            { status: 400 }
        );
    }

    // 3) Compare password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return NextResponse.json(
            { message: "Sai mật khẩu" },
            { status: 400 }
        );
    }

    // 4) Return user (không trả password)
    return NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
}
