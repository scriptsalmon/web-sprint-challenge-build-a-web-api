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
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.body);
})

router.post('/', validProject, (req, res) => {
    Projects.insert(req.body)
    res.status(201).json(req.body);
})

router.put('/:id', validProject, async (req, res, next) => {
    try{
        const validProject = await Projects.get(req.params.id);
        if(validProject){
            Projects.update(req.params.id, req.body)
            .then(updatedProject => {
              res.status(204).json(updatedProject);
        })
        } else {
            res.status(404).json("not a valid project id")
            next({ status: 404, message: "no project with given id" })
        }
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        await Projects.remove(req.params.id)
        res.json(req.body);
    } catch (error) {
        next(error)
    }
})

router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
      .then(projectActions => {
          res.status(200).json(projectActions);
      })
      .catch(next)
})

router.use(handleError);
module.exports = router;