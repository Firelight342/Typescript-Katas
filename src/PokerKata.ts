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
function parseSuit(suitString:string) : Suit {
    var suit = Suit.Hearts;
    if (suitString === 'D'){
        suit = Suit.Diamonds
    } else if (suitString === 'S'){
        suit = Suit.Spades
    } else if (suitString === 'C'){
        suit = Suit.Clubs
    }
    return suit;
}

function parseValue(valueString:string):number{
    var cardValue = parseInt(valueString);

    if (valueString === "A") {
        cardValue = 14
    } else if(valueString === "K") {
        cardValue = 13
    } else if(valueString === "Q") {
        cardValue = 12
    } else if(valueString === "J") {
        cardValue = 11
    } else if(valueString === "T") {
        cardValue = 10
    }
    return cardValue;
}
//           parseCard
//     parseValue   parseSuit


// orchestration function / layer / controller / manager
export function parseCard(s:string):Card {
    var suit = parseSuit(s[1]);
    var cardValue = parseValue(s[0]);
    return { suit:suit, value:cardValue };
}

export function parseHand(handString :string) : Card[] {
    let cards = handString.split(" ");
    let hand = cards.map(card => parseCard(card));
    return hand;
}

export function isPair(hand:Card[]):boolean{
    let numbers = hand.map((card:Card) => card.value);
    let numberCounts = numbers.reduce((acc:any,next) => {
        if (acc[next]) {
            acc[next] += 1
        } else {
            acc[next] = 1
        }
        return acc;
    }, {});
    let allPairs = Object.values(numberCounts).filter(x => x === 2);
    let isPair= allPairs.length === 1;
    return isPair; 
}
