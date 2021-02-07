module.exports = compare = (arr1, arr2) => {//比较两个数组对应位置的元素大小
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > arr2[i]) {
      return 1;
    } else if (arr1[i] < arr2[i]) {
      return 2;
    }
  }
  return 0;
};
