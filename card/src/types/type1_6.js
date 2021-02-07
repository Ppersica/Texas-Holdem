const fuzhi = require("../util/fuzhi");
const compare = require("../util/compare");

module.exports = type1_6 = (alice, bob) => {
  let resultA = alice.map((item) => fuzhi[item]).sort((a, b) => b - a);
  let resultB = bob.map((item) => fuzhi[item]).sort((a, b) => b - a);
  let result = compare(resultA, resultB);
  return result;
};
