import { DateTime } from 'luxon';

export const TransactionTypes = ['spent', 'payout', 'earned'] as const;
export type TransactionType = (typeof TransactionTypes)[number];


export type APITransaction = {
    id: string;
    userId: string;
    createdAt: DateTime;
    type: TransactionType;
    amount: number;
}
