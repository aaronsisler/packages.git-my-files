import fs from "fs";
import grabLooseFiles from "./grab-loose-files";

jest.mock("fs");

describe("grabLooseFiles()", () => {
  describe("when folder path ends with a trailing slash", () => {
    it("should read directory with correct folder path", () => {
      grabLooseFiles("real-folder-path/");

      expect(fs.readdirSync).toHaveBeenCalledWith("real-folder-path");
    });
  });

  describe("when folder path DOES NOT end with a trailing slash", () => {
    it("should read directory with correct folder path", () => {
      grabLooseFiles("real-folder-path");

      expect(fs.readdirSync).toHaveBeenCalledWith("real-folder-path");
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
      const files = grabLooseFiles("real-folder-path/");

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
      const files = grabLooseFiles("fake-folder-path");

      expect(files).toEqual([]);
    });
  });
});
