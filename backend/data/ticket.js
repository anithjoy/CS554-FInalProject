const mongoCollections = require("../config/mongoCollections");
const tickets = mongoCollections.ticket;
const comments = mongoCollections.comment;
const allHelper = require("../helper");
const helper = allHelper.state;
const commonHelp = allHelper.common;
const { ObjectId } = require("mongodb");

// /ticket/:ticketId/comment/commentId
// Delete - delete a comment

const deleteTicket = async (ticketId, commentId) => {
  //  ticketId validation
  ticketId = helper.checkId(ticketId);
  const ticket = await commonHelp.getTicketById(ticketId);

  if (!ticket) {
    throw { status: 404, error: "couldn't find ticket" };
  }

  //   commentId validation
  commentId = helper.checkId(commentId);
  if (!ticket.comments.includes(commentId)) {
    throw { status: 404, error: "couldn't find commentId in ticket" };
  }
  const comment = await commonHelp.getCommentById(commentId);

  if (!comment) {
    throw { status: 404, error: "couldn't find comment" };
  }
  const ticketCollection = await tickets();
  const commentCollection = await comments();
  const updatedInfo_ticket = await ticketCollection.updateOne(
    { _id: new ObjectId(ticketId) },
    { $pull: { comments: commentId } }
  );

  if (!updatedInfo_ticket.matchedCount && !updatedInfo_ticket.modifiedCount) {
    throw { status: 404, error: "comment Not found in ticket" };
  }

  const updatedInfo_comment = await commentCollection.deleteOne({
    _id: new ObjectId(commentId),
  });

  if (
    !updatedInfo_comment.acknowledged ||
    updatedInfo_comment.deletedCount != 1
  ) {
    throw { status: 404, error: "comment not found" };
  }

  const newTicket = await commonHelp.getTicketById(ticketId);
  return newTicket;
};

module.exports = { deleteTicket };

// 6437365cbc9b4c34ba6640ee
// 64373609bc9b4c34ba6640ed
// async function main() {
//   try {
//     const res = await deleteTicket(
//       "643736b5bc9b4c34ba6640f3",
//       "64373bd3bc9b4c34ba6640f7"
//     );
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }

// main();
