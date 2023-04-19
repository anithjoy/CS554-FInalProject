const mongoCollections = require('../config/mongoCollections');
const helper = require('../helper');
const service =  require("../service");
const projectCol = mongoCollections.project;
const {ObjectId} = require('mongodb');

const getProjectById = async (projectId) =>{
    projectId = helper.common.isValidId(projectId);
    
    const projectCollection = await projectCol();
    const project = await projectCollection.findOne({_id : new ObjectId(projectId)});

    if (project === null) 
    {
        throw {status: 404, error : 'No ticket with that id'};
    }

    project._id = project._id.toString();

    return project;
}

const getAllProjectsByEmail = async (email) => {

    email = helper.common.isValidEmail(email);

    const projectCollection = await projectCol();
    let projects = await projectCollection.find({watchers:{$elemMatch:email}}).toArray();

    if (projects === null || projects.length==0) 
    {
        throw {status: 404, error : 'No project with that user'};
    }


    for(let i of projects)
        i._id = i._id.toString();

    return projects;
}
const createProject = async (name,companyId,creator,manager,watchers) =>{

    name = helper.project.isValidProjectName(name);
    companyId = helper.common.isValidId(companyId);
    creator = helper.common.isValidEmail(creator);  
    manager = helper.common.isValidEmail(manager);
    watchers = helper.common.isValidWatchers(watchers);
    watchers = [...new Set([...watchers, creator, manager])];
    sprint = [];

    let newProject = {
        name,
        companyId,
        creator,
        manager,
        watchers,
        sprint
    };

    const projectCollection = await projectCol();
    const insertInfo = await projectCollection.insertOne(newProject);

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw {status: 400, error : 'Could not add project'};
  
    const newId = insertInfo.insertedId.toString();
    const project = await getProjectById(newId);

    service.email.sendProjectCreateEmail(ticket);

    return project;
}

const updateProject = async (projectId, data) =>{

    data = helper.project.isValidUpdateData(data);

    await getProjectById(projectId);

    const projectCollection = await projectCol();
    const updatedInfo = await projectCollection.updateMany(
      {_id: new ObjectId(projectId)},
      {$set: data}
    );
      
    if (updatedInfo.modifiedCount === 0) {
      throw {status: 400, error : 'could not update because values are same as previous one'};
    }

    const project = await getProjectById(id);

    service.email.sendProjectUpdateEmail(ticket);

    return project;
}
module.exports = {
    getProjectById,
    getAllProjectsByEmail,
    createProject,
    updateProject
};