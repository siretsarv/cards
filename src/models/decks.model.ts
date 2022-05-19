import {AutoIncrement, Column, DataType, Default, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DeckCards} from "./deck-cards.model";

@Table({tableName: 'decks', timestamps: false})
export class Decks extends Model<Decks> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number

    @Default(DataType.UUIDV4)
    @Column
    public uuid: string;

    @Column
    public type: string;

    @Column
    public shuffled: boolean;

    @Column
    public remaining: number;

    @HasMany(() => DeckCards, 'deck_id')
    cards: DeckCards[];
}
