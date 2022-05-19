import {DeckService} from "./deck.service";
import {Sequelize} from "sequelize-typescript";
import {createDb} from "../testing-helpers/create-db";
import {Decks} from "../models/decks.model";
import {DeckCards} from "../models/deck-cards.model";
import {CreateDeckRequestDto} from "./DTO/create-deck-request.dto";

describe("DeckService", () => {
    let deckService: DeckService;
    let db: Sequelize;

    beforeAll(async () => {
        db = await createDb([Decks, DeckCards]);

        deckService = new DeckService(Decks, DeckCards, db);
    });

    afterAll(() => db.close());

    describe('', () => {

        afterAll(() => db.truncate());

        it('should create a short deck', async () => {
            const dto = new CreateDeckRequestDto();
            dto.type = 'SHORT';
            dto.shuffled = false;

            const actual = await deckService.createDeck(dto);

            expect(actual.remaining).toEqual(36);
            expect(actual.type).toEqual(dto.type);
            expect(actual.shuffled).toEqual(dto.shuffled);
        });

        it('should create a full deck', async () => {
            const dto = new CreateDeckRequestDto();
            dto.type = 'FULL';
            dto.shuffled = false;

            const actual = await deckService.createDeck(dto);

            expect(actual.remaining).toEqual(52);
            expect(actual.type).toEqual(dto.type);
            expect(actual.shuffled).toEqual(dto.shuffled);
        });

        it('should return deck with cards', async () => {
            const dto = new CreateDeckRequestDto();
            dto.type = 'FULL';
            dto.shuffled = false;

            const deck = await deckService.createDeck(dto);

            const actual = await deckService.findDeck(deck.uuid);

            expect(actual.remaining).toEqual(deck.remaining);
            expect(actual.type).toEqual(deck.type);
            expect(actual.shuffled).toEqual(deck.shuffled);
            expect(actual.cards.length).toEqual(52);
        });
    });
});
