import { hasADigit } from "./NumberHelpers";

export function fizzbuzz(n:number):string {
    //if the remainder of n/3 is equal to 0 and if the remainder of n/5 is equal to 0
    if (n % 3 === 0 && n % 5 === 0) {
        return "FizzBuzz";
    }
    //if the remainder of n/3 is equal to 0 or n has a 3 as one of the digits 
    if (n % 3 === 0 || hasADigit(n, 3)) {
        return "Fizz";
    }
    if (n % 5 === 0 || hasADigit(n, 5)) {
        return "Buzz";
    }
    return n.toString();
}