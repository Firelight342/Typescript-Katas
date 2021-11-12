import { add,sub } from "../src/Hello";

const chai = require("chai");
const expect = chai.expect;

describe("Hello Tests", () => {
  it("add sums two numbers", () => {
    let result = add(1,2);
    
    expect(result).equal(3)
  });

  it("sub subracts two numbers", () => {
    let result = sub(2,1);
    
    expect(result).equal(1)
  });
});
