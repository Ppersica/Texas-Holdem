const type1_6 = require("./types/type1_6");
const type2 = require("./types/type2");
const type3 = require("./types/type3");
const type4 = require("./types/type4");
const type5_9 = require("./types/type5_9");
const type7 = require("./types/type7");
const type8 = require("./types/type8");

module.exports = judgeResult = (alice, bob, alicetype) => {
  let Alice, Bob;
  if (alice.length === 5) {
    Alice = alice.split("");
    Bob = bob.split("");
  } else {
    Alice = alice.split("").filter((item, index) => index % 2 === 0);
    Bob = bob.split("").filter((item, index) => index % 2 === 0);
  }
  switch (alicetype) {
    case 9:
      return type5_9(Alice, Bob);
    case 8:
      return type8(Alice, Bob);
    case 7:
      return type7(Alice, Bob);
    case 6:
      return type1_6(Alice, Bob);
    case 5:
      return type5_9(Alice, Bob);
    case 4:
      return type4(Alice, Bob);
    case 3:
      return type3(Alice, Bob);
    case 2:
      return type2(Alice, Bob);
    case 1:
      return type1_6(Alice, Bob);
    default:
      return 0;
  }
};
