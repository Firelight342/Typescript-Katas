import {  add5,  countWordSizesVisually, countWordSizes,  capAllTheWords, splitAndAdd1, splitAndAdd1WithMap } from "../src/SeqenceAbstractions";

const chai = require("chai");
const expect = chai.expect;

describe("Sequence abstraction Tests", () => {

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


});
