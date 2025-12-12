import User from "@/models/User";
import { connectDB } from "@/lib/mongoose";

/**
 * Hàm foo:
 * - Kết nối database
 * - Tìm user theo email, nếu chưa có thì tạo mới
 * - Luôn trả về document mới nhất (option { new: true })
 */
export async function foo() {
    // 1. Kết nối MongoDB (dùng mongoose.ts)
    await connectDB();

    // 2. Tìm và cập nhật (hoặc tạo mới nếu chưa tồn tại)
    const user = await User.findOneAndUpdate(
        { email: "test@gmail.com" },                // điều kiện tìm
        { name: "Test User", email: "test@gmail.com" }, // dữ liệu cập nhật / insert
        {
            new: true,   // ← trả về document mới sau khi cập nhật
            upsert: true // ← nếu không tồn tại thì tạo mới
        }
    );

    // 3. Trả về dữ liệu cho nơi gọi
    return user;
}
