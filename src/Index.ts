/*
 * SAMU Gaming Club Source Code.
 */

import express from 'express';
import { log, logOpen } from './misc/Utilities';
import { MongoClient } from 'mongodb';
import { renderFile } from 'pug';
import { AppContext } from './app/AppContext';

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
    mongo: new MongoClient(config.db.url),

    /** @type {import('mongodb').Db} */
    db: null
} as AppContext;

/**
 * Program entry point.
 */
async function main() {
    try {
        log(`Connecting to ${config.db.url}...`);
        await appContext.mongo.connect();
        log(`Connected to database.`);
    } catch(e) {
        log(`ERROR: Failed to connect to database server!`);
    }

    // Start HTTPS Server
    app.listen(config.http.port, async() => {
        // Open new log
        await logOpen();
        await log(`Server started on port ${config.http.port}!`);
    });
}

main();