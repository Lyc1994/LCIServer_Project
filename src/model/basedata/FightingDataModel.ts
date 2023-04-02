import { model, Schema } from 'mongoose';

export interface fightingData {
    userid: string,
    version: number,
    baseData: string
}

const schema = new Schema<fightingData>({
    userid: { type: String, required: true, unique: true },
    version: { type: Number, required: true },
    baseData: { type: String }
});
schema.index({ userid: 1 });

export const fightingDataModel = model<fightingData>('FightingData', schema);