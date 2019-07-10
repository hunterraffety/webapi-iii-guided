module.exports = gate;

function gate(req, res, next) {
  const password = req.headers.password;

  if (password && password === 'open') {
    next();
  } else {
    res.status(401).json({ you: 'Shall not pass!' });
  }
}
