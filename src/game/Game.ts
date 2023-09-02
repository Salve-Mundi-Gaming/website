import { IdentDBObject } from "../misc/Manager";

/**
 * Represents a game.
 */
export interface Game extends IdentDBObject {
    /** The name of the game. */
    name: string;

    /** The shortname for this item. */
    shortname: string;

    /** The icon name of the game. */
    icon: string;

    /** The description of the game. */
    description: string;

    /** The game website. */
    website: string;
}