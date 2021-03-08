import revertStaging from "../utils/revert-staging";
import findFiles from "../find-files";
import formatOutput from "../format-output";
import fetchFiles from "./fetch-files";

jest.mock("../utils/revert-staging");
jest.mock("../find-files");
jest.mock("../format-output");

describe("fetchFiles()", () => {
  const mockFindFiles = [
    "A mock-folder-path/file1.ext",
    "M mock-folder-path/file2.ext"
  ];

  const mockFormatOutput = [
    { status: "A", filename: "mock-folder-path/file1.ext" },
    { status: "M", filename: "mock-folder-path/file2.ext" }
  ];

  beforeEach(() => {
    findFiles.mockReturnValue(mockFindFiles);
    formatOutput.mockReturnValue(mockFormatOutput);
    fetchFiles("mock-folder-path");
  });

  it("should call revert staging", () => {
    expect(revertStaging).toHaveBeenCalled();
  });

  it("should call find files with the correct folder path", () => {
    expect(findFiles).toHaveBeenCalledWith("mock-folder-path");
  });

  it("should call format output with the correct files", () => {
    expect(formatOutput).toHaveBeenCalledWith(mockFindFiles);
  });

  describe("when NO error is thrown", () => {
    it("should return the correct files", () => {});
  });

  describe("when error is thrown", () => {
    let originalLog;
    let files;
    let consoleLog;

    beforeEach(() => {
      originalLog = console.log; // eslint-disable-line no-console
      consoleLog = jest.fn();
      console.log = consoleLog; // eslint-disable-line no-console

      revertStaging.mockImplementation(() => {
        throw new Error("mock error");
      });

      files = fetchFiles("mock-folder-path");
    });

    afterEach(() => {
      console.log = originalLog; // eslint-disable-line no-console
    });

    it("should log an error to the console", () => {
      expect(consoleLog).toHaveBeenCalledWith("mock error");
    });

    it("should return an empty array", () => {
      expect(files).toEqual([]);
    });
  });
});
