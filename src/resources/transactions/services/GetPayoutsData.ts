import { Repository, Sequelize } from 'sequelize-typescript';
import { Logger } from 'winston';
import Transaction from '../Models/Transaction.model';
import { PayoutSummary } from '../types/PayoutSummary';

export class GetPayoutsData {
    constructor(
        private db: Sequelize,
        private transactionRepository: Repository<Transaction>,
        private logger: Logger,
    ) {}

    async get(): Promise<PayoutSummary[]> {
        const response: PayoutSummary[] = await this.transactionRepository.findAll({
            attributes: [
                'userId',
                [this.db.fn('SUM', this.db.col('amount')), 'payoutAmount']
            ],
            where: { type: 'payout' },
            group: 'userId',
            raw: true
        }) as unknown as PayoutSummary[];

        return response;
    }
}
