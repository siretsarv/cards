import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Decks} from "../models/decks.model";
import {DeckCards} from "../models/deck-cards.model";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: "mysql",
            host: 'katana_mysql',
            port: 3306,
            username: 'katana',
            password: 'katana',
            database: 'katana',
            models: [Decks, DeckCards],
        }),
    ]
})
export class DatabaseModule {}
