import { spawnSync } from "child_process";
import throwError from "../utils/throw-error";
import findFiles from "./find-files";

jest.mock("child_process");
jest.mock("../utils/throw-error");

describe("findFiles()", () => {
  let files;

  beforeEach(() => {
    spawnSync.mockReturnValue({ stdout: "A file1.js\nM file2.js\n " });

    files = findFiles("mock-folder-path");
  });

  it("should call spawn sync with the correct parameters", () => {
    findFiles("mock-folder-path");

    expect(spawnSync).toHaveBeenCalledWith("git", [
      "status",
      "--short",
      "--column",
      "mock-folder-path"
    ]);
  });

  describe("when spawn sync does NOT return a status code", () => {
    it("should return the correct value", () => {
      expect(files).toEqual(["A file1.js", "M file2.js"]);
    });
  });

  describe("when spawn sync does return a status code", () => {
    beforeEach(() => {
      spawnSync.mockReturnValue({ status: "oops", stderr: "We broke" });

      findFiles("mock-folder-path");
    });

    it("should call throw error with correct parameter", () => {
      expect(throwError).toHaveBeenCalledWith("We broke");
    });
  });
});
