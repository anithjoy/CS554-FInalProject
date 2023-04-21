
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
    let ticketId;
    try{
      data = helper.ticket.isValidTicketUpdateData(data);
      ticketId = helper.common.isValidId(req.params.ticketId);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
        res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }

    try{
      const updateTicket = await ticketData.updateTicket(ticketId, data);
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
  .route("/:ticketId/comment")
  .get(async (req, res) => {
    try{
      req.params.ticketId = helper.common.isValidId(req.params.ticketId);
      const comments = await ticketData.getCommentsByTicketId(req.params.ticketId);
      if(!comments) throw {status:500,error:'Could not get comments'};
      res.json(comments);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
      else
        res.status(parseInt(e.status)).json(e.error);
      return;
    }
    
    
  })
  .post(async (req, res) => {
    try{
      req.params.ticketId = helper.common.isValidId(req.params.ticketId);
      req.body.text = helper.common.isValidString(req.body.text,'comment');
      if(req.body.document) req.body.document = helper.ticket.isValidDocument(req.body.document);

      const updatedTicket = await ticketData.createComment(req.params.ticketId ,req.body);
      res.json(updatedTicket);
    }catch(e){
      if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
    }
  });

//Anyone can pickup this
router
 .route("/:ticketId/comment/:commentId")
 .delete(async (req, res) => {
  try {
    let ticketId = req.params.ticketId;
    let commentId = req.params.commentId;

    ticketId = helper.common.isValidId(ticketId);
    commentId = helper.common.isValidId(commentId);

    await ticketData.deleteTicket(ticketId, commentId);
    return res.status(200).json("Removed");
  } catch (error) {
    if(typeof e !== 'object' || !('status' in e))
      res.status(500).json("Internal server error");
    else
      res.status(parseInt(e.status)).json(e.error);
    return;
  }
});

module.exports = router;
