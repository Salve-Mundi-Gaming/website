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

const app = express();
const config = require('../data/config.json');

// Serve static content
app.use('/', express.static('./www'))

// Page routes
app.get('/', (req, res) => res.end(renderFile("./ui/pages/home.pug")));
app.get('/stats', (req, res) => res.end(renderFile("./ui/pages/stats.pug")));
app.get('/servers', (req, res) => res.end(renderFile("./ui/pages/servers.pug")));
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
        log(`Connecting to ${config.db.url}...`);
        await mongoose.connect(`${config.db.url}/${config.db.name}`);
        log(`Connected to database.`);
    } catch(e) {
        log(`ERROR: Failed to connect to database server!`);
    }

    // Init models
    for(let m of [GameModel])
        await m.init();

    // Do seeding if needed
    if(!existsSync(".seed_successful"))
        await seedDatabase();

    // Start HTTPS Server
    app.listen(config.http.port, async() => {
        // Open new log
        await logOpen();
        await log(`Server started on port ${config.http.port}!`);
    });
}

main();