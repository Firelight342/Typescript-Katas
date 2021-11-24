To run tests:
In terminal go to folder where code is and run to see test
npm run watch-test

To send to gitHub:
git status
git add 
git add . (for adding all)
git commit -m "Your Message Here"
git push

To print into the terminal:
console.log()









export function parseHandMap (handString :string) :Card[] {
    let cards = handString.split(" ");
    let hand= cards.map(card => parseCard(card));
    //console.log(hand)
    return hand;
}

export function parseHandMap (handString :string) :Card[] {
    return handString.split(" ").map(card => parseCard(card));
}