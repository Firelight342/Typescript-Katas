import { log } from "console";
import { Card } from "../src/PokerParserSolo1"

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

function repeatCard(hand: Card[]) {
    let numberOfTimes =
        hand.map((card: Card) => card.value)
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

function countPairs(hand: Card[], pairSize: number): PairValues {
    let numberCounts = repeatCard(hand);

    let pairValuesAsKey = Object.keys(numberCounts)
        .filter(x => numberCounts[x] === pairSize);
    let pairValues = pairValuesAsKey.map(x => parseInt(x)).sort((a, b) => b - a)
    let numberOfPairs = pairValues.length

    return { numberOfPairs: numberOfPairs, pairValues: pairValues }
};

interface RankAndValues {
    isMatch: boolean
    rankValues: number[]
}

export function isPair(hand: Card[]): RankAndValues {
    let handRank = countPairs(hand, 2);
    let isPair = handRank.numberOfPairs === 1;
    return { isMatch: isPair, rankValues: handRank.pairValues }
}
export function isTwoPair(hand: Card[]): RankAndValues {
    let handRank = countPairs(hand, 2);
    let isPair = handRank.numberOfPairs === 2;
    return { isMatch: isPair, rankValues: handRank.pairValues }
}
export function isThreeOfAKind(hand: Card[]): RankAndValues {
    let handRank = countPairs(hand, 3);
    let isPair = handRank.numberOfPairs === 1;
    return { isMatch: isPair, rankValues: handRank.pairValues }
}
//Straight Flush FullHouse

export function isFourOfAKind(hand: Card[]): RankAndValues {
    let handRank = countPairs(hand, 4);
    let isPair = handRank.numberOfPairs === 1;
    return { isMatch: isPair, rankValues: handRank.pairValues }
}

//StraightFlush


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
