const fuzhi = require("../util/fuzhi");
const compare = require("../util/compare");

module.exports = type3 = (alice, bob) => {
  const duplicates = (arr) => {
    //提取数组中出现两次的元素
    let newArr = [];
    arr.sort();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == arr[i + 1] && newArr.indexOf(arr[i]) == -1) {
        newArr.push(arr[i]);
        i++;
      }
    }
    return newArr;
  };
  let arrA = duplicates(alice);
  let arrB = duplicates(bob);
  const doubleA = arrA.map((item) => fuzhi[item]).sort((a, b) => b - a);
  const doubleB = arrB.map((item) => fuzhi[item]).sort((a, b) => b - a);
  let result = compare(doubleA, doubleB); //比较两对元素的大小
  if (result === 0) {
    alice.splice(alice.indexOf(arrA[0] + ""), 2);
    alice.splice(alice.indexOf(arrA[1] + ""), 2); //删除两对元素
    bob.splice(bob.indexOf(arrB[0] + ""), 2);
    bob.splice(bob.indexOf(arrB[1] + ""), 2);
    let result1 = compare(
      //比较剩下的一个元素的大小
      alice.map((item) => fuzhi[item]),
      bob.map((item) => fuzhi[item])
    );
    return result1;
  } else {
    return result;
  }
};
