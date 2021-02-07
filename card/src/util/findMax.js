//找最大牌型
const findType = (arr, faceType, len) => {
  let max;
  let numFace = arr
    .map((item) => fuzhi[item])
    .sort((a, b) => a - b)
    .join(" ");
  let matchType = [];
  for (let i = 0; i < len; i++) {
    if (numFace.includes(faceType[i])) {
      matchType.push(faceType[i]);
    }
  }
  if (matchType.length === 0) {
    return false;
  } else {
    // 数组最后一个是最大的
    max = matchType[matchType.length - 1];
    return max
      .split(" ")
      .map((item) => jiexi[item])
      .sort()
      .join("");
  }
};
//数组里出现次数最多的元素
const findMax = (arr) => {
  let maxCount = 0,
    maxItem = "",
    obj = {};
  arr.forEach((item) => {
    obj[item] ? (obj[item].count += 1) : (obj[item] = { count: 1 });
    obj[item].count > maxCount &&
      ((maxCount = obj[item].count), (maxItem = item));
  });
  return { maxItem, maxCount };
};

module.exports.findType = findType;
module.exports.findMax = findMax;
