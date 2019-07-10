module.exports = gate;

function gate(req, res, next) {
  const password = req.headers.password;

  if (password && password === 'open') {
    next();
  } else {
    next(401); // go to next errorHandler
  }
}
