import mongoose, { Schema } from "mongoose";
import { randomUUID } from "crypto";
import { GameServer } from "../types/GameServer";
import { GameModel } from "./GameModel";

const schema = new mongoose.Schema({
    id: { type: Schema.Types.UUID, default: ()=>randomUUID() },
    name: { type: String, required: true, max: 256, min: 10 },
    description: { type: String, required: true, min: 1, max: 2048 },
    owner: { type: Schema.Types.UUID, required: true },
    game: { type: Schema.Types.UUID, required: true },
    version: { type: String, required: true, min: 1, max: 32 },
    address: { type: String, required: true },
    isPremium: { type: Boolean, required: true },
    icon: { type: String, required: true, min: 1, max: 256 },
});

schema.methods.fetchGame = async function() {
    return await GameModel.findOne({ id: this.game }).cache('1 minute').exec();
}

/**
 * Game database model
 */
export const GameServerModel = mongoose.model<GameServer>('gameserver', schema);