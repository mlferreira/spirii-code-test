import { DateTime } from 'luxon';
import { Model, Column, PrimaryKey, Table, DataType } from 'sequelize-typescript';
import { TransactionTypes } from '../types/APITransaction';

@Table({
    timestamps: false,
    freezeTableName: true,
    tableName: 'transactions'
})
class Transaction extends Model<Transaction> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare userId: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare createdAt: DateTime;

    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values: TransactionTypes,
    })
    declare type: DateTime;

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    declare amount: number;
}

export default Transaction;
