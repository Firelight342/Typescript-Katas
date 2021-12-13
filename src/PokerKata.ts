import { count } from "console";
import { platform } from "os";
import { Card, parseHand, splitHands } from "./PokerParser";


export enum HandRank {
    HighCard = "High Card",
    Pair = "Pair",
    TwoPairs = "Two Pairs",
    ThreeOfAKind = "Three Of A Kind",
    Straight = "Straight",
    Flush = "Flush",
    FullHouse = "Full House",
    FourOfAKind = "Four Of A Kind",
    StraightFlush = "Straight Flush",
}
export interface RankMatch {
    isMatch: boolean
    rankValues: number[]
}


function countBy(hand: Card[], fn: (card: Card) => any): any {
    let counts: number[] =
        hand.map(fn)
            .reduce((acc: any, next) => {
                if (acc[next]) {
                    acc[next] += 1
                } else {
                    acc[next] = 1
                }
                return acc;
            }, {});
    return counts;
}

function countNumbers(hand: Card[]) {
    return countBy(hand, (card: Card) => card.value);
}

function countPairs(hand: Card[], pairSize: number): number {
    let numberCounts = countNumbers(hand)
    let pairValues = Object.values(numberCounts).filter(x => x === pairSize);
    let numberOfPairs = pairValues.length;

    return numberOfPairs;
}

export interface FaceValuesWithNumbers {
    countOfPairs: number;
    pairValues: number[];
}

function countPairsWithValues(hand: Card[], pairSize: number): FaceValuesWithNumbers {
    let numberCounts = countNumbers(hand)

    let faceValuesWithPairs = Object.keys(numberCounts)
        .filter(faceValue => numberCounts[faceValue] === pairSize);
    let numberOfPairs = faceValuesWithPairs.length;
    return {
        countOfPairs: numberOfPairs,
        pairValues: (faceValuesWithPairs.map(x => parseInt(x)).sort().reverse())
    };
}

export function isPair(hand: Card[]): RankMatch {
    let faceValuesWithNumbers = countPairsWithValues(hand, 2)
    let isPair = faceValuesWithNumbers.countOfPairs === 1;
    return { isMatch: isPair, rankValues: faceValuesWithNumbers.pairValues }
}

export function isTwoPair(hand: Card[]): RankMatch {
    let faceValuesWithNumbers = countPairsWithValues(hand, 2)
    let isTwoPair = faceValuesWithNumbers.countOfPairs === 2;
    return { isMatch: isTwoPair, rankValues: faceValuesWithNumbers.pairValues }
}

export function isThreeOfAKind(hand: Card[]): RankMatch {
    let faceValuesWithNumbers = countPairsWithValues(hand, 3)
    let isThreeOfAKind = faceValuesWithNumbers.countOfPairs === 1;
    return { isMatch: isThreeOfAKind, rankValues: faceValuesWithNumbers.pairValues }
}

export function isFourOfAKind(hand: Card[]): RankMatch {
    let faceValuesWithNumbers = countPairsWithValues(hand, 4)
    let isFourOfAKind = faceValuesWithNumbers.countOfPairs === 1;
    return { isMatch: isFourOfAKind, rankValues: faceValuesWithNumbers.pairValues }
}

export function isStraight(hand: Card[]): RankMatch {
    let numberCounts = countNumbers(hand);

    let cardFaces = Object.keys(numberCounts).map(x => parseInt(x));
    let minAndMaxCardAre4Apart = Math.max(...cardFaces) - Math.min(...cardFaces) === 4

    let all5CardsHaveAUnqiueValue = Object.values(numberCounts).filter(x => x === 1).length === 5

    return { isMatch: minAndMaxCardAre4Apart && all5CardsHaveAUnqiueValue, rankValues: [] };
}

export function isFlush(hand: Card[]): RankMatch {
    let suitCounts: number[] = countBy(hand, (card: Card) => card.suit);
    return { isMatch: (Object.keys(suitCounts).length === 1), rankValues: [] };
}

export function isFullHouse(hand: Card[]): RankMatch {
    let faceValuesWithNumbers = countPairsWithValues(hand, 3);
    return {
        isMatch: isThreeOfAKind(hand).isMatch && isPair(hand).isMatch,
        rankValues: faceValuesWithNumbers.pairValues
    };
}

export function isStraightFlush(hand: Card[]): RankMatch {
    return { isMatch: isFlush(hand).isMatch && isStraight(hand).isMatch, rankValues: [] };
}

export interface RankedHand {
    handRank: HandRank;
    tiebreaker: number[];
}
type HandRankDetector = (hand: Card[]) => RankMatch
export function detectHand(hand: Card[]): RankedHand {
    let pairings: [HandRankDetector, HandRank][] = [
        [isStraightFlush, HandRank.StraightFlush],
        [isFourOfAKind, HandRank.FourOfAKind],
        [isFullHouse, HandRank.FullHouse],
        [isFlush, HandRank.Flush],
        [isStraight, HandRank.Straight],
        [isThreeOfAKind, HandRank.ThreeOfAKind],
        [isTwoPair, HandRank.TwoPairs],
        [isPair, HandRank.Pair],]

    for (let [handRankDetector, handRank] of pairings) {
        let handhData = handRankDetector(hand);
        if (handhData.isMatch) {
            let tieBreakers = appendTieBreakers(hand, handhData.rankValues);
            return { tiebreaker: tieBreakers, handRank: handRank };
        }
    }
    let tieBreakers = appendTieBreakers(hand, []);
    return { tiebreaker: tieBreakers, handRank: HandRank.HighCard };
}

function appendTieBreakers(hand: Card[], rankValues: number[]) {
    let remainedCards = hand
        .map(x => x.value)
        .filter(x => !rankValues.includes(x))
        .sort((a, b) => b - a);
    return rankValues.concat(remainedCards);
}

const handRanks = {
    [HandRank.HighCard]: 1,
    [HandRank.Pair]: 2,
    [HandRank.TwoPairs]: 3,
    [HandRank.ThreeOfAKind]: 4,
    [HandRank.Straight]: 5,
    [HandRank.Flush]: 6,
    [HandRank.FullHouse]: 7,
    [HandRank.FourOfAKind]: 8,
    [HandRank.StraightFlush]: 9,
}

export enum Winner {
    PlayerOne = "PlayerOne",
    PlayerTwo = "Player Two",
    Tie = "Tie"
}

export interface WinnerInfo {
    winner: Winner;
    tiebreaker: number[];
    handRank: HandRank;
}

// determine winner from two RankedHands
export function determineWinner(player1: RankedHand, player2: RankedHand): WinnerInfo {
    if (handRanks[player1.handRank] > handRanks[player2.handRank]) {
        return { winner: Winner.PlayerOne, tiebreaker: player1.tiebreaker, handRank: player1.handRank };
    }
    if (handRanks[player1.handRank] < handRanks[player2.handRank]) {
        return { winner: Winner.PlayerTwo, tiebreaker: player2.tiebreaker, handRank: player2.handRank };
    }
    if (handRanks[player1.handRank] === handRanks[player2.handRank]) {
        if (player1.tiebreaker > player2.tiebreaker) {
            return { winner: Winner.PlayerOne, tiebreaker: player1.tiebreaker, handRank: player1.handRank };
        }
        if (player1.tiebreaker < player2.tiebreaker) {
            return { winner: Winner.PlayerTwo, tiebreaker: player2.tiebreaker, handRank: player2.handRank };
        }
        return { winner: Winner.Tie, tiebreaker: [], handRank: HandRank.HighCard };
    }
    return { winner: Winner.Tie, tiebreaker: [], handRank: HandRank.HighCard };
    // impossible, but needed for typesystem
}

// orchestration of all helpers     (parse, transform, calc.)
export function playGame(playersHand: string): string {
    let [player1, player2] = splitHands(playersHand).map(x => detectHand(parseHand(x)))
    return printWinner(determineWinner(player1, player2));
}

//HighCard Tiebreaking needs
export function printWinner(winnerInfo: WinnerInfo): string {
    let player = ""
    if (winnerInfo.winner === "PlayerOne") {
        player = "Black"
    }
    else {
        player = "White"
    }

    if (winnerInfo.handRank === "Full House") {
        return player + " wins. - with " + winnerInfo.handRank
            + ": " + winningCard(winnerInfo.tiebreaker[0]) + " over " + winningCard(winnerInfo.tiebreaker[1])
    }
    if (winnerInfo.handRank === "Flush") {
        return player + " wins. - with " + winnerInfo.handRank
            + "."
    }
    if (winnerInfo.winner != Winner.Tie) {
        return player + " wins. - with " + winnerInfo.handRank + ": " + winningCard(winnerInfo.tiebreaker[0])
    }
    else {
        return "Tie."
    }
}

//need a better name
function winningCard(input: number) {
    if (input === 10) {
        return "Ten"
    }
    if (input === 11) {
        return "Jack"
    }
    if (input === 12) {
        return "Queen"
    }
    if (input === 13) {
        return "King"
    }
    if (input === 14) {
        return "Ace"
    }
    return input;
}


// SOLID patterns / principals
// S - (easy to test) Single responsibility principal
// O -                  open closed principal 
// L -                  liskov subsitition
// I -                  interface separation
// D - (fewer tests) dependency inversion principal

//                fewest UI tests 
//                fewer integration tests  (database, file system, accessing web sites)
//              few orchestrator unit tests 
//           fewer "bigger" unit tests that execise multiple helpers
//    pure focused unit tests on leaf logic nodes

// dependency inversion  ->  "flip" a function to the bottom of the stack, by passing in parameters it used to calculate
// single responsibility principal -> a function should only have one reason to change

//         FFF          playGame
//         FFFFFF    detectHand                                      |                parseHand                 
//      isFullHouse            isStraightFlush   appendTieBreakers   |             parseCard    parseSuit 
//      isFlush   isStraight  isPair isTwoPair                       | 
//      countPairsWithValues                                         |      
//      countBy                            determineWinner           |   

