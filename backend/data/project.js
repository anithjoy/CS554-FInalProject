const mongoCollections = require('../config/mongoCollections');
const companies = mongoCollections.company;
const users = mongoCollections.user;
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

    return projects;
}
const getCompanyById = async (id) => {
    id = helper.common.isValidId(id);

    const companyCollection = await companies();
    const company = await companyCollection.findOne({_id: new ObjectId(id)},{projection:{hashedPassword:0}});
    if (company === null) throw {status:"404",error:'No company with that id'};
    company['_id']=company['_id'].toString()
    return company;
  };

  const getUsersByCompanyId = async(companyId) => {
    companyId = helper.common.isValidId(companyId);
    //check if a company exists with that id
    const userCollection = await users()
    const companyUsers = await userCollection.find({companyId: companyId}).toArray();
    if (companyUsers === null) throw {status:"404",error:'No users in that company'};
    for(let tempUser of companyUsers)
    tempUser['_id']=tempUser['_id'].toString()
    return companyUsers;
}


const createProject = async (name,companyId,creator,manager,description,watchers) =>{

    name = helper.project.isValidProjectName(name);
    
    companyId = helper.common.isValidId(companyId);
    await getCompanyById(companyId);

    let companyUsers = await getUsersByCompanyId(companyId);
    let companyUserIds = companyUsers.map(u => u.email);

    creator = helper.common.isValidEmail(creator);
    
    manager = helper.common.isValidEmail(manager);
    
    description = helper.common.isValidString(description,"description")
    watchers = helper.common.isValidWatchers(watchers);
    watchers = [...new Set([...watchers, creator, manager])];
    
    for(let w of watchers){
        if(!companyUserIds.includes(w)) throw {status:400,error:"invalid watcher/manager/creator id"} 
    }

    sprint = [];

    let newProject = {
        name,
        companyId,
        creator,
        manager,
        watchers,
        sprint,
        description
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
    let companyUsers = await getUsersByCompanyId(projectInDb.companyId);
    let companyUserIds = companyUsers.map(u => u.email);
    for(let w of data.watchers){
        if(!companyUserIds.includes(w)) throw {status:400,error:"invalid watcher/manager/creator id"} 
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

    let updatedInfo = {};
    
    await getProjectById(projectId);

    const sprint = await getSprintbyId(projectId, sprintId);
    let endDate=data.endDate||sprint.endDate;
    let startDate = data.startDate || sprint.startDate;
    if((endDate && startDate) && endDate<startDate) throw{status:400,error:'Invalid date'};
    const projectCollection = await projectCol();
    if(endDate){
        updatedInfo = await projectCollection.findOneAndUpdate(
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
        updatedInfo = await projectCollection.findOneAndUpdate(
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
