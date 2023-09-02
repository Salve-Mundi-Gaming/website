import { Schema } from "mongoose";
import { IdentObject } from "./IdentObject";

/**
 * Represents a game server.
 */
export interface GameServer extends IdentObject {
    /** The name of this server. */
    name: string;

    /** The server description. */
    description: string;

    /** The server owner. */
    owner: Schema.Types.UUID;

    /** The associated game. */
    game: Schema.Types.UUID;

    /** The game version. */
    version: string;

    /** The server address */
    address: string;
}