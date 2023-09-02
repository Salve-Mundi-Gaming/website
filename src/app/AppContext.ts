import { Db, MongoClient } from "mongodb";

/**
 * Represents the current app context.
 */
export interface AppContext {
    /** The MongoDB client */
    mongo: MongoClient;

    /** The app database to use. */
    db: Db | null;
}