export function hasADigit(n:number, numberToFind:number):boolean{
    var numberAsAString = n.toString();
    return numberAsAString.indexOf(numberToFind.toString()) > -1;
}
