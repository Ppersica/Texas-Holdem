const {
  kSequential,
  Sequential,
  Four,
  Three,
} = require("./util/seven_ghost_type");
const fuzhi = require("./util/fuzhi");
const jiexi = require("./util/jiexi");
const findShun = require("./util/findShun");
const find = require("./util/findMax");
const findMax = find.findMax;
const findType = find.findType;

module.exports = judgeGhost = (str) => {
  let cardArr = str.split("");
  let faceArr = [];
  let colorArr = [];
  let face = [];
  let type, pai, theX;

  for (let i = 0; i < 14; i++) {
    if (i % 2 === 0) {
      faceArr.push(cardArr[i]); // 牌型
    } else {
      colorArr.push(cardArr[i]); // 花色
    }
  }
  let arr = [];
  for (let i = 0; i < 14; i++) {
    let Str = str.split("").slice(i, i + 2);
    arr.push(Str);
  }

  let c = findMax(colorArr); //获取出现最多次数的花色
  //获取同花的牌面
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] == c.maxItem) {
      face.push(arr[i][0]);
    }
  }
  //判断是否同花
  if (c.maxCount >= 4) {
    if (findType(face, kSequential, 5)) {
      //皇家同花顺
      let complement = [
        ...findType(face, kSequential, 5)
          .split("")
          .filter((item) => !new Set("AJKQT".split("")).has(item)),
        ..."AJKQT"
          .split("")
          .filter(
            (item) =>
              !new Set(findType(face, kSequential, 5).split("")).has(item)
          ),
      ];
      pai = findType(face, kSequential, 5) + complement;
      type = 10;
      return { pai, type };
    }
    //同花顺
    if (findShun(face, Sequential, 41)) {
      pai = findShun(face, Sequential, 41);
      type = 9;
      return { pai, type };
    }
  }
  //不同花,先删除赖子
  faceArr.splice(faceArr.indexOf("X"), 1);
  //四条
  if (findType(faceArr, Four, 13)) {
    let theSame = findType(faceArr, Four, 13).split("");
    let obj = findMax(faceArr);
    if (obj.maxCount === 4) {
      //牌里本身自带四条
      if (obj.maxItem == "A") {
        theX = "K"; //赖子赋值
      } else {
        theX = "A";
      }
      theSame.push(obj.maxItem);
      theSame.push(theX);
      pai = theSame.join("");
    } else {
      //本身是三条
      theX = obj.maxItem;
      faceArr.splice(faceArr.indexOf(obj.maxItem), 3);
      faceArr.splice(faceArr.indexOf(obj.maxItem), 1);
      let max =
        jiexi[faceArr.map((item) => fuzhi[item]).sort((a, b) => b - a)[0]]; //剩下的最大元素
      let arr = [theX, theX, theX, theX, max];
      pai = arr.join("");
    }
    type = 8;
    return { pai, type };
  }
  //三带二
  if (findType(faceArr, Three, 13)) {
    let maxFace = findType(faceArr, Three, 13);
    theX = maxFace.split("")[0];
    let complement = [
      ...maxFace.split("").filter((item) => !new Set(faceArr).has(item)),
      ...faceArr.filter((item) => !new Set(maxFace.split("")).has(item)),
    ];
    if (findType(complement, Three, 13)) {
      let cp = findType(complement, Three, 13).split("");
      pai = maxFace + theX + cp[cp.length - 1] + cp[cp.length - 2];
      type = 7;
      return { pai, type };
    }
  }
  //同花
  if (c.maxCount >= 4) {
    pai = face
      .map((item) => fuzhi[item])
      .sort((a, b) => a - b)
      .map((item) => jiexi[item])
      .join("");
    let arrX = pai
      .split("")
      .map((item) => fuzhi[item])
      .reverse();
    if (arrX[0] !== 14) {
      theX = "A";
    } else {
      if (arrX[1] !== 13) {
        theX = "K";
      } else {
        if (arrX[2] !== 12) {
          theX = "Q";
        } else {
          theX = "J";
        }
      }
    }
    if (pai.length >= 4) {
      let len = pai.length;
      pai =
        pai
          .split("")
          .splice(len - 4, 4)
          .join("") + theX;
    }
    type = 6;
    return { pai, type };
  }
  //顺子
  if (findShun(faceArr, Sequential, 41)) {
    pai = findShun(faceArr, Sequential, 41);
    type = 5;
    return { pai, type };
  }
  //三条
  if (findType(faceArr, Three, 13)) {
    let maxFace = findType(faceArr, Three, 13);
    theX = maxFace.split("")[0];
    let complement = [
      ...maxFace.split("").filter((item) => !new Set(faceArr).has(item)),
      ...faceArr.filter((item) => !new Set(maxFace.split("")).has(item)),
    ];
    let cp = complement
      .map((item) => fuzhi[item])
      .sort((a, b) => a - b)
      .map((item) => jiexi[item]);
    pai = maxFace + theX + cp[cp.length - 1] + cp[cp.length - 2];
    type = 4;
    return { pai, type };
  }
  // 一对
  faceArr = faceArr
    .map((item) => fuzhi[item])
    .sort((a, b) => a - b)
    .map((item) => jiexi[item])
    .reverse();
  theX = faceArr[0];
  let maxFace = faceArr.splice(0, 4).join("") + theX;
  pai = maxFace
    .split("")
    .map((item) => fuzhi[item])
    .sort((a, b) => a - b)
    .map((item) => jiexi[item])
    .join("");
  type = 2;
  return { pai, type };
};
