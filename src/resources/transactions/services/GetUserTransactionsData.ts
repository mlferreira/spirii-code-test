import { Repository, Sequelize } from 'sequelize-typescript';
import { Logger } from 'winston';
import { TransactionType } from '../types/APITransaction';
import { UserSummary } from '../types/UserSummary';
import Transaction from '../Models/Transaction.model';

export class GetUserTransactionsData {
    constructor(
        private db: Sequelize,
        private transactionRepository: Repository<Transaction>,
        private logger: Logger,
    ) {}

    async byUser(userId: string): Promise<UserSummary> {
        const response: { type: TransactionType; total: number }[] = await this.transactionRepository.findAll({
            attributes: [
                'type',
                [this.db.fn('SUM', this.db.col('amount')), 'total']
            ],
            where: { userId },
            group: 'type',
            raw: true
        }) as unknown as { type: TransactionType; total: number }[];

        const result = response.reduce((agg, { type, total }) => {
            agg[type] = total;
            return agg;
        }, { userId } as UserSummary);

        return {
            ...result,
            balance: (result.earned ?? 0) - (result.payout ?? 0) - (result.spent ?? 0)
        };
    }
}
