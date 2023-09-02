// Server list route

import { NextFunction, Request, Response } from "express";
import { renderFile } from "pug";
import { GameServer } from "../types/GameServer";
import { GameServerModel } from "../models/GameServerModel";

export async function renderServerList(req: Request, res: Response, next: NextFunction) {
    const premiumServers = await GameServerModel.find<GameServer>({ isPremium: true }).cache('1 minute').exec();
    const freeServers = await GameServerModel.find<GameServer>({ isPremium: false }).cache('1 minute').exec();

    res.end(renderFile("./ui/pages/servers.pug", {
        premiumServers,
        freeServers
    }));
}