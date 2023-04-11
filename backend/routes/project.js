const express = require('express');
const router = express.Router();
const data = require('../data');
const projectData = data.project;
const helper = require('../helper')
//Dhru
router
 .route('/')
 .get(async (req, res) => {
    try{
        if(req.body.email){
            let emailExist = await helper.project.checkEmail(req.body.email);
            if(emailExist){
                console.log('Fetching data for email address : ' + req.body.email);
                let projectList = await projectData.getAllProjects(req.body.email);
                //const projectString = JSON.stringify(projectList);  For redis
                res.json(projectList);
            }else{
                console.log(req.body.email);
                throw {status:404 , error : 'No projects for this email'}
            }
        }
    }catch(e){
        console.log(e);
        res.status(e.status).json(e.error);
        return;
    }
 })
 .post(async (req, res) => {
    let projectInfo = req.body;
    try{
        projectInfo.name = helper.project.checkName(projectInfo.name);
        projectInfo.companyId = helper.project.checkId(projectInfo.companyId);
        projectInfo.creator = helper.project.checkEmail(projectInfo.creator);  // can be retrived from cookie later
        projectInfo.manager = helper.project.checkEmail(projectInfo.manager);

        console.log('Inserting project in database with name ' + projectInfo.name);

        const newProject = await projectData.createProject(
            projectInfo.name,
            projectInfo.companyId,
            projectInfo.creator,
            projectInfo.manager
        )
        res.json(newProject);
    }catch(e){
        console.log(e);
        res.status(e.status).json(e.error);
        return;
    }
 })

//Dhru
router
 .route('/:projectId')
 .get(async (req, res) => {
    try {
      req.params.projectId = helper.project.checkId(req.params.projectId);
    } catch (e) {
        console.log(e);
        //res.status(e.status).json(e.error);
      return;
    }
    try{
        let project = await projectData.getProjectById(req.params.projectId);
        res.json(project);
    }catch(e){
        console.log(e);
        //res.status(e.status).json(e.error);
      return;
    }
 })
 .patch(async (req, res) => {
    let projectReq = req.body;
    try{
        let projectInfo = await projectData.getProjectById(req.params.projectId);
        let name = projectReq.name || projectInfo.name;
        companyId =  projectReq.companyId || projectInfo.companyId;
        creator =  projectReq.creator || projectInfo.creator;
        manager =  projectReq.manager || projectInfo.manager;

        name = helper.project.checkName(name);
        companyId = helper.project.checkId(companyId);
        creator = helper.project.checkEmail(creator);  // can be retrived from cookie later
        manager = helper.project.checkEmail(manager);

        console.log('Updating project : ' +name);

        const newProject = await projectData.updateProject(
            req.params.projectId,
            name,
            companyId,
            creator,
            manager
        )
        res.json(newProject);
    }catch(e){
        console.log(e);
        //res.status(e.status).json(e.error);
        return;
    }
 })

//Maunish
router
 .route('/:projectId/sprint')
 .get(async (req, res) => {

 })
 .post(async (req, res) => {

 })

//Maunish
router
 .route('/:projectId/sprint/sprintId')
 .get(async (req, res) => {

 })
 .patch(async (req, res) => {

 })

//PD
router
 .route('/:projectId/ticket')
 .get(async (req, res) => {

 })

module.exports = router;