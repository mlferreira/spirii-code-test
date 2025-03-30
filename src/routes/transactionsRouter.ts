import { Router } from 'express';
import { DateTime } from 'luxon';
import { Sequelize } from 'sequelize-typescript';
import { Logger } from 'winston';
import { bootstrap } from '../bootstrap';

export function transactionsRouter(
    dbClient: Sequelize,
    logger: Logger
): Router {
    const router = Router({ mergeParams: true });

    const {
        getUserTransactionsData,
        getPayoutsData,
        importTransactions,
    } = bootstrap(dbClient, logger);

    router.get('/summary/:userId', async (req, res) => {
        const result = await getUserTransactionsData.byUser(req.params.userId);
        res.json(result);
    });

    router.get('/payouts', async (req, res) => {
        const result = await getPayoutsData.get();
        res.json(result);
    });

    /** I believe this would be better as a separate task/job, I made the endpoint due to time constraints */
    router.get('/api/import', async (req, res) => {
        await importTransactions.import({ startDate: DateTime.now().minus({ minutes: 1 }), endDate: DateTime.now() });
        res.sendStatus(200);
    });

    return router;
}
