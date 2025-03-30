import { Sequelize } from 'sequelize-typescript';
import { Logger } from 'winston';
import Transaction from './resources/transactions/Models/Transaction.model';
import { GetPayoutsData } from './resources/transactions/services/GetPayoutsData';
import { GetUserTransactionsData } from './resources/transactions/services/GetUserTransactionsData';
import { ImportTransactions } from './resources/transactions/services/ImportTransactions';

export type TransactionsBootstrap = {
    getUserTransactionsData: GetUserTransactionsData;
    getPayoutsData: GetPayoutsData;
    importTransactions: ImportTransactions;
}

export function bootstrap(
    dbClient: Sequelize,
    logger: Logger
): TransactionsBootstrap {
    const transactionRepository = dbClient.getRepository(Transaction);

    const getPayoutsData = new GetPayoutsData(
        dbClient,
        transactionRepository,
        logger,
    );

    const getUserTransactionsData = new GetUserTransactionsData(
        dbClient,
        transactionRepository,
        logger,
    );

    const importTransactions = new ImportTransactions(transactionRepository, logger);

    return {
        getUserTransactionsData,
        getPayoutsData,
        importTransactions,
    };
}
