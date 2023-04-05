import { model, Schema } from 'mongoose';

export interface dungeonData {
    userid: string,
    version: number,
    baseData: string
}

const schema = new Schema<dungeonData>({
    userid: { type: String, required: true, unique: true },
    version: { type: Number, required: true },
    baseData: { type: String }
});
schema.index({ userid: 1 });

export const dungeonDataModel = model<dungeonData>('DungeonData', schema);