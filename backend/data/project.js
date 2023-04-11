const mongoCollections = require('../config/mongoCollections');
const helper = require('../helper');
const projects = mongoCollections.project;
const {ObjectId} = require('mongodb');

const getProjectById = async (id) =>{
    helper.project.checkId(id);
    console.log('Showing data of '+id);
    const projectCollection = await projects();
    const project = await projectCollection.findOne({_id : new ObjectId(id)});
    project._id = project._id.toString();
    return project;
}
const getAllProjects = async (creator) => {
    creator = helper.project.checkEmail(creator);
    const projectCollection = await projects();
    let projectList = await projectCollection.find({creator:creator});
    if(!projectList) throw {status:500 , error : 'Could not get any project'};
    if(projectList.length==0){
        throw {status:404 , error : 'No projects for this email'};
    }
    for(let i of projectList){
        i.projectId = i.projectId.toString();
    }
    return projectList;
}
const createProject = async (name,companyId,creator,manager) =>{
    const projectCollection = await projects();
    helper.project.checkName(name);
    helper.project.checkId(companyId);
    helper.project.checkEmail(creator);  
    helper.project.checkEmail(manager);
    watchers = [];
    sprint = [];
    let newProject = {
        name,
        companyId,
        creator,
        manager,
        watchers,
        sprint
    };
    const insertInfo = await projectCollection.insertOne(newProject);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw {status:500, error : 'Could not add project'};
    console.log('Successful , showing data in console');
    const newId = insertInfo.insertedId.toString();
    const project = await getProjectById(newId);
    return project;
}
const updateProject = async (id,name,companyId,creator,manager) =>{
    const projectCollection = await projects();
    helper.project.checkName(name);
    helper.project.checkId(companyId);
    helper.project.checkEmail(creator);  
    helper.project.checkEmail(manager);
    let newProject = {
        name,
        companyId,
        creator,
        manager,
    };
    const updateInfo = await projectCollection.updateOne({_id : new ObjectId(id)}, {$set : newProject});
    if (updateInfo.modifiedCount === 0) {
      throw {status:500 , error : 'could not update project successfully'};
    }

    const project = await getProjectById(id);
    return project;
}
module.exports = {
    getProjectById,
    getAllProjects,
    createProject,
    updateProject
};