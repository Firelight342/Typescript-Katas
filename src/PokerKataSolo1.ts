import { log } from "console";
import { Card } from "../src/PokerParserSolo1"


function repeatCard(hand: Card[]) {
    let numberOfTimes: number[] =
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

function countPairs(hand: Card[], pairSize: number): number {
    let numberCounts = repeatCard(hand);
    let pairValues = Object.values(numberCounts).filter(x => x === pairSize);
    let numberOfPairs = pairValues.length

    return numberOfPairs;
}

export function isPair(hand: Card[]): boolean {
    return countPairs(hand, 2) === 1;
}

/*What I need for next
playGame (input: Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH) (output: White wins. - with high card: Ace)
detectHand (input: [2H 3D 5S 9C KD]) (output: handRank, valueRank(only needed for flush/straightFlush))
isFullHouse ()
*/

//         FFF          playGame 
//         FFFFFF    detectHand                                      |                parseHand                 
//      isFullHouse    isStraightFlush   appendTieBreakers           |             parseCard    parseSuit 
//      isFlush   isStraight  isPair isTwoPair                       | 
//              countPairsWithValues                                 |      
//                  countBy                determineWinner           |   
