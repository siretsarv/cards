import {Module} from "@nestjs/common";
import {DeckService} from "./deck.service";
import {DeckController} from "./deck.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Decks} from "../models/decks.model";
import {DeckCards} from "../models/deck-cards.model";

@Module({
    imports: [SequelizeModule.forFeature([Decks, DeckCards])],
    providers: [DeckService],
    controllers: [DeckController]
})
export class DeckModule {}
