const throwError = error => {
  const errorMessage = error.toString();

  if (errorMessage.includes("Not a git repository")) {
    return "Not a git repository";
  }

  return errorMessage;
};

module.exports = throwError;
