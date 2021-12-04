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

export function detectHand(hand: Card[]): RankedHand {

    let straightFlushData = isStraightFlush(hand);
    if (straightFlushData.isMatch) {
        let tieBreakers = appendTieBreakers(hand, straightFlushData);
        return { tiebreaker: tieBreakers, handRank: HandRank.StraightFlush };
    }
    let fourOfAKindData = isFourOfAKind(hand)
    if (fourOfAKindData.isMatch) {
        let tieBreakers = appendTieBreakers(hand, fourOfAKindData);
        return { tiebreaker: tieBreakers, handRank: HandRank.FourOfAKind };
    }
    let fullHouseData = isFullHouse(hand)
    if (fullHouseData.isMatch) {
        //let tieBreakers = appendTieBreakers(hand, fullHouseData);
        return { tiebreaker: fullHouseData.rankValues, handRank: HandRank.FullHouse };
    }

    let flushData = isFlush(hand)
    if (flushData.isMatch) {
        let tieBreakers = appendTieBreakers(hand, flushData);
        return { tiebreaker: tieBreakers, handRank: HandRank.Flush };
    }
    let straightData = isStraight(hand)
    if (straightData.isMatch) {
        let tieBreakers = appendTieBreakers(hand, straightData);
        return { tiebreaker: tieBreakers, handRank: HandRank.Straight };
    }
    let threeOfAKindData = isThreeOfAKind(hand)
    if (threeOfAKindData.isMatch) {
        let tieBreakers = appendTieBreakers(hand, threeOfAKindData);
        return { tiebreaker: tieBreakers, handRank: HandRank.ThreeOfAKind };
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
    let highCardData = isHighCard(hand)
    let tieBreakers = appendTieBreakers(hand, highCardData);
    return { tiebreaker: tieBreakers, handRank: HandRank.HighCard };
}
//Not sure if this step is needed
export function isHighCard(hand: Card[]): RankMatch {
    let faceValuesWithNumbers = countPairsWithValues(hand, 2)
    let isHighCard = faceValuesWithNumbers.countOfPairs === 0;
    return { isMatch: isHighCard, rankValues: [] }
}

function appendTieBreakers(hand: Card[], type: RankMatch) {
    let remainedCards = hand
        .map(x => x.value)
        .filter(x => !type.rankValues.includes(x))
        //added sort
        .sort()
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

