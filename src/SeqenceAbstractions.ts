export function splitAndAdd1(numberList: string): number[] {
    let numberArray = numberList.split(",");
    let numbers = [];
    for (let n of numberArray) {
        let newNum = parseInt(n) + 1;
        numbers.push(newNum);
    }
    return numbers;
}

function map(inputArray: any, func: any): any {
    let outputArray = [];
    for (let n of inputArray) {
        let newNum = func(n);
        outputArray.push(newNum);
    }
    return outputArray;
}

export function countWordSizes(input: string): string {
    let stringArray = input.split(" ");
    let output = stringArray.map(word => word.length)
    return output.join(" ");
}

function turnWordIntoStars(word: string): string {
    let characterArray = word.split("");
    let stars = characterArray.map(character => "*")
    return stars.join("");
}

export function countWordSizesVisually(input: string): string {
    let stringArray = input.split("");
    let output = stringArray.map(char => {
        if (char === " ") {
            return "\n";
        } else {
            return "*";
        }
    })
    return output.join("");
}


export function countWordSizesVisually2(input: string): string {
    let stringArray = input.split(" ");
    let output = stringArray.map(word => turnWordIntoStars(word));
    return output.join("\n");
}

export function mapWithReduce(input: number[], fn: (x: number) => number): number[] {
    return input.reduce((acc: number[], next) => {
        acc.push(fn(next));
        return acc;
    }, []);
}

export function sumUp(numbers: number[]): number {
    let sum = numbers.reduce((acc: any, next) => {
        acc = acc + next;
        return acc;
    }, 0)
    return sum;
}

export function onlyEvens(numbers: number[]): number[] {
    let evens = numbers.reduce((acc: any, next) => {
        if (next % 2 === 0) {
            acc.push(next);
        }
        return acc;
    }, [])
    return evens;
}

export function reduceFilter(numbers: number[], fn: (x: number) => boolean): number[] {
    let filteredList = numbers.reduce((acc: any, next) => {
        if (fn(next)) {
            acc.push(next);
        }
        return acc;
    }, [])
    return filteredList;
}

export function concatDouble(input: number[]): number[] {
    let doubledArray = input.reduce((acc: number[], next) => {
        acc.push(next)
        acc.push(next)
        return acc;
    }, [])
    return doubledArray;
}

export function concatX(numbers: number[], multiplier: number): number[] {
    let doubledArray = numbers.reduce((acc: number[], next) => {
        for (let x = 0; x < multiplier; x++) {
            acc.push(next)
        }
        return acc;
    }, [])
    return doubledArray;
}

export function homemadeJoin(words: string[], separater: string) {
    let joinedString = words.reduce((acc: any, next, index) => {
        //console.log(acc,next, index)
        if (words.length === index + 1) {
            acc = acc + next;
        } else {
            acc = acc + next + separater;
        }
        return acc;
    }, "")
    return joinedString;
}

export function countLetters(input: string) {
    let letters = input.split("");
    let letterCounts = letters.reduce((acc: any, next) => {
        if (acc[next]) {
            acc[next] += 1
        } else {
            acc[next] = 1
        }
        return acc;
    }, {})
    return letterCounts;
}


export function histogramLetters(input: string): string {
    let letters = input.split("");

    let letterHistogram: any =
        letters.reduce((letterHistogram: any, letter) => {
            letterHistogram[letter] += "*";
            return letterHistogram;
        }, { "a": "", "b": "", "c": "", "d": "" });

    let histogramDisplayLine = Object.keys(letterHistogram)
        .map(letter => letter + ": " + letterHistogram[letter]);
    return histogramDisplayLine.join("\n");
}

export function histogramLetters2(input: string): string {
    let letters = input.split("");
    let letterHistogram: any = { "a": "", "b": "", "c": "", "d": "" };
    letters.map(letter => {
        letterHistogram[letter] += "*";
    });
    let histogramDisplayLine = Object.keys(letterHistogram)
        .map(letter => letter + ": " + letterHistogram[letter]);
    return histogramDisplayLine.join("\n");
}

// console.log(histogramLetters("abccccddddaaaccgggd"))

export function add5(numberArray: number[]): number[] {
    let numbers = numberArray.map(num => num + 5);
    return numbers;
}

export function splitAndAdd1WithMap(numberList: string): number[] {
    let numberArray = numberList.split(",");
    let numbers = numberArray.map(x => parseInt(x) + 1);
    return numbers;
}

export function capAllTheWords(input: string): string {
    let stringArray = input.split(" ");
    let words = stringArray.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(" ");
}

export function capAllTheWordsWithForOG(input: string): string {
    let stringArray = input.split(" ");
    let words = [];
    for (let word of stringArray) {
        let newWord = word.charAt(0).toUpperCase() + word.slice(1);
        words.push(newWord);
    }
    return words.join(" ");
}

export function capAllTheWordsWithMap(input: string): string {
    let words = input.split(" ");
    let letters = words.map(letter => letter.charAt(0).toUpperCase() + letter.slice(1));
    return letters.join(" ");
}
