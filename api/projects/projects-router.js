// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
          res.status(400).json({ 
            message: 'getting projects failed',
            stack: err.stack
            });
      })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.body);
})

module.exports = router;