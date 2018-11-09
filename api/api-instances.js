

//== API Routing ===============================================================

//-- Dependencies --------------------------------
const api              = require('./api-maker.js');
const projectsDatabase = require('../data/helpers/projectModel.js');
const actionsDatabase  = require('../data/helpers/actionModel.js' );

//-- Configure Export Module ---------------------
const API = module.exports = {};


//== Projects API ==============================================================

API.projects = api(projectsDatabase, {
    schemaValidator: async function (body) {
        // Get values from request body
        let name = body.name;
        let description = body.description;
        let completed = body.completed;
        // Validate values are present and proper type
        // - validate name is a string, trim to 128 characters
        if(typeof name !== 'string' || !name.length){
            throw 'invalid project settings';
        }
        name = name.substring(0, 128);
        // - validate description is a string
        if(typeof description !== 'string' || !description.length){
            throw 'invalid project settings';
        }
        // - validate completed, if present, is boolean
        completed = completed? true : false;
        // Construct data from request
        return {
            name       : name       ,
            description: description,
            completed  : completed  ,
        };
    }
});
API.projects.get('/:id/actions', async function (request, response, next){
    // Attempt to find item-data in database
    try{
        const itemId = request.params.id;
        let itemData = await projectsDatabase.get(itemId);
        // Inform the user if the requested data was not found
        if(!itemData){
            response.status(404);
            response.json({
                message: "The item with the specified ID does not exist.",
            });
        }
        // Send the requested data
        else{
            response.status(200);
            response.json(itemData.actions);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        response.status(500);
        response.json({
            error: "The item information could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

//== Actions API ===============================================================

API.actions = api(actionsDatabase, {
    schemaValidator: async function (body) {
        // Get values from request body
        let project_id  = body.project_id ;
        let description = body.description;
        let notes       = body.notes      ;
        let completed   = body.completed  ;
        // Validate values are present and proper type
        // - validate project_id is an integer and the id of an existing project
        project_id = parseInt(project_id);
        if(!Number.isInteger(project_id)){
            throw 'invalid action settings';
        }
        try{
            let testProject = await actionsDatabase.get(project_id);
            if(!testProject){ throw '';}
        } catch(error){
            throw 'invalid action settings';
        }
        // - validate description is a string, trim to 128 characters
        if(typeof description !== 'string' || !description.length){
            throw 'invalid action settings';
        }
        description = description.substring(0, 128);
        // - validate notes is a string
        if(typeof notes       !== 'string' || !notes.length      ){
            throw 'invalid action settings';
        }
        // - validate completed, if present, is boolean
        completed = completed? true : false;
        // Construct data from request
        return {
            project_id : project_id ,
            description: description,
            notes      : notes      ,
            completed  : completed  ,
        };
    }
});
