const fuzhi = require("../util/fuzhi");

module.exports = type8 = (alice, bob) => {
  const getCp = (arr) => {//获取重复的元素
    const map = {};
    for (const num of arr) {
      if (!map[num]) {
        map[num] = true;
      } else {
        return num;
      }
    }
  };
  const twiceA = getCp(alice);//获取四条元素
  const twiceB = getCp(bob);
  if (twiceA === twiceB) {
    alice.splice(alice.indexOf(twiceA), 4);//删除四条元素
    bob.splice(bob.indexOf(twiceB), 4);
    let resultA = alice.map((item) => fuzhi[item]).join("");//剩下的一个元素
    let resultB = bob.map((item) => fuzhi[item]).join("");
    let result = Number(resultA) - Number(resultB);
    if (result > 0) {
      return 1;
    } else if (result < 0) {
      return 2;
    } else {
      return 0;
    }
  } else {
    const result = fuzhi[twiceA] > fuzhi[twiceB] ? 1 : 2;
    return result;
  }
};
