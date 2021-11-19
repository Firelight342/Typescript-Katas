export function splitAndAdd1(numberList: string): number[] {
    let numberArray = numberList.split(",");
    let numbers = [];
    for(let n of numberArray){
        let newNum = parseInt(n) +1 ;
        numbers.push(newNum);
    }
    return numbers;
}

function map(inputArray:any, func: any) : any {
    let outputArray = [];
    for(let n of inputArray){
        let newNum = func(n);
        outputArray.push(newNum);
    }
    return outputArray;
}

export function countWordSizes(input:string):string{
    let stringArray = input.split(" ");
    let output = stringArray.map(word => word.length) 
    return output.join(" ");
}

function turnWordIntoStars(word:string):string {
    let characterArray = word.split("");
    let stars = characterArray.map(character => "*")
    return stars.join("");
}

export function countWordSizesVisually(input:string):string{
    let stringArray = input.split("");
    let output = stringArray.map(char => {
        if(char === " "){
            return "\n";
        } else {
            return "*";
        }
    }) 
    return output.join("");
}

export function countWordSizesVisually2(input:string):string{
    let stringArray = input.split(" ");
    let output = stringArray.map(word => turnWordIntoStars(word));
    return output.join("\n");
}

export function histogramLetters(input:string):string{
    let letterHistogram:any ={"a":"","b":"","c":"","d":""};
    let letters = input.split("");
    let output = letters.map(letter => {
        letterHistogram[letter] += "*";
    });
    let histogramDisplayLine = Object.keys(letterHistogram)
        .map(letter => letter + ": " + letterHistogram[letter]);
    return histogramDisplayLine.join("\n");
}

// console.log(histogramLetters("abccccddddaaaccgggd"))

export function add5(numberArray:number[]): number[]  {
    let numbers = numberArray.map(num => num + 5);
    return numbers;
}

export function splitAndAdd1WithMap(numberList: string): number[] {
    let numberArray = numberList.split(",");
    let numbers = numberArray.map(x => parseInt(x) + 1);
    return numbers;
}


export function capAllTheWords(input:string) :string {
    let stringArray = input.split(" ");
    let words = stringArray.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(" ");
}

export function capAllTheWordsWithFor(input:string) :string {
    let stringArray = input.split(" ");
    let words = [];
    for(let word of stringArray){
        let newWord = word.charAt(0).toUpperCase() + word.slice(1);
        words.push(newWord);
    }

    return words.join(" ");
}