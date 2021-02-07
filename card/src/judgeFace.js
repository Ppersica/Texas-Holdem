const type = require("./util/type");
const Sequential = type.Sequential;
const Four = type.Four;
const Three = type.Three;
const Couple = type.Couple;
module.exports = judgeFace = (str) => {
  let arr = str.split("");
  let face = arr
    .filter((item, index) => index % 2 === 0)
    .sort()
    .join("");
  let color = [...new Set(arr.filter((item, index) => index % 2))].join("");
  if (color.length === 1) {
    //判断是否为同花
    if (Sequential.includes(face)) {
      //判断是否为顺子
      if (face == "AKQJT") {
        //判断是否为皇家同花顺
        return 10; //皇家同花顺
      }
      return 9; //同花顺
    }
    return 6; //同花
  }
  if (Sequential.includes(face)) {
    return 5; //顺子
  }
  if (
    Four.filter((item) => face.indexOf(item) != -1).length //判断是否为四条
  ) {
    return 8; //四条
  }
  if (Three.filter((item) => face.indexOf(item) != -1).length) {
    //判断是否为三条
    let three = Three.filter(
      (item) => face.indexOf(item) != -1 //提取三条元素
    );
    let newFace = face.replace(three[0], ""); //提取三条元素外的两个元素
    if (Couple.filter((item) => newFace.indexOf(item) != -1).length) {
      //判断剩下的两张牌是否是一对
      if (!three[0].includes(newFace)) {
        return 7;
      }
    }
    return 4;
  }
  if (
    Couple.filter((item) => face.indexOf(item) != -1).length //判断是否为一对
  ) {
    if (
      Couple.filter((item) => face.indexOf(item) != -1).length === 2 //判断是否为两对
    ) {
      return 3; //两对
    }
    return 2; //一对
  }
  return 1; //以上情况都不满足
};
