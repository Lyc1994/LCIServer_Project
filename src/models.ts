// import { Schema, model, mongoose } from "mongoose";
// mongoose.connect("mongodb://127.0.0.1/xxx"); //链接数据库

// export interface User {
//     /** 名字 */
//     name: string;
//     age: number
// }

// const schema = new Schema<User>({
//     name: { type: String, required: true, unique: true },
//     age: { type: Number, required: true },
// });
// schema.index({ name: 1 });
// export const UserModel = model<User>("User", schema);