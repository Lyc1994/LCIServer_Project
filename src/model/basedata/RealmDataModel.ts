import { model, Schema } from 'mongoose';

export interface realmData {
    userid: string,
    version: number,
    baseData: string
}

const schema = new Schema<realmData>({
    userid: { type: String, required: true, unique: true },
    version: { type: Number, required: true },
    baseData: { type: String }
});
schema.index({ userid: 1 });

export const realmDataModel = model<realmData>('RealmData', schema);