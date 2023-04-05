import { model, Schema } from 'mongoose';

export interface backpackData {
    userid: string,
    version: number,
    baseData: string
}

const schema = new Schema<backpackData>({
    userid: { type: String, required: true, unique: true },
    version: { type: Number, required: true },
    baseData: { type: String }
});
schema.index({ userid: 1 });

export const backpackDataModel = model<backpackData>('BackpackData', schema);