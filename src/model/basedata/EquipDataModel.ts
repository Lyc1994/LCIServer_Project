import { model, Schema } from 'mongoose';

export interface equipData {
    userid: string,
    version: number,
    baseData: string
}

const schema = new Schema<equipData>({
    userid: { type: String, required: true, unique: true },
    version: { type: Number, required: true },
    baseData: { type: String }
});
schema.index({ userid: 1 });

export const equipDataModel = model<equipData>('EquipData', schema);