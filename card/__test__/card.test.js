const { matches: input_matches } = require("../match.json");
const { matches: result_matches } = require("../match_result.json");
const { matches: input_seven_matches } = require("../seven.json");
const { matches: result_seven_matches } = require("../seven_result.json");
const {
  matches: input_seven_with_ghost_matches,
} = require("../seven_with_ghost");
const {
  matches: result_seven_with_ghost_matches,
} = require("../seven_with_ghost_result");

const Judge = require("../src/index");

input_matches.map((item, index) => {
  test("五张牌" + `${index}`, () => {
    expect(Judge(item)).toEqual(result_matches[index]);
  });
});

input_seven_matches.map((item, index) => {
  test("七张牌" + `${index}`, () => {
    expect(Judge(item)).toEqual(result_seven_matches[index]);
  });
});

input_seven_with_ghost_matches.map((item, index) => {
  test("带赖子" + `${index}`, () => {
    expect(Judge(item)).toEqual(result_seven_with_ghost_matches[index]);
  });
});
