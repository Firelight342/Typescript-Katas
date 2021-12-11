import { parseCard, parseHand, Suit } from "../src/PokerKataSolo1";

const chai = require("chai");
const expect = chai.expect;

describe("PokerKata1 Tests", () => {

    test("can correctly parse a card", () => {
        expect(parseCard("3H").value).equal(3);
        expect(parseCard("3H").suit).equal(Suit.Hearts);
        expect(parseCard("AS").value).equal(14);
        expect(parseCard("AS").suit).equal(Suit.Spades);
    });

    test("can parse cards in a hand", () => {
        let hand = parseHand("2H 3D 5S 9C KD")
        expect(hand[0].suit).equals(Suit.Hearts);
        expect(hand[2].suit).equals(Suit.Spades);
        expect(hand[4].value).equals(13);
      });

});