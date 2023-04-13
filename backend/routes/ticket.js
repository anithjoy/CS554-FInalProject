const express = require('express');
const router = express.Router();
const helper = require('../helper');
const {ticket : ticketData} = require("../data");

//PD
router
.route('/')
.post(async (req, res) => {
    let data = req.body;
    try{
      data = helper.ticket.isValidTicketCreationData(data)
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const createTicket = await ticketData.createTicket(data);
      res.json(createTicket);
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
 .route('/:ticketId')
 .get(async (req, res) => {
    let ticketId;
    try{
        ticketId = helper.common.isValidId(req.params.ticketId);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const ticket = await ticketData.getTicketById(ticketId);
      res.json(ticket);
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
    try{
      data = helper.ticket.isValidTicketUpdateData(data)
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const updateTicket = await ticketData.updateTicket(data);
      res.json(updateTicket);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
 })

//Megh
router
.route('/:ticketId/comment')
 .get(async (req, res) => {

 })
 .post(async (req, res) => {

 })

//Anyone can pickup this
router
 .route('/:ticketId/comment/commentId')
 .delete(async (req, res) => {

    })

module.exports = router;