const Actions = require('./actions-model');

async function validateActionId (req, res, next) {
    try{
        const validAction = await Actions.get(req.params.id);
        if(validAction){
            req.body = validAction;
            next();
        } else {
            res.status(404).json("not a valid action id")
            next({ status: 404, message: "no action with given id" })
        }
    } catch (error) {
        next(error);
    }
}

function validateAction (req, res, next) {
    const { project_id, description, notes } = req.body;
    if(!project_id || !description || !notes) {
        // res.status(400).json({message: "project_id, description, and notes field must be filled" })
        next({ status: 400, message: "project_id, description, and notes field must be filled" });
    } else {
        req.body = ({ project_id, description, notes })
    }
}

module.exports = {
    validateActionId,
    validateAction
}