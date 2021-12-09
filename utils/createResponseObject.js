function createResponseObject(success, status, message, data) {
  return {
    success: success,
    status: status,
    message: message,
    data: data,
  };
}

module.exports = createResponseObject;
