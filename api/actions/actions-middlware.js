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

module.exports = {
    validateActionId
}