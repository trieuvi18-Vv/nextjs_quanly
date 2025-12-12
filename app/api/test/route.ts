import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        return NextResponse.json({ message: "MongoDB connected successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to connect to MongoDB" },
            { status: 500 }
        );
    }
}
