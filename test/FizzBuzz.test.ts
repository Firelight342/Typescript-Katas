import { fizzbuzz } from "../src/FizzBuzz";

const chai = require("chai");
const expect = chai.expect;

describe("FizzBuzz Tests", () => {

  it("returns numbers 1, 2, and 4 return without change", () => {
    expect(fizzbuzz(1)).equal("1");
    expect(fizzbuzz(2)).equal("2");
    expect(fizzbuzz(4)).equal("4");
  });

  it("converts divisble by 3 to Fizz", () => {
    expect(fizzbuzz(3)).equal("Fizz");
    expect(fizzbuzz(6)).equal("Fizz");
    expect(fizzbuzz(9)).equal("Fizz");
    expect(fizzbuzz(12)).equal("Fizz");
  });

  it("converts 5 to Buzz", () => {
    expect(fizzbuzz(5)).equal("Buzz");
    expect(fizzbuzz(10)).equal("Buzz");
    expect(fizzbuzz(20)).equal("Buzz");
    expect(fizzbuzz(25)).equal("Buzz");
  });

  it("converts divisibles of 3 and 5 to FizzBuzz", () => {
    expect(fizzbuzz(15)).equal("FizzBuzz");
    expect(fizzbuzz(30)).equal("FizzBuzz");
  });

  it("converts numbers with a 3 into Fizz", () => {
    expect(fizzbuzz(13)).equal("Fizz");
    expect(fizzbuzz(131)).equal("Fizz");
  });


  it("converts numbers with a 5 into Buzz", () => {
    expect(fizzbuzz(52)).equal("Buzz");
    expect(fizzbuzz(151)).equal("Buzz");
  });



});
