import { onlyEvens, reduceFilter, sumUp, mapWithReduce, homemadeJoin, countLetters, concatX, concatDouble, histogramLetters, add5, countWordSizesVisually, countWordSizes, capAllTheWords, splitAndAdd1, splitAndAdd1WithMap, capAllTheWordsWithMap } from "../src/SeqenceAbstractions";

const chai = require("chai");
const expect = chai.expect;

describe("Sequence abstraction Tests", () => {

  it("number less than 7", () => {
    let input = [1, 2, 3, 45, 6, 7];
    let output = input.filter(x => x < 7);
    expect(output).to.deep.equal([1, 2, 3, 6]);
  });

  it("return strings longer than 4", () => {
    let input = ["steve", "sam", "sammy"];
    let output = input.filter(x => x.length > 4)
    expect(output).to.deep.equal(["steve", "sammy"]);
  });

  it("reduceFilter can accept aribrary filter lambdas", () => {
    let numberString = reduceFilter([1, 2, 3, 4, 5, 6], (x) => x % 2 === 1)
    expect(numberString).to.deep.equal([1, 3, 5]);
  });

  it("onlyEvens can filter only evens", () => {
    let numberString = onlyEvens([1, 2, 3, 4, 5, 6])
    expect(numberString).to.deep.equal([2, 4, 6]);
  });

  it("can turn array into string", () => {
    let numberString = sumUp([1, 2, 3, 1, 7])
    expect(numberString).equals(14);
  });

  it("recreate map", () => {
    let sizes = mapWithReduce([1, 2, 3], x => x + 1)
    expect(sizes).to.deep.equal([2, 3, 4]);
  });

  it("recreate array join", () => {
    let sizes = homemadeJoin(["1", "2", "3"], ",")
    expect(sizes).equals("1,2,3");
  });

  it("count letters can correctly count each letter", () => {
    let sizes = countLetters("abcaaadf")
    expect(sizes).to.deep.equal({ "a": 4, "b": 1, "c": 1, "d": 1, "f": 1 });
  });

  it("concatX X's the size of the arrray", () => {
    let sizes = concatX([1, 2, 3], 3)
    expect(sizes).to.deep.equal([1, 1, 1, 2, 2, 2, 3, 3, 3]);
  });

  it("concat double doubles the size of the arrray", () => {
    let sizes = concatDouble([1, 2, 3])
    expect(sizes).to.deep.equal([1, 1, 2, 2, 3, 3]);
  });

  it("display histogram of letters", () => {
    let sizes = histogramLetters("abccccddddaaaccd")
    expect(sizes).equals("a: ****\nb: *\nc: ******\nd: *****");
  });

  // ****
  // ***
  // ****
  // ***
  // ******
  it("can count word sizes visually", () => {
    let sizes = countWordSizesVisually("steve was here and there")
    expect(sizes).equals("*****\n***\n****\n***\n*****");
  });

  it("can count word sizes", () => {
    let sizes = countWordSizes("steve was here and there")
    expect(sizes).equals("5 3 4 3 5");
  });

  it("can add 5 to each number", () => {
    let newNumbers = add5([3, 5, 7])
    expect(newNumbers[0]).equals(8);
    expect(newNumbers[1]).equals(10);
    expect(newNumbers[2]).equals(12);
  });

  it("can split and add 1", () => {
    let newNumbers = splitAndAdd1WithMap("2,5,6")
    expect(newNumbers[0]).equals(3);
    expect(newNumbers[1]).equals(6);
    expect(newNumbers[2]).equals(7);
  });

  it("can split and add 1", () => {
    let newNumbers = splitAndAdd1("2,5,6")
    expect(newNumbers[0]).equals(3);
    expect(newNumbers[1]).equals(6);
    expect(newNumbers[2]).equals(7);
  });

  it("capitalize every word", () => {
    let allWordsCapped = capAllTheWords("steve was here")
    expect(allWordsCapped).equals("Steve Was Here");
  });

  it("capitalize every word", () => {
    let allWordsCapped = capAllTheWordsWithMap("steve was here")
    expect(allWordsCapped).equals("Steve Was Here");
  });

});
