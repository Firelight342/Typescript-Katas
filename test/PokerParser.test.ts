import { parseCard, parseHand, splitHands, Suit } from "../src/PokerParser";

const chai = require("chai");
const expect = chai.expect;

describe("PokerParser Tests", () => {
    test("can correctly parse a cards value", () => {
        let card = parseCard("2H")
        expect(card.value).equal(2);
    
        let card2 = parseCard("AH")
        expect(card2.value).equal(14);
    
        expect(parseCard("3H").value).equal(3);
        expect(parseCard("4H").value).equal(4);
        expect(parseCard("5H").value).equal(5);
        expect(parseCard("6H").value).equal(6);
        expect(parseCard("7H").value).equal(7);
        expect(parseCard("8H").value).equal(8);
        expect(parseCard("9H").value).equal(9);
        expect(parseCard("TC").value).equal(10);
        expect(parseCard("JH").value).equal(11);
        expect(parseCard("QH").value).equal(12);
        expect(parseCard("KH").value).equal(13);
    
      });
    
      test("can correctly parse a cards suit", () => {
        let card = parseCard("2H")
        expect(card.suit).equal(Suit.Hearts);
    
        let card2 = parseCard("2D")
        expect(card2.suit).equal(Suit.Diamonds);
    
        let card3 = parseCard("2C")
        expect(card3.suit).equal(Suit.Clubs);
    
        let card4 = parseCard("2S")
        expect(card4.suit).equal(Suit.Spades);
      });
    
      test("can parse cards in a hand", () => {
        let hand = parseHand("2H 3D 5S 9C KD")
        expect(hand[0].suit).equals(Suit.Hearts);
        expect(hand[2].suit).equals(Suit.Spades);
        expect(hand[4].value).equals(13);
      });


  test("can split both hands from single string", () => {
    expect(splitHands("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH")).to.deep.equal(["2H 3D 5S 9C KD", "2C 3H 4S 8C AH"]);
  });
    
});