import { Router } from 'express';
import { Logger } from 'winston';

export function healthRouter(logger: Logger): Router {
    const router = Router({ mergeParams: true });

    router.get('/ping', (req, res) => {
        res.send("pong").status(200).send();
    });

    return router;
}
