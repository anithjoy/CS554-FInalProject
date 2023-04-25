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
    let projects = await projectCollection.find({watchers:{$elemMatch:{$eq:email}}}).toArray();

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

    service.email.sendProjectCreateEmail(project);

    return project;
}

const updateProject = async (projectId, data) =>{

    data = helper.project.isValidUpdateData(data);

    let projectInDb = await getProjectById(projectId);
    if(data.manager){
        if(data.watchers) data.watchers = [...new Set([...data.watchers, data.manager])];
        else data.watchers = [...new Set([...projectInDb.watchers, data.manager])];
      }
    const projectCollection = await projectCol();
    const updatedInfo = await projectCollection.updateMany(
      {_id: new ObjectId(projectId)},
      {$set: data}
    );
      
    if (updatedInfo.modifiedCount === 0) {
      throw {status: 400, error : 'could not update because values are same as previous one'};
    }

    const project = await getProjectById(projectId);

    service.email.sendProjectUpdateEmail(project);

    return project;
}

const createSprint = async (projectId, name, startDate, description) => {

    projectId = helper.common.isValidId(projectId);
    name = helper.project.isValidSprintName(name);
    startDate = helper.common.isValidDate(startDate);
    description = helper.common.isValidString(description);

    await getProjectById(projectId);

    let newSprint = {
        _id: new ObjectId(),
        name: name,
        startDate: startDate,
        description: description
    }

    const projectCollection = await projectCol();
    const insertedInfo = await projectCollection.updateOne(
        {_id: new ObjectId(projectId)},
        {$push: {sprint: newSprint}}
    )

    if(insertedInfo.modifiedCount === 0)
        throw {status: 400, error : 'Could not add project'};
    
    const project = await getProjectById(projectId);

    return project;
}

const getAllSprintbyProjectId = async (projectId) => {

    projectId = helper.common.isValidId(projectId);

    const projectCollection = await projectCol();
    const projects = await projectCollection.findOne({ _id: new ObjectId(projectId)})
    if (projects === null || projects.length==0)
        throw {status: 404, error : 'No project found with that ID'};
    else if(projects.sprint === null || projects.sprint.length === 0)
        return [];

    const sprints = projects.sprint;
    return sprints;
}

const getSprintbyId = async (projectId, sprintId) => {

    projectId = helper.common.isValidId(projectId);
    sprintId = helper.common.isValidId(sprintId);

    await getProjectById(projectId);

    const projectCollection = await projectCol();
    const sprint = await projectCollection.aggregate([
        { $match: { '_id' : new ObjectId(projectId) } },
        { $unwind: '$sprint' },
        { $match: { 'sprint._id': new ObjectId(sprintId) } },
        { $replaceRoot: { newRoot: '$sprint' } }
    ]).toArray();
    if (!sprint || sprint.length === 0) {
        throw { status: 404, error: 'Project or sprint not found' };
    }
    return sprint[0];
}

const updateSprint = async(projectId, sprintId, data) => {

    projectId = helper.common.isValidId(projectId);
    sprintId = helper.common.isValidId(sprintId);
    data = helper.project.isValidSprintUpdateData(data);
    
    await getProjectById(projectId);

    const sprint = await getSprintbyId(projectId, sprintId);
    let endDate=data.endDate||sprint.endDate;
    let startDate = data.startDate || sprint.startDate;
    if((endDate && startDate) && endDate<startDate) throw{status:400,error:'Invalid date'};
    const projectCollection = await projectCol();
    if(endDate){
        const updatedInfo = await projectCollection.findOneAndUpdate(
            {_id: new ObjectId(projectId), 'sprint._id': new ObjectId(sprintId)},
            {$set: {
                'sprint.$.name': data.name || sprint.name,
                'sprint.$.startDate': data.startDate || sprint.startDate,
                'sprint.$.endDate': data.endDate || sprint.endDate,
                'sprint.$.description': data.description || sprint.description
            }}
        )
    }
    else{
         const updatedInfo = await projectCollection.findOneAndUpdate(
            {_id: new ObjectId(projectId), 'sprint._id': new ObjectId(sprintId)},
            {$set: {
                'sprint.$.name': data.name || sprint.name,
                'sprint.$.startDate': data.startDate || sprint.startDate,
                'sprint.$.description': data.description || sprint.description
            }}
        )
    }
    if (updatedInfo.modifiedCount === 0) {
        throw {status: 400, error : 'could not update because values are same as previous one'};
    }
  
    const newsprint = await getSprintbyId(projectId, sprintId);
    return newsprint;
}

module.exports = {
    getProjectById,
    getAllProjectsByEmail,
    createProject,
    updateProject,
    createSprint,
    getAllSprintbyProjectId,
    getSprintbyId,
    updateSprint
};
