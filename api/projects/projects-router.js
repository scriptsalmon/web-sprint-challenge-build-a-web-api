// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId,
        validProject,
        handleError
      } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(next);
    //   .catch(err => {
    //       res.status(400).json({ 
    //         message: 'getting projects failed',
    //         stack: err.stack
    //         });
    //   })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.body);
})

router.post('/', validProject, (req, res) => {
    Projects.insert(req.body)
    res.status(201).json(req.body);
})

router.put('/:id', validateProjectId, (req, res) => {
    Projects.update(req.body)
    res.status(204).json(req.body);
})

router.use(handleError);
module.exports = router;