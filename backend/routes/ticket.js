const express = require("express");
const router = express.Router();
const ticketData = require("../data/ticket");
const allHelper = require("../helper");
const helper = allHelper.state;

//PD
router.route("/").post(async (req, res) => {});

//PD
router
  .route("/:ticketId")
  .get(async (req, res) => {})
  .patch(async (req, res) => {});

//Megh
router
  .route("/:ticketId/comment")
  .get(async (req, res) => {})
  .post(async (req, res) => {});

//Anyone can pickup this
router.route("/:ticketId/comment/:commentId").delete(async (req, res) => {
  try {
    let ticketId = req.params.ticketId;
    let commentId = req.params.commentId;

    ticketId = helper.checkId(ticketId);
    commentId = helper.checkId(commentId);

    const newTicket = await ticketData.deleteTicket(ticketId, commentId);
    return res.status(200).json({ ticket: newTicket });
  } catch (error) {
    return res.status(error.status).json({ error: error.error });
  }
});

module.exports = router;
