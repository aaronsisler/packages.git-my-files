import { spawnSync } from "child_process";
import revertStaging from "./revert-staging";

jest.mock("child_process");

describe("revertStaging()", () => {
  beforeEach(() => {
    revertStaging();
  });

  it("should call process with correct arguments", () => {
    expect(spawnSync).toHaveBeenCalledWith("git", ["restore", "--staged", "."]);
  });
});
