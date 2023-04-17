const express = require('express');
const router = express.Router();

const helper = require('../helper');
const {ticket : ticketData, project : projectData} = require("../data");

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
                res.json(projectList);
            }else{
                throw {status:404 , error : 'No projects for this email'}
            }
        }
    }catch(e){
        res.status(e.status).json(e.error);
        return;
    }
 })
 .post(async (req, res) => {
    let projectInfo = req.body;
    try{
        projectInfo.name = helper.project.checkName(projectInfo.name);
        projectInfo.companyId = helper.common.checkId(projectInfo.companyId);
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
        res.status(e.status).json(e.error);
        return;
    }
 })

//Dhru
router
 .route('/:projectId')
 .get(async (req, res) => {
    try {
      req.params.projectId = helper.common.checkId(req.params.projectId); //replace email with cookie
    } catch (e) {
        res.status(e.status).json(e.error);
      return;
    }
    try{
        let project = await projectData.getProjectById(req.params.projectId);
        res.json(project);
    }catch(e){
        res.status(e.status).json(e.error);
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
        watchers = projectReq.watchers  || projectInfo.watchers;
        sprint = projectReq.sprint  || projectInfo.sprint;

        name = helper.project.checkName(name);
        companyId = helper.common.checkId(companyId);
        creator = helper.project.checkEmail(creator);  // can be retrived from cookie later
        manager = helper.project.checkEmail(manager);

        console.log('Updating project : ' +name);

        const newProject = await projectData.updateProject(
            req.params.projectId,
            name,
            companyId,
            creator,
            manager,
            watchers,
            sprint
        )
        res.json(newProject);
    }catch(e){
        console.log(e);
        res.status(e.status).json(e.error);
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
    let projectId;
    try{
        projectId = helper.common.isValidId(req.params.projectId);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const tickets = await ticketData.getTicketByProjectId(projectId);
      res.json(tickets);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
 })

module.exports = router;