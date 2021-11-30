import {
  determineWinner, detectHand, HandRank, isFullHouse, isThreeOfAKind,
  Card, isPair, Suit, parseCard, parseHand, isTwoPair, isStraight, isFourOfAKind,
  isFlush, isStraightFlush, Winner
} from "../src/PokerKata";



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

  it("can parse cards in a hand", () => {
    let hand = parseHand("2H 3D 5S 9C KD")
    expect(hand[0].suit).equals(Suit.Hearts);
    expect(hand[2].suit).equals(Suit.Spades);
    expect(hand[4].value).equals(13);
  });

  it("can detect a pair", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 }
    ]

    let isAPair = isPair(hand);
    expect(isAPair).equals(true);
  });

  it("can detect not a pair", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 1 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 }
    ]

    let isAPair = isPair(hand);
    expect(isAPair).equals(false);
  });


  it("can detect a two pair", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 4 }
    ]

    let isATwoPair = isTwoPair(hand);
    expect(isATwoPair).equals(true);
  });

  it("can detect three of a kind", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 }
    ]

    let actual = isThreeOfAKind(hand);
    expect(actual).equals(true);
  });

  it("can detect four of a kind", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 }
    ]
    let actual = isFourOfAKind(hand);
    expect(actual).equals(true);
  });

  it("can detect four of a kind", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 6 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 }
    ]
    let actual = isFourOfAKind(hand);
    expect(actual).equals(false);
  });

  it("can detect a straight", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 6 }
    ]

    let actual = isStraight(hand);
    expect(actual).equals(true);
  });

  it("can detect when it's not a straight becaues they are not next to each other", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 8 }
    ]
    expect(isStraight(hand)).equals(false);
  });

  it("can detect when it's a flush (same suit for all cards)", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 8 }
    ]
    expect(isFlush(hand)).equals(true);
  });

  it("can detect when it's a straight flush", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 6 }
    ]
    expect(isStraightFlush(hand)).equals(true);
  });

  it("can detect when it's a not a straight flush", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Spades, value: 9 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 6 }
    ]
    expect(isStraightFlush(hand)).equals(false);
  });

  it("can detect a full house", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Spades, value: 9 },
      { suit: Suit.Clubs, value: 9 },
      { suit: Suit.Clubs, value: 9 }
    ]
    expect(isFullHouse(hand)).equals(true);
  });


  const highCardEights = "8H 3D 4H 5H 6H";
  const pairOfTwos = "2H 2S 3D 4D 7D";
  const pairOfFours = "4H 2S 3D 4D 7D";

  it("fully detect pair", () => {
    expect(detectHand(highCardEights)).equals(HandRank.HighCard);
    expect(detectHand(pairOfTwos)).equals(HandRank.Pair);
    expect(detectHand("2H 2H 4D 4H 7H")).equals(HandRank.TwoPairs);
    expect(detectHand("2H 2H 2D 4H 7H")).equals(HandRank.ThreeOfAKind);
    expect(detectHand("2H 3H 4D 5H 6H")).equals(HandRank.Straight);
    expect(detectHand("2H 2H 3H 4H 7H")).equals(HandRank.Flush);
    expect(detectHand("2H 2H 3H 3H 3D")).equals(HandRank.FullHouse);
    expect(detectHand("2H 2H 2H 2H 7D")).equals(HandRank.FourOfAKind);
    expect(detectHand("2H 3H 4H 5H 6H")).equals(HandRank.StraightFlush);
  });


  it("determine winner", () => {
    expect(determineWinner(highCardEights, pairOfTwos)).equals(Winner.PlayerTwo);
    expect(determineWinner(pairOfTwos, highCardEights)).equals(Winner.PlayerOne);
    expect(determineWinner(pairOfTwos, pairOfFours)).equals(Winner.PlayerTwo);
  });


});
