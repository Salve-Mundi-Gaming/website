import { Schema } from "mongoose";

export interface IdentObject {
    /** The UUID of this object. */
    id: Schema.Types.UUID;
}