import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    await connectDB();
    const body = await request.json();

    const updatedUser = await User.findByIdAndUpdate(params.id, body, {
        new: true,
    });

    return NextResponse.json(updatedUser);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await connectDB();
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
}
