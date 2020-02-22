import fetchFiles from "./fetch-files";
import rootMethod from ".";

jest.mock("./fetch-files");

describe("rootMethod", () => {
  describe("when a folder path is provided", () => {
    it("should call fetch files with correct parameter", () => {
      rootMethod("mock-folder-path");

      expect(fetchFiles).toHaveBeenCalledWith("mock-folder-path");
    });
  });
  describe("when a folder path is NOT provided", () => {
    it("should call fetch files with correct parameter", () => {
      rootMethod();

      expect(fetchFiles).toHaveBeenCalledWith("");
    });
  });
});
