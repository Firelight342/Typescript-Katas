import {Suit, parseCard} from "../src/PokerKata";

const chai = require("chai");
const expect = chai.expect;

describe("PokerKata Tests", () => {

  it("can correctly parse a cards value", () => {
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

  it("can correctly parse a cards suit", () => {
    let card = parseCard("2H")
    expect(card.suit).equal(Suit.Hearts);

    let card2 = parseCard("2D")
    expect(card2.suit).equal(Suit.Diamonds);

    let card3 = parseCard("2C")
    expect(card3.suit).equal(Suit.Clubs);

    let card4 = parseCard("2S")
    expect(card4.suit).equal(Suit.Spades);
  });

});
