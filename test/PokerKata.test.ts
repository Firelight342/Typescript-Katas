import {
  determineWinner, detectHand, HandRank, isFullHouse, isThreeOfAKind,
  isTwoPair, isStraight, isFourOfAKind,
  isFlush, isStraightFlush, Winner, playGame, isPair, splitHands, printWinner
} from "../src/PokerKata";
import { Card, parseHand, Suit } from "../src/PokerParser";



const chai = require("chai");
const expect = chai.expect;

describe("PokerKata Tests", () => {


  test("can detect a pair", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 }
    ]

    let isAPair = isPair(hand);
    expect(isAPair).to.deep.equal({ isMatch: true, rankValues: [4] })
  });

  test("can detect a pair of 3's", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 5 }
    ]

    let isAPair = isPair(hand);
    expect(isAPair).to.deep.equal({ isMatch: true, rankValues: [3] })
  });

  test("can detect not a pair", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 1 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 }
    ]

    let isAPair = isPair(hand);
    expect(isAPair).to.deep.equal({ isMatch: false, rankValues: [] });
  });


  test("can detect a two pair", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 4 }
    ]

    let isATwoPair = isTwoPair(hand);
    expect(isATwoPair).to.deep.equal({ isMatch: true, rankValues: [4, 2] });
  });

  test("can detect three of a kind", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 }
    ]

    let actual = isThreeOfAKind(hand);
    expect(actual).to.deep.equal({ isMatch: true, rankValues: [2] });
  });

  test("can detect four of a kind", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 }
    ]
    let actual = isFourOfAKind(hand);
    expect(actual).to.deep.equal({ isMatch: true, rankValues: [2] });
  });

  test("can detect not four of a kind", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 6 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 }
    ]
    let actual = isFourOfAKind(hand);
    expect(actual).to.deep.equal({ isMatch: false, rankValues: [] });
  });

  test("can detect a straight", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 6 }
    ]

    let actual = isStraight(hand);
    expect(actual).to.deep.equal({ isMatch: true, rankValues: [] });
  });

  test("can detect when it's not a straight becaues they are not next to each other", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 8 }
    ]
    expect(isStraight(hand)).to.deep.equal({ isMatch: false, rankValues: [] });
  });

  test("can detect when it's a flush (same suit for all cards)", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 8 }
    ]
    expect(isFlush(hand)).to.deep.equal({ isMatch: true, rankValues: [] });
  });

  test("can detect a full house", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Spades, value: 9 },
      { suit: Suit.Clubs, value: 9 },
      { suit: Suit.Clubs, value: 9 }
    ]
    expect(isFullHouse(hand)).to.deep.equal({ isMatch: true, rankValues: [9] });
  });

  test("can detect when it's a straight flush", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 7 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Clubs, value: 4 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 6 }
    ]
    expect(isStraightFlush(hand)).to.deep.equal({ isMatch: true, rankValues: [] });
  });

  test("can detect when it's a not a straight flush", () => {
    let hand: Card[] = [
      { suit: Suit.Clubs, value: 2 },
      { suit: Suit.Clubs, value: 3 },
      { suit: Suit.Spades, value: 9 },
      { suit: Suit.Clubs, value: 5 },
      { suit: Suit.Clubs, value: 6 }
    ]
    expect(isStraightFlush(hand)).to.deep.equal({ isMatch: false, rankValues: [] });
  });




  const highCardEights = "8H 3D 4H 5H 6H";
  const pairOfTwos = "2H 2S 3D 4D 7D";
  const pairOfFours = "4H 2S 3D 4D 7D";
  const twoPairWithHighOf4 = "2H 2S 4D 4D 7D";
  const twoPairWithHighOf7 = "7H 2S 4D 4D 7D";


  test("fully detect pair", () => {
    expect(detectHand(parseHand(highCardEights)).handRank).equals(HandRank.HighCard);
    expect(detectHand(parseHand(pairOfTwos)).handRank).equals(HandRank.Pair);
    expect(detectHand(parseHand("2H 2H 4D 4H 7H")).handRank).equals(HandRank.TwoPairs);
    expect(detectHand(parseHand(twoPairWithHighOf7)).handRank).equals(HandRank.TwoPairs);
    expect(detectHand(parseHand(twoPairWithHighOf4)).handRank).equals(HandRank.TwoPairs);
    expect(detectHand(parseHand("2H 2H 2D 4H 7H")).handRank).equals(HandRank.ThreeOfAKind);
    expect(detectHand(parseHand("2H 3H 4D 5H 6H")).handRank).equals(HandRank.Straight);
    expect(detectHand(parseHand("2H 2H 3H 4H 7H")).handRank).equals(HandRank.Flush);
    expect(detectHand(parseHand("2H 2H 3H 3H 3D")).handRank).equals(HandRank.FullHouse);
    expect(detectHand(parseHand("2H 2H 2H 2H 7D")).handRank).equals(HandRank.FourOfAKind);
    expect(detectHand(parseHand("2H 3H 4H 5H 6H")).handRank).equals(HandRank.StraightFlush);
  });

  test("trying all tiebreakers", () => {
    //pair-twoPair-threeKind-fourKind-straight-flush-fullHouse-straightFlush-highCard
    expect(detectHand(parseHand(pairOfTwos)).tiebreaker).to.deep.equal([2, 7, 4, 3]);
    expect(detectHand(parseHand(twoPairWithHighOf7)).tiebreaker).to.deep.equal([7, 4, 2]);
    expect(detectHand(parseHand("2H 2H 2D 5H 6H")).tiebreaker).to.deep.equals([2, 6, 5]);
    expect(detectHand(parseHand("4H 4H 4D 4H 6H")).tiebreaker).to.deep.equals([4, 6]);
    expect(detectHand(parseHand("2H 3H 4D 5H 6H")).tiebreaker).to.deep.equals([6, 5, 4, 3, 2]);
    expect(detectHand(parseHand("2H 3H 7H 5H 6H")).tiebreaker).to.deep.equals([7, 6, 5, 3, 2]);
    expect(detectHand(parseHand("2H 2H 3H 3H 3D")).tiebreaker).to.deep.equals([3, 2, 2]);
    expect(detectHand(parseHand("2H 3H 4H 5H 6H")).tiebreaker).to.deep.equals([6, 5, 4, 3, 2]);
    expect(detectHand(parseHand("8H 3D 4H 5S 6H")).tiebreaker).to.deep.equals([8, 6, 5, 4, 3]);

  });

  test("determine winner with same HandRank", () => {
    // same rank, tiebreaker high
    let w1 = determineWinner(
      { handRank: HandRank.Pair, tiebreaker: [2, 7, 5, 4] },
      { handRank: HandRank.Pair, tiebreaker: [4, 7, 5, 2] })
    expect(w1).to.deep.equal({ winner: Winner.PlayerTwo, tiebreaker: [4, 7, 5, 2], handRank: HandRank.Pair });

    // p1 handrank higher
    let w2 = determineWinner(
      { handRank: HandRank.TwoPairs, tiebreaker: [2, 7, 5, 4] },
      { handRank: HandRank.Pair, tiebreaker: [4, 7, 5, 2] })
    expect(w2).to.deep.equal({ winner: Winner.PlayerOne, tiebreaker: [2, 7, 5, 4], handRank: HandRank.TwoPairs });

    // p2 handrank higher
    let w3 = determineWinner(
      { handRank: HandRank.Pair, tiebreaker: [2, 7, 5, 4] },
      { handRank: HandRank.TwoPairs, tiebreaker: [4, 7, 5, 2] })
    expect(w3).to.deep.equal({ winner: Winner.PlayerTwo, tiebreaker: [4, 7, 5, 2], handRank: HandRank.TwoPairs });

    // p2 tiebreaker higher
    let w4 = determineWinner(
      { handRank: HandRank.TwoPairs, tiebreaker: [7, 3, 2] },
      { handRank: HandRank.TwoPairs, tiebreaker: [8, 3, 4] })
    expect(w4).to.deep.equal({ winner: Winner.PlayerTwo, tiebreaker: [8, 3, 4], handRank: HandRank.TwoPairs });

    // totally same hands
    let w5 = determineWinner(
      { handRank: HandRank.TwoPairs, tiebreaker: [8, 3, 2] },
      { handRank: HandRank.TwoPairs, tiebreaker: [8, 3, 2] })
    expect(w5).to.deep.equal({ winner: Winner.Tie, tiebreaker: [], handRank: HandRank.HighCard });

  });

  const twoPairWithHighOf4A = "2H 2S 4D 4D 7D";  // [4, 2, 7]
  const twoPairWithHighOf4B = "2H 2S 4D 4D 5D";  // [4, 2, 5]

  const pairOfTwosA = "2H 2S 3D 5D 9D";
  const pairOfTwosB = "2H 2S 4D 5D 9D";


  test("play game with same HandRank", () => {
    expect(playGame("Black: 2H 3D 5S 9C KD  White: 2C 2H 4S 8C AH")).equals("White wins. - with Pair: 2");
  });
  
//Flush needed HighCard Tiebreaking needs
  test("printing winner", () => {
    expect(printWinner({ winner: Winner.PlayerOne, tiebreaker: [2, 8, 4, 14], handRank: HandRank.Pair })).equals("Black wins. - with Pair: 2");
    expect(printWinner({ winner: Winner.PlayerOne, tiebreaker: [2, 8], handRank: HandRank.FullHouse })).equals("Black wins. - with Full House: 2 over 8");
    expect(printWinner({ winner: Winner.PlayerTwo, tiebreaker: [2, 8], handRank: HandRank.FullHouse })).equals("White wins. - with Full House: 2 over 8");
    //expect(printWinner({ winner: Winner.PlayerTwo, tiebreaker: [2, 8], handRank: HandRank.Flush })).equals("White wins. - with Flush.");
  });

});

