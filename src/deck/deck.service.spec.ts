import {DeckController} from "./deck.controller";
import {DeckService} from "./deck.service";
import {Test, TestingModule} from "@nestjs/testing";
import {CreateDeckRequestDto} from "./DTO/create-deck-request.dto";
import {Sequelize} from "sequelize-typescript";
import { createMemDB } from '../utils/testing-helpers/createMemDb';

describe("DeckController Unit tests", () => {
    let deckController: DeckController;
    let deckService: DeckService;
    let db: Sequelize;

    beforeAll(async () => {
        db = await createMem

        deckService = new DeckService();
        deckController = new DeckController(deckService);
    });


});
