import { hasADigit } from "../src/NumberHelpers";

const chai = require("chai");
const expect = chai.expect;

describe("NumberHelper Tests", () => {

  it("can detect numbers with a 5 or 3", () => {
    expect(hasADigit(5, 5)).equal(true);
    expect(hasADigit(103, 3)).equal(true);
    expect(hasADigit(1103, 3)).equal(true);
    expect(hasADigit(51, 5)).equal(true);
    expect(hasADigit(61, 5)).equal(false);
  });

});