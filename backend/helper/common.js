const mongoCollections = require("../config/mongoCollections");
const companies = mongoCollections.company; // company
const tickets = mongoCollections.ticket; //ticket
const comments = mongoCollections.comment; // comment
const { ObjectId } = require("mongodb");
const helper = require("./state");

// company

const checkCompanyById = async (companyId) => {
  companyId = helper.checkId(companyId);
  const companyCollection = await companies();
  const company = await companyCollection.findOne({
    _id: new ObjectId(companyId),
  });
  if (!company) {
    throw { status: 404, error: "couldn't find company" };
  }
};

// tickets

const getTicketById = async (ticketId) => {
  ticketId = helper.checkId(ticketId);

  const ticketCollection = await tickets();
  const ticket = await ticketCollection.findOne({
    _id: new ObjectId(ticketId),
  });
  if (!ticket) {
    throw { status: 404, error: "couldn't find ticket with ticketId" };
  }
  return ticket;
};

// comments

const getCommentById = async (commentId) => {
  commentId = helper.checkId(commentId);

  const commentCollection = await comments();
  const comment = await commentCollection.findOne({
    _id: new ObjectId(commentId),
  });
  if (!comment) {
    throw { status: 404, error: "couldn't find comment with commentId" };
  }
  return comment;
};

module.exports = {
  checkCompanyById,
  getTicketById,
  getCommentById,
};
