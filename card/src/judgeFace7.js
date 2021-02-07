const { Sequential, Four, Three, Couple } = require("./util/SevenType");
const fuzhi = require("./util/fuzhi");
const jiexi = require("./util/jiexi");
const find = require("./util/findMax");
const findMax = find.findMax;
const findType = find.findType;

module.exports = judgeFace7 = (str) => {
  let cardArr = str.split("");
  let faceArr = [];
  let colorArr = [];
  let face = [];
  let type, pai;

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
  let numFace = faceArr
    .map((item) => fuzhi[item])
    .sort((a, b) => a - b)
    .join(" ");
  let c = findMax(colorArr); //获取出现最多次数的花色
  //判断是否同花
  if (c.maxCount >= 5) {
    //获取同花的牌面
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][1] == c.maxItem) {
        face.push(arr[i][0]);
      }
    }
    //判断皇家同花顺
    if (findType(face, Sequential, 10) === "AJKQT") {
      pai = findType(face, Sequential, 10);
      type = 10;
      return { pai, type }; //返回最大牌面字符串以及类型
    } else {
      //判断同花顺
      if (findType(face, Sequential, 10)) {
        pai = findType(face, Sequential, 10);
        type = 9;
        return { pai, type };
      }
    }
    // 同花
    if (c.maxCount >= 5) {
      pai = face
        .map((item) => fuzhi[item])
        .sort((a, b) => a - b)
        .map((item) => jiexi[item])
        .join("");
      if (pai.length > 5) {
        pai = pai.split("").splice(1, 5).join("");
      }
      type = 6;
      return { pai, type };
    }
  } else {
    //四条
    if (findType(faceArr, Four, 13)) {
      pai = findType(faceArr, Four, 13);
      let complement = [
        ...pai.split("").filter((item) => !new Set(faceArr).has(item)),
        ...faceArr.filter((item) => !new Set(pai.split("")).has(item)),
      ];
      pai =
        pai +
        complement
          .map((item) => fuzhi[item])
          .sort((a, b) => a - b)
          .map((item) => jiexi[item])
          .reverse()[0];
      type = 8;
      return { pai, type };
    }
    //三带二
    if (findType(faceArr, Three, 13)) {
      let three = findType(faceArr, Three, 13)[0]
        .split("")
        .map((item) => fuzhi[item])
        .sort((a, b) => a - b)
        .join("");
      let threeFlag = three + " " + three;
      let matchType = [];
      for (let i = 0; i < 13; i++) {
        if (numFace.includes(Couple[i])) {
          matchType.push(Couple[i]);
        }
      }
      for (let i = matchType.length - 1; i >= 0; i--) {
        if (!(matchType[i] === threeFlag)) {
          pai =
            findType(faceArr, Three, 13) +
            matchType[i]
              .split(" ")
              .map((item) => jiexi[item])
              .sort()
              .join("");
          type = 7;
          return { pai, type };
        }
      }
    }
    //顺子
    if (findType([...new Set(faceArr)], Sequential, 10)) {
      pai = findType([...new Set(faceArr)], Sequential, 10);
      type = 5;
      return { pai, type };
    } else {
      if (
        [...new Set(faceArr.sort())].join("").includes("2345") &&
        faceArr.sort().join("").includes("A")
      ) {
        pai = "2345A";
        type = 5;
        return { pai, type };
      }
    }
  }
  //三条
  if (findType(faceArr, Three, 13)) {
    let threeFace = findType(faceArr, Three, 13);
    let CoupleFace = [];
    let threeFlag = Number(
      findType(faceArr, Three, 13)[0]
        .split("")
        .map((item) => fuzhi[item])
        .sort((a, b) => a - b)
        .join("")
    );
    faceArr = [
      ...new Set(faceArr.map((item) => fuzhi[item]).sort((a, b) => a - b)),
    ];
    for (let i = faceArr.length - 1; i >= 0; i--) {
      if (!(faceArr[i] === threeFlag)) {
        if (CoupleFace.length < 2) {
          CoupleFace.unshift(String(faceArr[i]));
        }
      }
    }
    CoupleFace = CoupleFace.map((item) => Number(item)).map(
      (item) => jiexi[item]
    );
    pai = threeFace + CoupleFace[1] + CoupleFace[0];
    type = 4;
    return { pai, type };
  }
  //俩对
  if (findType(faceArr, Couple, 13)) {
    let matchType = [];
    for (let i = 0; i < 13; i++) {
      if (numFace.includes(Couple[i])) {
        matchType.push(Couple[i]);
      }
    }
    if (matchType.length >= 2) {
      let firstCouple = matchType[matchType.length - 1]
        .split(" ")
        .map((item) => jiexi[item])
        .sort()
        .join("");
      let firstFlag = firstCouple[0];
      let secondCouple = matchType[matchType.length - 2]
        .split(" ")
        .map((item) => jiexi[item])
        .sort()
        .join("");
      let secondFlag = secondCouple[0];
      let otherArr = [];
      for (let i = 0; i < faceArr.length; i++) {
        if (faceArr[i] !== firstFlag && faceArr[i] !== secondFlag) {
          otherArr.push(faceArr[i]);
        }
      }
      otherArr = otherArr
        .map((item) => fuzhi[item])
        .sort((a, b) => a - b)
        .splice(1, 2)
        .map((item) => jiexi[item]);
      pai = firstCouple + secondCouple + otherArr[1];
      type = 3;
      return { pai, type };
    }
  }
  //一对
  if (findType(faceArr, Couple, 13)) {
    let matchType = [];
    for (let i = 0; i < 13; i++) {
      if (numFace.includes(Couple[i])) {
        matchType.push(Couple[i]);
      }
    }
    let firstCouple = matchType[matchType.length - 1]
      .split(" ")
      .map((item) => jiexi[item])
      .sort()
      .join("");
    let firstFlag = firstCouple[0];
    let otherArr = [];
    for (let i = 0; i < faceArr.length; i++) {
      if (faceArr[i] !== firstFlag) {
        otherArr.push(faceArr[i]);
      }
    }
    otherArr = otherArr
      .map((item) => fuzhi[item])
      .sort((a, b) => a - b)
      .map((item) => jiexi[item]);
    pai = firstCouple + otherArr[4] + otherArr[3] + otherArr[2];
    type = 2;
    return { pai, type };
  } else {
    //单张大牌
    pai = faceArr
      .map((item) => fuzhi[item])
      .sort((a, b) => a - b)
      .splice(2, 5)
      .map((item) => jiexi[item])
      .join("");
    type = 1;
    return { pai, type };
  }
};
