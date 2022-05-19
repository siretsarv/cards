import {Injectable} from "@nestjs/common";
import {decks} from 'cards';
import {InjectModel} from "@nestjs/sequelize";
import {Decks} from "../models/decks.model";
import {DeckCards} from "../models/deck-cards.model";
import {CreateDeckRequestDto} from "./DTO/create-deck-request.dto";
import {DeckTypeEnum} from "./enum/deck-type.enum";
import {ShortDeck} from "./short-deck/short-deck";
import {Sequelize} from "sequelize-typescript";
import {Deck} from "cards/build/decks";

@Injectable()
export class DeckService {

    constructor(
        @InjectModel(Decks)
        private deckRepository: typeof Decks,
        @InjectModel(DeckCards)
        private deckCardsRepository: typeof DeckCards,
        private sequelize: Sequelize
    ) {
    }


    public findDeck(uuid: string): Promise<Decks> {
        return this.deckRepository.findOne({
            where: {
                uuid: uuid
            },
            include: [DeckCards]
        });
    }

    public async createDeck(dto: CreateDeckRequestDto) {
        const deck = this.getDeck(dto);

        const t = await this.sequelize.transaction();

        try {
            const createdDeck = await this.deckRepository.create({
                type: dto.type,
                shuffled: dto.shuffled,
                remaining: deck.remainingLength
            }, {transaction: t});

            const deckCards = deck.remainingCards.map(card => <DeckCards>{
                deck_id: createdDeck.id,
                value: card.rank.name,
                suit: card.suit.name,
                code: card.rank.abbrn
            });

            await this.deckCardsRepository.bulkCreate(deckCards, {transaction: t});

            await t.commit();

            return createdDeck;
        } catch (error) {
            await t.rollback();
            console.log(error);
        }
    }

    private getDeck(dto: CreateDeckRequestDto): Deck {
        let deck;
        switch (dto.type) {
            case DeckTypeEnum.SHORT:
                deck = new ShortDeck();
                break;
            case DeckTypeEnum.FULL:
                deck = new decks.StandardDeck();
                break;
        }

        if (dto.shuffled) {
            deck.shuffleAll();
        }

        return deck;
    }

    public async drawACard(uuid: string, draw: number) {
        const deck = await this.findDeck(uuid);

        const t = await this.sequelize.transaction();

        try {
            const remaining = deck.remaining - draw;

            await deck.update({
                remaining: remaining < 0 ? 0 : remaining
            }, { transaction: t });

            const cards = deck.cards.slice(0, draw);

            await this.deckCardsRepository.destroy({ where: {id: cards.map(card => card.id)}});

            await t.commit();

            return {cards: cards};
        } catch (error) {
            await t.rollback();
        }
    }

}
