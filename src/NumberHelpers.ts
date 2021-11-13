                        // n=parameter :number=type     ):boolean=what should be returned
export function hasADigit(n:number, numberToFind:number):boolean{
                            //returns a string version of an object
    var numberAsAString = n.toString();
                        //searches for an occurance of numberToFind in numberAsAString
    return numberAsAString.indexOf(numberToFind.toString()) > -1;
}
