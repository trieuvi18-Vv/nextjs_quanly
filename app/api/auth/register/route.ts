import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await connectDB();

    const { name, email, password } = await request.json();

    // 1) Validate input
    if (!name || !email || !password) {
        return NextResponse.json(
            { message: "Thiếu thông tin (name/email/password)" },
            { status: 400 }
        );
    }

    // 2) Check email exist
    const exist = await User.findOne({ email });
    if (exist) {
        return NextResponse.json(
            { message: "Email đã tồn tại" },
            { status: 400 }
        );
    }

    // 3) Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4) Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    // 5) Return user (không trả password)
    return NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
}
