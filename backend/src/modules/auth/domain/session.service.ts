import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SessionData } from './entities/session-data';
import { getSessionOptions } from './utils/session-options';
import { getIronSession } from 'iron-session';
import { Request, Response } from 'express';

@Injectable()
export class SessionService {
    constructor(private readonly configService: ConfigService) {}

    async getSession(req: Request, res: Response): Promise<SessionData> {
        const options = getSessionOptions(this.configService);
        const session = await getIronSession<SessionData>(req, res, options);
        return session;
    }

    async saveSession(req: Request, res: Response, data: SessionData): Promise<void> {
        const options = getSessionOptions(this.configService);
        const session = await getIronSession<SessionData>(req, res, options);
        session.user = data.user;
        await session.save();
    }

    async deleteSession(req: Request, res: Response): Promise<void> {
        const options = getSessionOptions(this.configService);
        const session = await getIronSession<SessionData>(req, res, options);
        session.destroy();
    }
}
