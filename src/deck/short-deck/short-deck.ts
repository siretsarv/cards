import {Deck} from "cards/build/decks";
import {clubs, diamonds, hearts, spades} from "cards/build/suits";
import {standard} from "cards/build/ranks";
import {Card} from "cards";

const suits = [ spades, hearts, diamonds, clubs ];
const ranks = [
    standard.ace,
    standard.six,
    standard.seven,
    standard.eight,
    standard.nine,
    standard.ten,
    standard.jack,
    standard.queen,
    standard.king
];

export class ShortDeck extends Deck {
    constructor() {
        const cards = ShortDeck.generateCards();

        super({
            cards,
            rng: null
        });
    }

    private static generateCards() {
        const cards: Card[] = [ ];

        suits.forEach((suit) => {
            ranks.forEach((rank) => {
                cards.push(new Card(suit, rank));
            });
        });

        return cards;
    }
}
