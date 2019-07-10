const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');
const gate = require('./auth/gate-middleware');

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`);
  next();
}

// global middleware
server.use(logger);
server.use(helmet());
server.use(express.json());

server.get('/free', (req, res) => {
  res.status(200).json({ welcome: 'Web 20 Developers!' });
});

server.get('/paid', gate, (req, res) => {
  res.status(200).json({ message: 'it worked' });
});

server.use('/api/hubs', gate, hubsRouter);

// local middleware
function addName(req, res, next) {
  const name = 'Web 20 Developer';
  // add the name to the request
  req.teamName = name;
  // allow it to continue on ('press the button')
  next();
}

server.get('/', addName, (req, res) => {
  const nameInsert = req.teamName ? ` ${req.teamName}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.use(errorHandler);

function errorHandler(error, req, res, next) {
  console.log(error);
  res.status(error).json({ you: 'shall not pass' });
}

// mw > mw > mw > mw > eh > mw > mw > eh > mw > mw > eh

module.exports = server;
