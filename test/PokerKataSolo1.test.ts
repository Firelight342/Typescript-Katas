import { isPair } from "../src/PokerKataSolo1";
import { parseCard, parseHand, Suit } from "../src/PokerParserSolo1";

const chai = require("chai");
const expect = chai.expect;

describe("PokerKata1 Tests", () => {

    test("can detect a pair", () => {
        let hand = [
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Clubs, value: 2 },
            { suit: Suit.Clubs, value: 3 },
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Clubs, value: 5 }
        ]
        expect(isPair(hand)).equals(true)
    });
    test("can detect a non pair", () => {
        let hand = [
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Clubs, value: 2 },
            { suit: Suit.Clubs, value: 3 },
            { suit: Suit.Clubs, value: 9 },
            { suit: Suit.Clubs, value: 5 }
        ]

        expect(isPair(hand)).equals(false)
    });
});