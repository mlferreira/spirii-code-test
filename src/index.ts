import * as http from 'node:http';
import * as process from 'node:process';
import { Sequelize } from 'sequelize-typescript';
import * as winston from "winston";
import * as express from 'express';
import Transaction from './resources/transactions/Models/Transaction.model';
import { bootstrapRoutes } from './routes';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.prettyPrint(),
    transports: new winston.transports.Console()
});

async function boot() {
    const app = express();

    const db = new Sequelize({
        repositoryMode: true,
        database: 'database',
        dialect: 'sqlite',
        dialectModulePath: 'sqlite3',
        storage: __dirname + '/../sqlite/db.sqlite',
        models: [__dirname + '*/**/*.model.ts']
    });

    try {
        await db.authenticate();
        db.addModels([Transaction]);
        await db.sync();
    }
    catch (error) {
        logger.error('DB did not authenticate', error);
    }

    app.use(express.urlencoded({ extended: true }));

    await bootstrapRoutes(app, db, logger);

    const server = http.createServer(app);

    const port: number = 3000;

    server.listen(port, () => {
        logger.info('api.ok', { port, env: process.env.NODE_ENV });
    });
}

boot()
    .then(() => {
        logger.info('api.boot.done');
    })
    .catch((error) => {
        logger.error('api.boot.error', { error });
    });
