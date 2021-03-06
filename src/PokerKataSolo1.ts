import { log } from "console";
import { Card } from "../src/PokerParserSolo1"
import { parseHand } from "./PokerParser";

export enum HandRank {
    HighCard = "High Card",
    Pair = "Pair",
    TwoPair = "Two Pair",
    ThreeOfAKind = "Three of a Kind",
    Straight = "Straight",
    Flush = "Flush",
    FullHouse = "Full House",
    FourOfAKind = "Four of a Kind",
    StraightFlush = "Straight Flush",
}

export interface PairValues {
    numberOfPairs: number;
    pairValues: number[];
}

interface RankAndValues {
    isMatch: boolean
    rankValues: number[]
}

function repeatCard(hand: Card[], fn: (card: Card) => any): any {
    let numberOfTimes =
        hand.map(fn)
            .reduce((previousVal: any, currentVal) => {
                if (previousVal[currentVal]) {
                    previousVal[currentVal] += 1
                }
                else {
                    previousVal[currentVal] = 1
                }
                return previousVal;
            }, {})
    return numberOfTimes;
}

function countValues(hand: Card[]) {
    return repeatCard(hand, (card: Card) => card.value);
}

function countPairs(hand: Card[], pairSize: number): PairValues {
    let numberCounts = countValues(hand);
    let pairValuesAsKey = Object.keys(numberCounts)
        .filter(x => numberCounts[x] === pairSize);
    let pairValues = pairValuesAsKey.map(x => parseInt(x)).sort((a, b) => b - a)
    let numberOfPairs = pairValues.length

    return { numberOfPairs: numberOfPairs, pairValues: pairValues }
};

export function isPair(hand: Card[]): RankAndValues {
    let handRank = countPairs(hand, 2);
    let isPair = handRank.numberOfPairs === 1;
    return { isMatch: isPair, rankValues: handRank.pairValues }
}
export function isTwoPair(hand: Card[]): RankAndValues {
    let handRank = countPairs(hand, 2);
    let isTwoPair = handRank.numberOfPairs === 2;
    return { isMatch: isTwoPair, rankValues: handRank.pairValues }
}
export function isThreeOfAKind(hand: Card[]): RankAndValues {
    let handRank = countPairs(hand, 3);
    let isThreeOfAKind = handRank.numberOfPairs === 1;
    return { isMatch: isThreeOfAKind, rankValues: handRank.pairValues }
}

export function isStraight(hand: Card[]): RankAndValues {
    let sortedCardValues = Object.keys(countValues(hand)).sort().reverse();
    let lowestVal: any = sortedCardValues[sortedCardValues.length - 1]
    let highestVal: any = sortedCardValues[0]
    let are4Apart = (highestVal - lowestVal === 4)

    let handHasNoRepeats = Object.values(countValues(hand)).filter(x => x === 1).length === 5;
    return { isMatch: (are4Apart && handHasNoRepeats), rankValues: [] }
}
export function isFlush(hand: Card[]): RankAndValues {
    let isFlush = repeatCard(hand, (card: Card) => card.suit)
    return { isMatch: (Object.keys(isFlush)).length === 1, rankValues: [] }
}
export function isFullHouse(hand: Card[]): RankAndValues {
    let handRankOf3 = countPairs(hand, 3);
    return { isMatch: isThreeOfAKind(hand).isMatch && isPair(hand).isMatch, rankValues: handRankOf3.pairValues };
}
export function isFourOfAKind(hand: Card[]): RankAndValues {
    let handRank = countPairs(hand, 4);
    let isFourOfAKind = handRank.numberOfPairs === 1;
    return { isMatch: isFourOfAKind, rankValues: handRank.pairValues }
}
export function isStraightFlush(hand: Card[]): RankAndValues {
    return { isMatch: isStraight(hand).isMatch && isFlush(hand).isMatch, rankValues: [] }
}

export interface RankAndTieBreaker {
    handRank: HandRank;
    tieBreaker: number[]
}
export function detectHand(hand: Card[]): RankAndTieBreaker {
    let handInfoSF = isStraightFlush(hand);
    if (handInfoSF.isMatch) {
        return { handRank: HandRank.StraightFlush, tieBreaker: getTiebreaker(hand, handInfoSF.rankValues) };
    }
    let handInfoFH = isFullHouse(hand)
    if (handInfoFH.isMatch) {
        return { handRank: HandRank.FullHouse, tieBreaker: getTiebreaker(hand, handInfoFH.rankValues) };
    }
    let handInfo4oK = isFourOfAKind(hand)
    if (handInfo4oK.isMatch) {
        return { handRank: HandRank.FourOfAKind, tieBreaker: getTiebreaker(hand, handInfo4oK.rankValues) };
    }
    let handInfoF = isFlush(hand)
    if (handInfoF.isMatch) {
        return { handRank: HandRank.Flush, tieBreaker: getTiebreaker(hand, handInfoF.rankValues) };
    }
    let handInfoS = isStraight(hand)
    if (handInfoS.isMatch) {
        return { handRank: HandRank.Straight, tieBreaker: getTiebreaker(hand, handInfoS.rankValues) };
    }
    let handInfoPo3 = isThreeOfAKind(hand)
    if (handInfoPo3.isMatch) {
        return { handRank: HandRank.ThreeOfAKind, tieBreaker: getTiebreaker(hand, handInfoPo3.rankValues) };
    }
    let handInfoPo2 = isTwoPair(hand)
    if (handInfoPo2.isMatch) {
        return { handRank: HandRank.TwoPair, tieBreaker: getTiebreaker(hand, handInfoPo2.rankValues) };
    }
    let handInfoP = isPair(hand);
    if (handInfoP.isMatch) {
        return { handRank: HandRank.Pair, tieBreaker: getTiebreaker(hand, handInfoPo2.rankValues) };
    }
    return { handRank: HandRank.HighCard, tieBreaker: getTiebreaker(hand, []) };
}


function getTiebreaker(hand: Card[], rankVlaues: number[]) {
    let sortedCardValues = hand.map(x => x.value)
        .filter(x => !rankVlaues.includes(x))
        .sort((a, b) => b - a);
    return rankVlaues.concat(sortedCardValues);
}

/*What I need for next
playGame (input: Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH) (output: White wins. - with high card: Ace)
detectHand (input: [2H 3D 5S 9C KD]) (output: handRank, valueRank)
isFullHouse ()
*/

//         FFF          playGame
//         FFFFFF    detectHand                                      |                parseHand
//      isFullHouse    isStraightFlush   appendTieBreakers           |             parseCard    parseSuit
//      isFlush   isStraight  isPair isTwoPair                       |
//              countPairsWithValues                                 |
//                  countBy                determineWinner           |   
