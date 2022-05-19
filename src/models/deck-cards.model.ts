import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName: 'deck_cards', timestamps: false})
export class DeckCards extends Model<DeckCards> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public deck_id: number;

    @Column
    public value: string;

    @Column
    public suit: string;

    @Column
    public code: string;
}
