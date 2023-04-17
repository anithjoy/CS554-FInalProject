
const express = require('express');
const router = express.Router();
const helper = require('../helper');
const {ticket : ticketData} = require("../data");

//PD
router
 .route("/")
 .post(async (req, res) => {

 });

//PD
router
  .route("/:ticketId")
  .get(async (req, res) => {

  })
  .patch(async (req, res) => {

  });

//Megh
router
  .route("/:ticketId/comment")
  .get(async (req, res) => {

  })
  .post(async (req, res) => {

  });

//Anyone can pickup this
router.route("/:ticketId/comment/:commentId").delete(async (req, res) => {
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
