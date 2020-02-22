const { spawnSync } = require("child_process");
const revertStaging = require("./revert-staging");

jest.mock("child_process");

describe("revertStaging()", () => {
  beforeEach(() => {
    revertStaging();
  });

  it("should call process with correct arguments", () => {
    expect(spawnSync).toHaveBeenCalledWith("git", ["restore", "--staged", "."]);
  });
});
