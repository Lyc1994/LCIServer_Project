import { Schema, model } from 'mongoose';

export interface user {
    userid: string,
    username: string,
}

const schema = new Schema<user>({
    userid: { type: String, required: true, unique: true },
    username: { type: String }
});
schema.index({ userid: 1 });

export const userModel = model<user>('User', schema);