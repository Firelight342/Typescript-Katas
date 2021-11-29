export enum Suit {
    Hearts,
    Clubs,
    Spades,
    Diamonds,
}

export interface Card {
    suit: Suit
    value: number
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
    let numberCounts =
        hand.map((card: Card) => card.value)
            .reduce((acc: any, next) => {
                if (acc[next]) {
                    acc[next] += 1
                } else {
                    acc[next] = 1
                }
                return acc;
            }, {});
    return numberCounts;
}

function countPairs(hand: Card[], pairSize: number): number {

    let numberOfPairs = Object.values(countNumbers(hand)).filter(x => x === pairSize).length;
    return numberOfPairs;
}

export function isPair(hand: Card[]): boolean {
    return countPairs(hand, 2) === 1;
}

export function isTwoPair(hand: Card[]): boolean {
    return countPairs(hand, 2) === 2;
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


export function isFlush(hand: Card[]): boolean {
    let suitCounts: number[] =
        hand.map((card: Card) => card.suit)
            .reduce((acc: any, next) => {
                if (acc[next]) {
                    acc[next] += 1
                } else {
                    acc[next] = 1
                }
                return acc;
            }, {});
    return (Object.keys(suitCounts).length === 1);
}

export function isStraightFlush(hand: Card[]): boolean {
    return isFlush(hand) === isStraight(hand);
}

