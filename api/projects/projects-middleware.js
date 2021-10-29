// add middlewares here related to projects
const Projects = require('./projects-model');

async function validateProjectId (req, res, next) {
    try{
        const validProject = await Projects.get(req.params.id);
        if(validProject){
            req.body = validProject;
            next();
        } else {
            next({ status: 404, message: "no project with given id" })
        }
    } catch (error) {
        next(error);
    }
}

function validProject (req, res, next) {
    const { name, description } = req.body;
    if(!name || !description){
        next({ status: 400, message: "please provide both body and description"})
    } else {
        next()
    }
}

module.exports = {
    validateProjectId,
    validProject
}