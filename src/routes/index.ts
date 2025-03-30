import { Application } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Logger } from 'winston';
import { healthRouter } from './healthRouter';
import { transactionsRouter } from './transactionsRouter';

export async function bootstrapRoutes(
    app: Application,
    dbClient: Sequelize,
    logger: Logger,
): Promise<void> {
    app.use('/', healthRouter(logger));
    app.use('/transactions', transactionsRouter(dbClient, logger));
}
