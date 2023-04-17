const express = require('express');
const router = express.Router();

const helper = require('../helper');
const {ticket : ticketData, project : projectData} = require("../data");

//Dhru
router
 .route('/')
 .get(async (req, res) => {

  try{
    req.query.email = helper.common.isValidEmail(req.query.email);
  }catch(e){
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }

  try{
      const projects = await projectData.getAllProjectsByEmail(req.query.email);
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
      data.companyId = helper.common.isValidId(data.companyId);
      data.creator = helper.common.isValidEmail(data.creator); 
      data.manager = helper.common.isValidEmail(data.manager);
      if(data.watchers)
        data.watchers = helper.common.isValidWatchers(watchers);
      else
        data.watchers = [];
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const newProject = await projectData.createProject(data.name, data.companyId, data.creator, data.manager, data.watchers)
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