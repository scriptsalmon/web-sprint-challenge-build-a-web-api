const express = require('express');
const Actions = require('./actions-model');
const { validateActionId,
        validateAction, 
      } = require('./actions-middlware');

const router = express.Router();


router.get('/', (req, res, next) => {
    Actions.get()
      .then(actions => {
          res.status(200).json(actions);
      })
      .catch(next);
})

router.get('/:id', validateActionId, (req, res, next) => {
    Actions.get(req.params.id)
      .then(actions => {
          res.status(200).json(actions);
      })
      .catch(next);
})

router.post('/', validateAction, (req, res) => {
    res.status(200).json('nice');
})

router.put('/:id', (req, res) => {
    res.status(200).json('nice');
})

router.delete('/:id', (req, res) => {
    res.status(200).json('nice');
})


function handleError (err, req, res, next) {
    res.status(err.status || 500).json({
        prodMessage: "malfunction in projects router",
        stack: err.stack
    })
}

module.exports = router;