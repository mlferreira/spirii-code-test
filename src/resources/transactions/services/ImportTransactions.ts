import { Repository } from 'sequelize-typescript';
import { Logger } from 'winston';
import { APIRequest } from '../types/APIRequest';
import { APIResponse } from '../types/APIResponse';
import { APITransaction, TransactionType, TransactionTypes } from '../types/APITransaction';
import Transaction from '../Models/Transaction.model';

export class ImportTransactions {
    constructor(
        private transactionRepository: Repository<Transaction>,
        private logger: Logger,
    ) {}

    /**
     * Things I would have done given more time:
     * Use the date of the last imported transaction as the "startDate" of the request
     * Implement a pagination system
     * Implement a rate limiter
     **/
    async import(filters: APIRequest): Promise<void> {
        const response: APIResponse = await this.getFromAPI(filters);

        await this.transactionRepository.bulkCreate(response.items as unknown as Transaction[]);
    }

    /**
     *   This service would call the transactions API, but for the MVP I'll just mock a response on the fly.
     **/
    private async getFromAPI(filters: APIRequest): Promise<APIResponse> {
        const totalItems: number = Math.floor(Math.random() * 50);
        const items: APITransaction[] = [];

        const getRandomType = (): TransactionType => TransactionTypes[Math.floor(Math.random() * 3)];

        const datesDiffMs: number = filters.startDate.valueOf() - filters.endDate.valueOf();

        for (let i = 0; i < totalItems; i++) {
            items.push({
                id: crypto.randomUUID(),
                userId: Math.floor(Math.random() * 999).toString(),
                createdAt: filters.startDate.plus( { milliseconds: Math.floor(Math.random() * datesDiffMs) }),
                type: getRandomType(),
                amount: Math.random() * 500,
            });
        }

        return {
            items,
            meta: {
                totalItems: items.length,
                itemCount: items.length,
                itemsPerPage: items.length,
                totalPages: 1,
                currentPage: 1
            }
        };
    }
}
