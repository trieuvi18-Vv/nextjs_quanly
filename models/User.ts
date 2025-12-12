import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Khai báo interface cho User (dùng cho TypeScript)
export interface IUser extends Document {
    name: string;
    email: string;
}

// 2. Định nghĩa schema (cấu trúc document trong MongoDB)
const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        timestamps: true, // tự động thêm createdAt, updatedAt
    }
);

// 3. Tránh lỗi "OverwriteModelError" khi hot reload trong Next.js
const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// 4. Export model để file khác dùng
export default User;
