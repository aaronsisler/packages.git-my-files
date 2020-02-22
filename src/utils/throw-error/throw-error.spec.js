import throwError from "./throw-error";

describe("throwError()", () => {
  let returnedErrorMessage;

  beforeEach(() => {
    returnedErrorMessage = throwError("generic-error");
  });

  it("should have a return type of string", () => {
    expect(typeof returnedErrorMessage).toEqual("string");
  });

  describe("when error includes the git repository message", () => {
    beforeEach(() => {
      returnedErrorMessage = throwError("Not a git repository");
    });

    it("should return the correct message", () => {
      expect(returnedErrorMessage).toEqual("Not a git repository");
    });
  });

  describe("when error does NOT include the git repository message", () => {
    it("should return the correct message", () => {
      expect(returnedErrorMessage).toEqual("generic-error");
    });
  });
});
