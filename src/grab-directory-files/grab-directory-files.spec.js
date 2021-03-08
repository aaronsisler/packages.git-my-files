import fs from "fs";
import grabDirectoryFiles from "./grab-directory-files";
import isDirectory from "../utils/is-directory";

jest.mock("fs");
jest.mock("../utils/is-directory");

describe("grabLooseFiles()", () => {
  beforeEach(() => {
    isDirectory.mockReturnValue(false);
  });

  describe("when folder path ends with a trailing slash", () => {
    it("should read directory with correct folder path", () => {
      grabDirectoryFiles("real-folder-path/");

      expect(fs.readdirSync).toHaveBeenCalledWith("real-folder-path");
    });
  });

  describe("when folder path DOES NOT end with a trailing slash", () => {
    it("should read directory with correct folder path", () => {
      grabDirectoryFiles("real-folder-path");

      expect(fs.readdirSync).toHaveBeenCalledWith("real-folder-path");
    });
  });

  describe("when a directory path is provided", () => {
    beforeEach(() => {
      isDirectory.mockImplementation(path => {
        if (path === "real-folder-path/mock-directory") {
          return true;
        }
        return false;
      });

      fs.readdirSync
        .mockReturnValueOnce(["mock-directory", "file1.ext"])
        .mockReturnValueOnce(["file2.ext", "file3.ext"]);
    });

    it("should return the expected result", () => {
      const expectedResult = [
        { filename: "real-folder-path/mock-directory/file2.ext", status: "A" },
        { filename: "real-folder-path/mock-directory/file3.ext", status: "A" },
        { filename: "real-folder-path/file1.ext", status: "A" }
      ];

      const files = grabDirectoryFiles("real-folder-path/");

      expect(files).toEqual(expectedResult);
    });
  });

  describe("when valid folder path is provided", () => {
    beforeEach(() => {
      fs.readdirSync.mockReturnValue(["file1.ext", "file2.ext"]);
    });

    it("should return the expected result", () => {
      const expectedResult = [
        { filename: "real-folder-path/file1.ext", status: "A" },
        { filename: "real-folder-path/file2.ext", status: "A" }
      ];
      const files = grabDirectoryFiles("real-folder-path/");

      expect(files).toEqual(expectedResult);
    });
  });

  describe("when valid folder path is NOT provided", () => {
    beforeEach(() => {
      fs.readdirSync.mockImplementation(() => {
        throw new Error("fake-folder-path not found");
      });
    });

    it("should return an empty array", () => {
      const files = grabDirectoryFiles("fake-folder-path");

      expect(files).toEqual([]);
    });
  });
});
