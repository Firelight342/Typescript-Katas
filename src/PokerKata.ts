export enum Suit {
    Hearts,
    Clubs,
    Spades,
    Diamonds,
}

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

export interface Card {
    suit: Suit
    value: number
}

export interface RankMatch {
    isMatch: boolean
    rankValues: number[]
}

// pure, helper functions (leaf logic nodes)
function parseSuit(suitString: string): Suit {
    var suit = Suit.Hearts;
    if (suitString === 'D') {
        suit = Suit.Diamonds
    } else if (suitString === 'S') {
        suit = Suit.Spades
    } else if (suitString === 'C') {
        suit = Suit.Clubs
    }
    return suit;
}

function parseValue(valueString: string): number {
    var cardValue = parseInt(valueString);

    if (valueString === "A") {
        cardValue = 14
    } else if (valueString === "K") {
        cardValue = 13
    } else if (valueString === "Q") {
        cardValue = 12
    } else if (valueString === "J") {
        cardValue = 11
    } else if (valueString === "T") {
        cardValue = 10
    }
    return cardValue;
}
//           parseCard
//     parseValue   parseSuit


// orchestration function / layer / controller / manager
export function parseCard(s: string): Card {
    var suit = parseSuit(s[1]);
    var cardValue = parseValue(s[0]);
    return { suit: suit, value: cardValue };
}

export function parseHand(handString: string): Card[] {
    let cards = handString.split(" ");
    let hand = cards.map(card => parseCard(card));
    return hand;
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

export function detectHand(handString: string): RankedHand {
    let hand = parseHand(handString)

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
    let remainedCards= hand
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

export function determineWinner(player1String: string, player2String: string): Winner {
    let player1 = detectHand(player1String)
    let player2 = detectHand(player2String)

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
    return Winner.Tie;
}




//                 determineWinner
//                   detectHand                  
//      isFullHouse            isStraightFlush             parseHand 
//      isFlush   isStraight  isPair isTwoPair       parseCard    parseSuit ...
//      countPairsWithValues


//                                                 StringEntry.detectHand                      ...
//                DomainLogic.detectHand                      StringParsers.parseHand           HtmlParsers.parseHand                                     
// isFullHouse            isStraightFlush   
// isFlush   isStraight  isPair isTwoPair                   parseCard    parseSuit ...             ...       ...

