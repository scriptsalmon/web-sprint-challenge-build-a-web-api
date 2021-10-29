const express = require('express');

const server = express();

server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require('./actions/actions-router');
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('./projects/projects-router');

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);


server.get('/', (req, res) => {
    res.send(`
    <h1>hey, youre beautiful!</h1>
    `)
})

module.exports = server;
