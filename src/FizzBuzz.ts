import { hasADigit } from "./NumberHelpers";

export function fizzbuzz(n:number):string {
    if (n % 3 === 0 && n % 5 === 0) {
        return "FizzBuzz";
    }
    if (n % 3 === 0 || hasADigit(n, 3)) {
        return "Fizz";
    }
    if (n % 5 === 0 || hasADigit(n, 5)) {
        return "Buzz";
    }
    return n.toString();
}



