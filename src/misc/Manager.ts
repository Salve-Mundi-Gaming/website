import { Collection } from "mongodb";

/** Represents a database object. */
export interface IdentDBObject {
    /** The ID of the object. */
    id: string;
}

/**
 * Data retriever class.
 */
export class ObjectManager<T> {
    /** The collection to use. */
    private collection?: Collection;

    /**
     * Constructs a new object manager.
     * @param collection The collection to use.
     */
    constructor(collection: Collection) {
        this.collection = collection;
    }

    /**
     * Searches an object by ID.
     * @param id The ID of the object to search for.
     */
    async findById(id: string): Promise<T | undefined> {
        return await this.collection?.findOne({ id }) as T;
    }

    /**
     * Searches an object using the specified query.
     * @param query The query to use.
     */
    async findByProp(query: any): Promise<T | undefined> {
        return await this.collection?.findOne(query) as T;
    }
}