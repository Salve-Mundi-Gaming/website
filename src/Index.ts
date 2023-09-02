/*
 * SAMU Gaming Club Source Code.
 */

import express from 'express';
import { log, logOpen } from './misc/Utilities';
import { renderFile } from 'pug';
import { AppContext } from './app/AppContext';
import mongoose, { Mongoose } from 'mongoose';
import { Game } from './types/Game';
import { GameModel } from './models/GameModel';
import { existsSync } from 'fs';
import { seedDatabase } from './misc/Seeder';
import { GameServerModel } from './models/GameServerModel';
import { renderServerList } from './pages/ServerList';
import cache from 'ts-cache-mongoose';
import { configDotenv } from 'dotenv';

// Load ENV parameters
configDotenv();

const app = express();

// Serve static content
app.use('/', express.static('./www'))

// Page routes
app.get('/', (req, res) => res.end(renderFile("./ui/pages/home.pug")));
app.get('/stats', (req, res) => res.end(renderFile("./ui/pages/stats.pug")));
app.get('/servers', renderServerList);
app.get('/events', (req, res) => res.end(renderFile("./ui/pages/events.pug")));
app.get('/records', (req, res) => res.end(renderFile("./ui/pages/records.pug")));
app.get('/about', (req, res) => res.end(renderFile("./ui/pages/about.pug")));

// Privileged Routes
// These need administrator access
// TODO: Make this an actual auth checker: app.use((req, res, next) => res.end("sike"));
// app.get('/admin/panel', (req, res) => res.end(renderFile("./ui/pages/administration/panel.pug")));

/**
 * Carries the current app context.
 */
const appContext = {
    mongoose
} as AppContext;

/**
 * Program entry point.
 */
async function main() {
    try {
        // Configure cache
        cache.init(mongoose, {
            defaultTTL: '60 seconds',
            engine: 'memory',
        });

        log(`Connecting to ${process.env.DB_URL}...`);
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
        log(`Connected to database.`);
    } catch(e) {
        log(`ERROR: Failed to connect to database server!`);
    }

    // Init models
    for(let m of [GameModel, GameServerModel])
        await m.init();
    
    // Do seeding if needed
    if(!existsSync(".seed_successful"))
        await seedDatabase();

    // Start HTTPS Server
    app.listen(process.env.HTTP_PORT, async() => {
        // Open new log
        await logOpen();
        await log(`Server started on port ${process.env.HTTP_PORT}!`);
    });
}

main();