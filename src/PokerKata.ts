import { Card, parseHand } from "./PokerParser";


export enum HandRank {
    HighCard = "HighCard",
    Pair = "Pair",
    TwoPairs = "TwoPairs",
    ThreeOfAKind = "ThreeOfAKind",
    Straight = "Straight",
    Flush = "Flush",
    FullHouse = "FullHouse",
    FourOfAKind = "FourOfAKind",
    StraightFlush = "StraightFlush",
}
export interface RankMatch {
    isMatch: boolean
    rankValues: number[]
}


function countNumbers(hand: Card[]) {
    return countBy(hand, (card: Card) => card.value);
}

function countPairs(hand: Card[], pairSize: number): number {
    let numberCounts = countNumbers(hand)
    //console.log(numberCounts)
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

export function isThreeOfAKind(hand: Card[]): boolean {
    return countPairs(hand, 3) === 1;
}

export function isFourOfAKind(hand: Card[]): boolean {
    return countPairs(hand, 4) === 1;
}

export function isStraight(hand: Card[]): boolean {
    let numberCounts = countNumbers(hand);

    let cardFaces = Object.keys(numberCounts).map(x => parseInt(x));
    let minAndMaxCardAre4Apart = Math.max(...cardFaces) - Math.min(...cardFaces) === 4

    let all5CardsHaveAUnqiueValue = Object.values(numberCounts).filter(x => x === 1).length === 5

    return minAndMaxCardAre4Apart && all5CardsHaveAUnqiueValue
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

export function isFlush(hand: Card[]): boolean {
    let suitCounts: number[] = countBy(hand, (card: Card) => card.suit);
    return (Object.keys(suitCounts).length === 1);
}

export function isStraightFlush(hand: Card[]): boolean {
    return isFlush(hand) && isStraight(hand);
}

export function isFullHouse(hand: Card[]): boolean {
    return isThreeOfAKind(hand) && isPair(hand).isMatch;
}

export interface RankedHand {
    handRank: HandRank;
    tiebreaker: number[];
}

export function detectHand(hand: Card[]): RankedHand {
    if (isStraightFlush(hand)) {
        return { handRank: HandRank.StraightFlush, tiebreaker: [] };
    }
    if (isFourOfAKind(hand)) {
        return { tiebreaker: [], handRank: HandRank.FourOfAKind };
    }
    if (isFullHouse(hand)) {
        return { tiebreaker: [], handRank: HandRank.FullHouse };
    }
    if (isFlush(hand)) {
        return { tiebreaker: [], handRank: HandRank.Flush };
    }
    if (isStraight(hand)) {
        return { tiebreaker: [], handRank: HandRank.Straight };
    }
    if (isThreeOfAKind(hand)) {
        return { tiebreaker: [], handRank: HandRank.ThreeOfAKind };
    }
    let twoPairData = isTwoPair(hand)
    if (twoPairData.isMatch) {
        let tieBreakers = appendTieBreakers(hand, twoPairData);
        return { tiebreaker: tieBreakers, handRank: HandRank.TwoPairs };
    }
    let pairData = isPair(hand)
    if (pairData.isMatch) {
        let tieBreakers = appendTieBreakers(hand, pairData);
        return { tiebreaker: tieBreakers, handRank: HandRank.Pair };
    }
    return { tiebreaker: [], handRank: HandRank.HighCard };
}

function appendTieBreakers(hand: Card[], type: RankMatch) {
    let remainedCards = hand
        .map(x => x.value)
        .filter(x => !type.rankValues.includes(x))
        .reverse();
    return type.rankValues.concat(remainedCards);
}

export enum Winner {
    PlayerOne = "PlayerOne",
    PlayerTwo = "Player Two",
    Tie = "Tie"
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

// determine winner from two RankedHands
export function determineWinner(player1: RankedHand, player2: RankedHand): Winner {
    if (handRanks[player1.handRank] > handRanks[player2.handRank]) {
        return Winner.PlayerOne
    }
    if (handRanks[player1.handRank] < handRanks[player2.handRank]) {
        return Winner.PlayerTwo
    }
    if (handRanks[player1.handRank] === handRanks[player2.handRank]) {
        if (player1.tiebreaker > player2.tiebreaker) {
            return Winner.PlayerOne;
        }
        if (player1.tiebreaker < player2.tiebreaker) {
            return Winner.PlayerTwo;
        }
        return Winner.Tie;
    }
    return Winner.Tie; // impossible, but needed for typesystem
}


// orchestration of all helpers     (parse, transform, calc.)
export function playGame(player1String: string, player2String: string): Winner {
    let player1 = detectHand(parseHand(player1String))
    let player2 = detectHand(parseHand(player2String))

    return determineWinner(player1, player2);
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

