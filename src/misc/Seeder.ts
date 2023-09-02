// Database seeder

import { readFile, writeFile } from "fs/promises";
import { Game } from "../types/Game";
import { log } from "./Utilities";
import { randomUUID } from "crypto";
import { GameModel } from "../models/GameModel";
import { GameServer } from "../types/GameServer";
import { GameServerModel } from "../models/GameServerModel";

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
        const prev = await GameModel.findOne<Game>({ shortname: g.shortname }).exec();

        // Update game item
        if(prev)
            await GameModel.updateOne<Game>(prev, g);
        else
            await new GameModel(g).save();
    }
    
    // Step 2. Seed servers
    const servers: GameServer[] = JSON.parse(await readFile("./data/seed/servers.json", { encoding: 'utf-8' }));
    
    for(let s of servers) {
        log(`Registering server "${s.name}" (${s.address})...`);
        await new GameServerModel({ ...s, ...{ owner: randomUUID(), game: randomUUID() } }).save();
    }

    // Seed complete, write file
    await writeFile(".seed_successful", "");
}