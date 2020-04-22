import React from "react";
import renderer from "react-test-renderer";

import { Score } from "./Score";

describe("<Score />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<Score boardWidth={300} score={2} />).toJSON();
    expect(tree?.children?.length).toBe(1);
  });
});
