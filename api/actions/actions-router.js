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

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
      .then(action => {
          res.status(201).json(action);
      })
      .catch(next);
})

// router.put('/:id', validateActionId, validateAction, (req, res, next) => {
//     const { project_id, description, notes } = req.params;
//     console.log(req.params)
//     if(!project_id || !description || !notes){
//         next({ status: 400, message: "project_id, description, and notes field must be filled" });
//     } else {
//         Actions.update(req.params.id, req.params)
//             .then(updatedAction => {
//                 res.status(204).json(updatedAction);
//             })
//     }
// })

router.put('/:id', async (req, res, next) => {
    try {
        const validAction = await Actions.get(req.params.id)
        if(validAction){
            const { project_id, description, notes } = req.body;
            if(!project_id || !description || !notes){
                next({ status: 400, message: "project_id, description, and notes field must be filled" });
            } else {
                const updated = Actions.update(req.params.id, req.body)
                res.status(204).json(updated);
                //   .then(updated => {
                //       console.log(updated);
                //       res.status(204).json(updated);
                //   })
            }
        }
    } catch (error) {
    next(error)
    }
})

router.delete('/:id', validateActionId, async (req, res) => {
    try {
        const result = await Actions.remove(req.params.id);
        console.log(result);
        res.json(req.body);
    } catch (err) {
        next(err);
    }
})


function handleError (err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
}

router.use(handleError);
module.exports = router;