const fuzhi = require("../util/fuzhi");

module.exports = type5_9 = (alice, bob) => {
  let a = alice.sort().join("");
  let b = bob.sort().join("");
  if (a === b) {
    return 0;
  } else if (a == "2345A" && b !== "2345A") {
    //2345A最小顺子
    return 2;
  } else if (a !== "2345A" && b == "2345A") {
    return 1;
  } else {
    let arrA = a
      .split("")
      .map((item) => fuzhi[item])
      .sort((a, b) => b - a);
    let arrB = b
      .split("")
      .map((item) => fuzhi[item])
      .sort((a, b) => b - a);
    let result = arrA[0] > arrB[0] ? 1 : 2; //比较顺子的最大元素
    return result;
  }
};
