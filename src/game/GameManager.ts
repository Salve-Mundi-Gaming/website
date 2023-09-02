import { Collection } from "mongodb";
import { ObjectManager } from "../misc/Manager";
import { Game } from "./Game";

export class GameManager extends ObjectManager<Game> {
    /**
     * Creates a new Game Manager.
     * @param collection The collection to use.
     */
    constructor(collection: Collection) {
        super(collection);
    }

    /**
     * Adds the game.
     * @param game The game to add.
     */
    addGame(game: Game) {
        
    }
}