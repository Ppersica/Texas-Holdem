const fuzhi = require("../util/fuzhi");
const find = require("../util/findMax");
const findMax = find.findMax;

module.exports = type7 = (alice, bob) => {
  const ThreeA = findMax(alice);
  const ThreeB = findMax(bob); //获取三条元素
  if (ThreeA.maxItem === ThreeB.maxItem) {
    alice.splice(alice.sort().indexOf(ThreeA.maxItem), 3);
    bob.splice(bob.sort().indexOf(ThreeB.maxItem), 3);
    if (fuzhi[alice[0]] > fuzhi[bob[0]]) {
      //比较两对的的大小
      return 1;
    } else if (fuzhi[alice[0]] < fuzhi[bob[0]]) {
      return 2;
    } else {
      return 0;
    }
  } else if (fuzhi[ThreeA.maxItem] > fuzhi[ThreeB.maxItem]) {
    return 1;
  } else {
    return 2;
  }
};
