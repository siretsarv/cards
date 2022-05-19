import {Test, TestingModule} from "@nestjs/testing";
import {DeckController} from "./deck.controller";
import {DeckService} from "./deck.service";
import {CreateDeckRequestDto} from "./DTO/create-deck-request.dto";

const deck = {
    uuid: "5affcb9c-ef52-4b62-bc50-fb63fe3618ea",
    id: 6,
    type: "SHORT",
    shuffled: false,
    remaining: 1,
};

const deckWithCards =
    {
        uuid: "5affcb9c-ef52-4b62-bc50-fb63fe3618ea",
        id: 6,
        type: "SHORT",
        shuffled: false,
        remaining: 1,
    };

const cards = {
    cards: [
        {
            id: 1,
            deck_id: 6,
            value: "Ace",
            suit: "spades",
            code: "A"
        }
    ]
}

describe('DeckController', () => {
    let deckController: DeckController;

    beforeEach(async () => {

        const app: TestingModule = await Test.createTestingModule({
            controllers: [DeckController],
            providers: [
                {
                    provide: DeckService,
                    useValue: {
                        findDeck: jest.fn(() => deckWithCards),
                        createDeck: jest.fn(() => deck),
                        drawACard: jest.fn(() =>  cards)
                    }
                }
            ],
        }).compile();

        deckController = app.get<DeckController>(DeckController);
    });

    describe('Decks', () => {
        it('should return deck with cards', () => {
            expect(deckController.getDeck('5affcb9c-ef52-4b62-bc50-fb63fe3618ea')).toBe(deckWithCards);
        });

        it('should return deck', () => {
            const dto = new CreateDeckRequestDto();
            dto.type = 'SHORT';
            dto.shuffled = false;

            expect(deckController.createDeck(dto)).toBe(deck);
        });

        it('should return cards', () => {
            expect(deckController.drawACard('5affcb9c-ef52-4b62-bc50-fb63fe3618ea', 0)).toBe(cards);
        });
    });
});
