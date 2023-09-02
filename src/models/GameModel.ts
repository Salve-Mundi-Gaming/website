import mongoose, { Schema } from "mongoose";
import { Game } from "../types/Game";
import { randomUUID } from "crypto";

/**
 * Game database model
 */
export const GameModel = mongoose.model<Game>('game', new mongoose.Schema({
    id: { type: Schema.Types.UUID, default: ()=>randomUUID() },
    name: { type: String, required: true, max: 256, min: 10 },
    shortname: {
        type: String,
        required: true,
        unique: true,
        max: 40,
        min: 2,
        validate: {
            validator: (shortname: string) => /^[a-zA-Z0-9_]*$/.test(shortname),
            message: (shortname) => `"${shortname.value}" is not a valid shortname.`
        }
    },
    icon: { type: String, required: true, min: 1, max: 256 },
    description: { type: String, required: true, min: 1, max: 2048 },
    website: {
        type: String,
        required: true,
        min: 10,
        max: 256,
        validate: {
            validator: (website: string) => /^(http|https)\:\/{2}/.test(website),
            message: (website) => `"${website.value}" is not a valid web address.`
        }
    }
}));