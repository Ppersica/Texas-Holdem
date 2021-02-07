const fuzhi = require("../util/fuzhi");
const compare = require("../util/compare");

module.exports = type4 = (alice, bob) => {
  const getThree = (arr) => {//提取数组中重复出现的元素
    const map = {};
    for (const num of arr) {
      if (!map[num]) {
        map[num] = true;
      } else {
        return num;
      }
    }
  };
  const twiceA = getThree(alice);
  const twiceB = getThree(bob);
  if (twiceA === twiceB) {
    alice.splice(alice.sort().indexOf(twiceA), 3);
    bob.splice(bob.sort().indexOf(twiceB), 3);//数组取出三条元素
    let resultA = alice.map((item) => fuzhi[item]).sort((a, b) => b - a);
    let resultB = bob.map((item) => fuzhi[item]).sort((a, b) => b - a);
    let result = compare(resultA, resultB);//比较数组剩余两个元素后的大小
    return result;
  } else {
    const result = fuzhi[twiceA] > fuzhi[twiceB] ? 1 : 2;
    return result;
  }
};
