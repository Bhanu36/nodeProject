function response(code, message, data) {
  const responseObject = {
    code: code,
    status: message,
    data: data
  };

  return res.json(responseObject);
}

module.exports = {
  response
};
