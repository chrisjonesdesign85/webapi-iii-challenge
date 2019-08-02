const express = 'express';

const PostsRouter = require('./posts/postRouter');
const UserRouter = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use('./posts', PostsRouter);
server.use(logger);

server.use('./users', UserRouter);
server.use('./posts', PostsRouter);

server.get('/', (req, res) => {
  res.send(`All Systems Go!`);
});


//custom middleware

function logger(req, res, next) {
  console.log(`Method: ${req.method}, url:${req.url}, timestamp: [${new Date().toISOString()}]`);
  next();
};

module.exports = server;
