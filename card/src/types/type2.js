const fuzhi = require("../util/fuzhi");
const compare = require("../util/compare");

module.exports = type2 = (alice, bob) => {
  const getCp = (arr) => {
    //提取数组中出现两次的元素
    const map = {};
    for (const num of arr) {
      if (!map[num]) {
        map[num] = true;
      } else {
        return num;
      }
    }
  };
  const twiceA = getCp(alice); //提取一对的元素
  const twiceB = getCp(bob);
  if (twiceA === twiceB) {
    alice.splice(alice.sort().indexOf(twiceA), 2);
    bob.splice(bob.sort().indexOf(twiceB), 2);
    let resultA = alice.map((item) => fuzhi[item]).sort((a, b) => b - a);
    let resultB = bob.map((item) => fuzhi[item]).sort((a, b) => b - a); //去掉一对之后的数组
    let result = compare(resultA, resultB);
    return result;
  } else {
    const result = fuzhi[twiceA] > fuzhi[twiceB] ? 1 : 2; //比较一对元素的大小
    return result;
  }
};
