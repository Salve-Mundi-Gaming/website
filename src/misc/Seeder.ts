// Database seeder

import { readFile, writeFile } from "fs/promises";
import { Game } from "../types/Game";
import { log } from "./Utilities";
import { randomUUID } from "crypto";
import { GameModel } from "../models/GameModel";

/**
 * Seeds the database.
 */
export async function seedDatabase() {
    log("Seeding database...");

    // Step 1. Seed games
    log("Reading games...");
    
    const games: Game[] = JSON.parse(await readFile('./data/seed/games.json', { encoding: 'utf-8' }));

    // Give games random UUIDs
    for(let g of games) {
        log(`Registering game "${g.name}" (${g.shortname})...`);
        const m = new GameModel(g);
        await m.save();
    }
    
    // Seed complete, write file
    await writeFile(".seed_successful", "");
}