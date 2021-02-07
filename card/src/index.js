const judgeFace = require("./judgeFace");
const judgeResult = require("./judgeResult");
const judgeFace7 = require("./judgeFace7");
const judgeGhost = require("./judgeGhost");

module.exports = Judge = ({ alice, bob }) => {
  let aliceType, bobType;
  if (alice.length === 14) {
    if (alice.indexOf("X") == -1) {
      aliceType = judgeFace7(alice);
    } else {
      aliceType = judgeGhost(alice);
    }
    if (bob.indexOf("X") == -1) {
      bobType = judgeFace7(bob);
    } else {
      bobType = judgeGhost(bob);
    }
    if (aliceType.type > bobType.type) {
      return { alice: alice, bob: bob, result: 1 };
    } else if (aliceType.type < bobType.type) {
      return { alice: alice, bob: bob, result: 2 };
    } else {
      return {
        alice: alice,
        bob: bob,
        result: judgeResult(aliceType.pai, bobType.pai, aliceType.type),
      };
    }
  } else {
    aliceType = judgeFace(alice);
    bobType = judgeFace(bob);
    if (aliceType > bobType) {
      return { alice: alice, bob: bob, result: 1 };
    } else if (aliceType < bobType) {
      return { alice: alice, bob: bob, result: 2 };
    } else {
      return {
        alice: alice,
        bob: bob,
        result: judgeResult(alice, bob, aliceType),
      };
    }
  }
};
// const faceType = Judge("3d3s3h3cQsJs7d", "2dAd3d3s3h3cQs");
// console.log(faceType);
//2 0
