import { Db, MongoClient } from "mongodb";
import { Mongoose } from "mongoose";

/**
 * Represents the current app context.
 */
export interface AppContext {
    /** The MongoDB client */
    mongoose: Mongoose;
}