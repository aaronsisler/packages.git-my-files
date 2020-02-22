import formatOutput from "./format-output";
import * as grabLooseFiles from "../grab-loose-files";

jest.mock("../grab-loose-files");

describe("formatOutput()", () => {
  describe("when a valid input is provided", () => {
    describe("when the status is NOT known", () => {
      describe("when the file is a folder path", () => {
        let files;

        beforeEach(() => {
          grabLooseFiles.default.mockReturnValue([
            { status: "A", filename: "mock-folder-path/file1.ext" },
            { status: "A", filename: "mock-folder-path/file2.ext" }
          ]);
          files = formatOutput(["?? mock-folder-path/"]);
        });

        it("should call the correct helper function", () => {
          expect(grabLooseFiles.default).toHaveBeenCalledWith(
            "mock-folder-path/"
          );
        });

        it("should return the expected result", () => {
          expect(files).toEqual([
            { status: "A", filename: "mock-folder-path/file1.ext" },
            { status: "A", filename: "mock-folder-path/file2.ext" }
          ]);
        });
      });

      describe("when the file is NOT a folder path", () => {
        let files;

        beforeEach(() => {
          files = formatOutput(["?? filename.js"]);
        });

        it("should return the expected result", () => {
          expect(files).toEqual([{ status: "A", filename: "filename.js" }]);
        });
      });
    });

    describe("when the status is known", () => {
      let files;

      beforeEach(() => {
        files = formatOutput(["M filename.js"]);
      });

      it("should return the expected result", () => {
        expect(files).toEqual([{ status: "M", filename: "filename.js" }]);
      });
    });
  });

  describe("when an invalid input is provided", () => {
    const originalLog = console.log; // eslint-disable-line no-console
    let files;
    let consoleLog;
    beforeEach(() => {
      consoleLog = jest.fn();
      console.log = consoleLog; // eslint-disable-line no-console
      files = formatOutput(123);
    });

    afterEach(() => {
      console.log = originalLog; // eslint-disable-line no-console
    });

    it("should log an error to the console", () => {
      expect(consoleLog).toHaveBeenCalled();
    });

    it("should return an empty array", () => {
      expect(files).toEqual([]);
    });
  });
});
