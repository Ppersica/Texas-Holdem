const fuzhi = require("./fuzhi");
const jiexi = require("./jiexi");

module.exports = findShun = (arr, faceType, len) => {
  let max;
  let numFace = [
    ...new Set(arr.map((item) => fuzhi[item]).sort((a, b) => a - b)),
  ].join(" ");
  let matchType = [];
  for (let i = 0; i < len; i++) {
    if (numFace.includes(faceType[i])) {
      matchType.push(faceType[i]);
    }
  }
  if (matchType.length === 1) {
    max = matchType[0];
  }
  if (matchType.length !== 1 && matchType.length > 0) {
    max = matchType[matchType.length - 1];
  }
  if (matchType.length === 0) {
    let intersect = numFace
      .split(" ")
      .filter((x) => new Set(["2", "3", "4", "5", "14"]).has(x))
      .join(" ");
    for (let i = 0; i < len; i++) {
      if (intersect.includes(faceType[i])) {
        matchType.push(faceType[i]);
      }
    }
    let complement = [
      ...matchType
        .join(" ")
        .split(" ")
        .filter((x) => !new Set("2 3 4 5 14".split(" ")).has(x)),
      ..."2 3 4 5 14"
        .split(" ")
        .filter((x) => !new Set(matchType.join(" ").split(" ")).has(x)),
    ];
    if (complement.length === 1) {
      // 数组最后一个是最大的
      max = matchType[matchType.length - 1];
      return (
        max
          .split(" ")
          .map((item) => jiexi[item])
          .join("") + complement
      )
        .split("")
        .map((item) => fuzhi[item])
        .sort((a, b) => a - b)
        .map((item) => jiexi[item])
        .join("");
    } else {
      return false;
    }
  }
  let iStart = Number(max.split(" ")[0]);
  let endMatch = [];
  for (let i = iStart; i < iStart + 5; i++) {
    endMatch.push(String(i));
  }
  let lastX = [
    ...max.split(" ").filter((x) => !new Set(endMatch).has(x)),
    ...endMatch.filter((x) => !new Set(max.split(" ")).has(x)),
  ].map((item) => jiexi[item])[0];
  return (
    max
      .split(" ")
      .map((item) => jiexi[item])
      .join("") + lastX
  )
    .split("")
    .map((item) => fuzhi[item])
    .sort((a, b) => a - b)
    .map((item) => jiexi[item])
    .join("");
};
