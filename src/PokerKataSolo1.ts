import { parse } from "path";
import { splitHands } from "./PokerParser";

export enum Suit {
    Clubs,
    Diamonds,
    Hearts,
    Spades
}

export interface Card {
    suit: Suit
    value: number
}

export function parseValue(value: string): number {
    let cardValue = parseInt(value);
    if (value === "T") {
        return 10;
    }
    if (value === "J") {
        return 11;
    }
    if (value === "Q") {
        return 12;
    }
    if (value === "K") {
        return 13;
    }
    if (value === "A") {
        return 14;
    }
    return cardValue;
}

export function parseSuit(suit: string): Suit {
    if (suit === "D") {
        return Suit.Diamonds;
    }
    if (suit === "C") {
        return Suit.Clubs;
    }
    if (suit === "S") {
        return Suit.Spades;
    }
    return Suit.Hearts;
}

export function parseCard(card: string): Card {
    let value = parseValue(card[0])
    let suit = parseSuit(card[1])
    return { suit: suit, value: value };
}

export function parseHand(handString: string): Card[] {
    let splitHand = handString.split(" ") 
    let hand= splitHand.map(x => parseCard(x))
    return hand;
}


/*What I need for this
take hand and split value and suit
turn t,j,q,k,a into numbers
a card interface: value and suit
value is a number suit is a enum option
*/

//         FFF          playGame
//         FFFFFF    detectHand                                      |                parseHand                 
//      isFullHouse            isStraightFlush   appendTieBreakers   |             parseCard    parseSuit 
//      isFlush   isStraight  isPair isTwoPair                       | 
//      countPairsWithValues                                         |      
//      countBy                            determineWinner           |   
