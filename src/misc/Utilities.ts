// Utilities

const fs = require('fs');
const LOG_PATH = `./server.log`;

/**
 * Opens a new log file.
 */
export async function logOpen() {
    await fs.promises.writeFile(LOG_PATH, `Log opened @ ${new Date()}\n`, { encoding: 'utf-8' });
}

/**
 * Logs some text.
 * @param text The text to log.
 */
export async function log(text: string) {
    const message = `[${new Date()}]: ${text}\n`;
    process.stdout.write(message);
    await fs.promises.appendFile(LOG_PATH, message, { encoding: 'utf-8' });
}