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

module.exports = {
    validateProjectId,
}