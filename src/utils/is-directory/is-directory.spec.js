import fs from "fs";
import isDirectory from "./is-directory";

jest.mock("fs");

describe("isDirectory()", () => {
  describe("when called with a directory path", () => {
    beforeEach(() => {
      fs.lstatSync.mockImplementation(() => ({
        isDirectory: jest.fn().mockReturnValue(true)
      }));
    });

    it("should call process with correct arguments", () => {
      const result = isDirectory("directory-path");

      expect(result).toEqual(true);
    });
  });

  describe("when called with a file path", () => {
    beforeEach(() => {
      fs.lstatSync.mockImplementation(() => ({
        isDirectory: jest.fn().mockReturnValue(false)
      }));
    });

    it("should call process with correct arguments", () => {
      const result = isDirectory("file-path");

      expect(result).toEqual(false);
    });
  });

  describe("when called with a non existant path", () => {
    beforeEach(() => {
      fs.lstatSync.mockImplementation(() => {
        throw new Error("Mock Error");
      });
    });
    it("should call process with correct arguments", () => {
      const result = isDirectory("non-existant-path");

      expect(result).toEqual(false);
    });
  });
});
