import { isFourOfAKind, isPair, isThreeOfAKind, isTwoPair, isFlush, isFullHouse, isStraight, isStraightFlush } from "../src/PokerKataSolo1";
import { parseCard, parseHand, Suit } from "../src/PokerParserSolo1";

const chai = require("chai");
const expect = chai.expect;

describe("PokerKata1 Tests", () => {

    test("can detect a pair", () => {
        let hand = [
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Clubs, value: 2 },
            { suit: Suit.Hearts, value: 3 },
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Clubs, value: 5 }
        ]
        expect(isPair(hand)).to.deep.equal({ isMatch: true, rankValues: [4] })
    });
    test("can detect a non pair", () => {
        let hand = [
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Spades, value: 2 },
            { suit: Suit.Clubs, value: 3 },
            { suit: Suit.Clubs, value: 9 },
            { suit: Suit.Clubs, value: 5 }
        ]
        expect(isPair(hand)).to.deep.equal({ isMatch: false, rankValues: [] })
    });

    test("can detect a two pair", () => {
        let hand = [
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Clubs, value: 2 },
            { suit: Suit.Hearts, value: 5 },
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Clubs, value: 5 }
        ]
        expect(isTwoPair(hand)).to.deep.equal({ isMatch: true, rankValues: [5, 4] })
    });
    test("can detect Three of a Kind", () => {
        let hand = [
            { suit: Suit.Diamonds, value: 4 },
            { suit: Suit.Clubs, value: 2 },
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Clubs, value: 5 }
        ]
        expect(isThreeOfAKind(hand)).to.deep.equal({ isMatch: true, rankValues: [5] })
    });
    test("can detect Straight", () => {
        let hand = [
            { suit: Suit.Hearts, value: 9 },
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Hearts, value: 6 },
            { suit: Suit.Clubs, value: 8 },
            { suit: Suit.Clubs, value: 7 }
        ]
        expect(isStraight(hand)).to.deep.equal({ isMatch: true, rankValues: [] })
    });
    test("can detect Flush", () => {
        let hand = [
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Clubs, value: 2 },
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Clubs, value: 5 }
        ]
        expect(isFlush(hand)).to.deep.equal({ isMatch: true, rankValues: [] })
    });
    test("can detect FullHouse", () => {
        let hand = [
            { suit: Suit.Hearts, value: 4 },
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Diamonds, value: 4 },
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Clubs, value: 5 }
        ]
        expect(isFullHouse(hand)).to.deep.equal({ isMatch: true, rankValues: [4] })
    });
    test("can detect Four of a Kind", () => {
        let hand = [
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Clubs, value: 2 },
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Clubs, value: 5 }
        ]
        expect(isFourOfAKind(hand)).to.deep.equal({ isMatch: true, rankValues: [5] })
    });
    test("can detect StraightFlush", () => {
        let hand = [
            { suit: Suit.Clubs, value: 5 },
            { suit: Suit.Clubs, value: 4 },
            { suit: Suit.Clubs, value: 6 },
            { suit: Suit.Clubs, value: 3 },
            { suit: Suit.Clubs, value: 7 }
        ]
        expect(isStraightFlush(hand)).to.deep.equal({ isMatch: true, rankValues: [] })
    });

});