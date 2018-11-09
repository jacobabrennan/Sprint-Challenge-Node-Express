

//== API Routing ===============================================================

//-- Dependencies --------------------------------
const api              = require('./route-api.js');
const projectsDatabase = require('../data/helpers/projectModel.js');
const actionsDatabase  = require('../data/helpers/actionModel.js' );

//-- Configure Export Module ---------------------
module.exports = {};


//== Projects API ==============================================================

module.exports.projects = api(projectsDatabase, {
    schemaValidator(body) {
        // Get values from request body
        let name = body.name;
        let description = body.description;
        let completed = body.completed;
        // Validate values are present and proper type
        // - validate name is a string, trim to 128 characters
        if(typeof name        !== 'string' || !name.length       ){ return false;}
        name = name.substring(0, 128);
        // - validate description is a string
        if(typeof description !== 'string' || !description.length){ return false;}
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

//== Actions API ===============================================================

module.exports.actions = api(actionsDatabase, {
    schemaValidator(body) {
        // Get values from request body
        let project_id  = body.project_id ;
        let description = body.description;
        let notes       = body.notes      ;
        let completed   = body.completed  ;
        // Validate values are present and proper type
        // - validate project_id is an integer
        project_id = parseInt(project_id);
        if(!Number.isInteger(project_id)){ return false;}
        // - validate description is a string, trim to 128 characters
        if(typeof description !== 'string' || !description.length){ return false;}
        description = description.substring(0, 128);
        // - validate notes is a string
        if(typeof notes       !== 'string' || !notes.length      ){ return false;}
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
