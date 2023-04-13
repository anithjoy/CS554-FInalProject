const express = require('express');
const router = express.Router();
const helper = require('../helper');
const {ticket : ticketData} = require("../data");

//Dhru
router
 .route('/')
 .get(async (req, res) => {

 })
 .post(async (req, res) => {

 })

//Dhru
router
 .route('/:projectId')
 .get(async (req, res) => {

 })
 .patch(async (req, res) => {

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