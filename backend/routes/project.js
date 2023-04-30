const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient({});
client.connect().then(() => {});
const helper = require('../helper');
const {ticket : ticketData, project : projectData} = require("../data");

//Dhru
router
 .route('/')
 .get(async (req, res) => {

  try{
      const projects = await projectData.getAllProjectsByEmail(req.user.email);
      await client.hSet("project", req.user.email, JSON.stringify(projects));
      res.json(projects);
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }

 })
 .post(async (req, res) => {
    const data = req.body;
    try{
      data.name = helper.project.isValidProjectName(data.name);
      data.companyId = helper.common.isValidId(req.user.companyId);
      data.creator = helper.common.isValidEmail(req.user.email); 
      data.manager = helper.common.isValidEmail(data.manager);
      data.description = helper.common.isValidString(data.description,"description");
      if(data.watchers)
        data.watchers = helper.common.isValidWatchers(data.watchers);
      else
        data.watchers = [];
    }catch(e){
      if(typeof e !== 'object' || !('status' in e)){
        console.log(e);
        res.status(500).json("Internal server error");
      }
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const newProject = await projectData.createProject(data.name, data.companyId, data.creator, data.manager, data.description, data.watchers);
      await client.set(newProject._id.toString(), JSON.stringify(newProject));
      await client.del("project");
      res.status(201).json(newProject);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
 })

//Dhru
router
 .route('/:projectId')
 .get(async (req, res) => {
    let projectId;

    try {
      projectId = helper.common.isValidId(req.params.projectId);
    } catch (e) {
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
        let project = await projectData.getProjectById(projectId);
        await client.set(project._id.toString(), JSON.stringify(project));
        res.json(project);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
 })
 .patch(async (req, res) => {
    let data = req.body;
    let projectId = req.params.projectId
    try{
      data = helper.project.isValidUpdateData(data);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const updatedProject = await projectData.updateProject(
        projectId,
        data
      )
      await client.set(updatedProject._id.toString(), JSON.stringify(updatedProject));
      await client.del("project");
      res.json(updatedProject);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
 })

//Maunish
router
 .route('/:projectId/sprint')
 .get(async (req, res) => {
    
    let projectId;

    try {
      projectId = helper.common.isValidId(req.params.projectId);
    } catch (e) {
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
        let sprints = await projectData.getAllSprintbyProjectId(projectId);
        await client.hSet("sprint", projectId, JSON.stringify(sprints));
        res.json(sprints);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
 })
 .post(async (req, res) => {
    const data = req.body;
    let projectId = req.params.projectId;
    try{
      data.name = helper.project.isValidSprintName(data.name);
      projectId = helper.common.isValidId(projectId);
      data.startDate = helper.common.isValidDate(data.startDate); 
      data.description = helper.common.isValidString(data.description);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const newSprint = await projectData.createSprint(projectId, data.name, data.startDate, data.description);
      await client.set(newSprint._id.toString(), JSON.stringify(newSprint));
      await client.hDel("sprint", projectId);
      res.status(201).json(newSprint);
    }catch(e){
      console.log(e);
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
 })

//Maunish
router
 .route('/:projectId/sprint/:sprintId')
 .get(async (req, res) => {

    let projectId = req.params.projectId;
    let sprintId = req.params.sprintId;

    try{
      projectId = helper.common.isValidId(projectId);
      sprintId = helper.common.isValidId(sprintId);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const sprint = await projectData.getSprintbyId(projectId, sprintId);
      await client.set(sprint._id.toString(), JSON.stringify(sprint));
      res.json(sprint);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
 })
 .patch(async (req, res) => {
  let data = req.body;
  let projectId = req.params.projectId
  let sprintId = req.params.sprintId
  try{
    data = helper.project.isValidSprintUpdateData(data);
    projectId = helper.common.isValidId(projectId);
    sprintId = helper.common.isValidId(sprintId);
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }

  try{
    const updatedSprint = await projectData.updateSprint(
      projectId,
      sprintId,
      data
    )
    await client.set(updatedSprint._id.toString(), JSON.stringify(updatedSprint));
    await client.hDel("sprint",projectId);
    res.json(updatedSprint);
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }

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