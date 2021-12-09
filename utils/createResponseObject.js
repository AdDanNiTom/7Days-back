function createResponseObject(data, status, message, error) {
  return {
    data: data,
    status: status,
    message: message,
    error: error,
  };
}

module.exports = createResponseObject;
