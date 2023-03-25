import { Schema, model } from "mongoose";

export interface User {
    name: string;
    age: number
}

const schema = new Schema<User>({
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
});
schema.index({ name: 1 });

export const UserModel = model<User>("User", schema);