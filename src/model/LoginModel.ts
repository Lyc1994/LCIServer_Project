import { Schema, model } from 'mongoose';

export interface login {
    account: string;
    password: string;
    userid: string;
    token: string
}

const schema = new Schema<login>({
    account: { type: String, required: true, unique: true },
    password: { type: String },
    userid: { type: String, required: true },
    token: { type: String }
});
schema.index({ account: 1, password: 1 });
schema.index({ userid: 1 });

export const loginModel = model<login>('Login', schema);