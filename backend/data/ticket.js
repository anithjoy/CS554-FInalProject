const helper = require('../helper');
const mongoCollections = require('../config/mongoCollections');
const ticketCol = mongoCollections.ticket;
const commentCol = mongoCollections.comment;
const {ObjectId} = require('mongodb');

const deleteTicketComment = async (ticketId, commentId) => {

  ticketId = helper.common.isValidId(ticketId);
  commentId = helper.common.isValidId(commentId);

  const ticketCollection = await ticketCol();
  const commentCollection = await commentCol();

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
};

module.exports = { deleteTicketComment };
