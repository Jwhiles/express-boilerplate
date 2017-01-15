const Router = require('express').Router();

Router.get('/', (request, reply) => {
  reply.send(`
    <h1>hello world</h1>
    <a href='static.html'>Go to static page</a>
  `);
})

module.exports = Router;
