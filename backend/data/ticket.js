const helper = require('../helper');
const service =  require("../service");
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

const getTicketById = async(ticketId) =>{
    ticketId = helper.common.isValidId(ticketId);

    const ticketCollection = await ticketCol();
    const ticket = await ticketCollection.findOne({_id: new ObjectId(ticketId)});

    if (ticket === null) 
    {
        throw {status: 404, error : 'No ticket with that id'};
    }

    ticket._id = ticket._id.toString();

    return ticket;
}

const getTicketByProjectId = async(projectId) =>{
    projectId = helper.common.isValidId(projectId);

    const ticketCollection = await ticketCol();
    const ticket = await ticketCollection.find({projectId : projectId}).toArray();

    if (ticket === null) 
    {
        throw {status: 404, error : 'No ticket with that project id'};
    }

    ticket._id = ticket._id.toString();

    return ticket;
}

const getTicketByUser = async(email) =>{
  email = helper.common.isValidEmail(email);

  const ticketCollection = await ticketCol();
  const ticket = await ticketCollection.find({watchers:{$elemMatch:{$eq:email}}}).toArray();

  return ticket;
}

const createTicket = async(data) => {

    data = helper.ticket.isValidTicketCreationData(data);
    data.comments=[];
    const ticketCollection = await ticketCol();
  
    const insertInfo = await ticketCollection.insertOne(data);
  
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw {status: 400, error : 'Could not add ticket'};
  
    const newId = insertInfo.insertedId.toString();
    const ticket = await getTicketById(newId);

    service.email.sendTicketCreateEmail(ticket);

    return ticket;
}

const updateTicket = async (
    ticketId,
    data
  ) => {
  
    ticketId = helper.common.isValidId(ticketId);
    data = helper.ticket.isValidTicketUpdateData(data);
  
    const ticketCollection = await ticketCol();
    
    await getTicketById(ticketId);

    const updatedInfo = await ticketCollection.updateMany(
      {_id: new ObjectId(ticketId)},
      {$set: data}
    );
      
    if (updatedInfo.modifiedCount === 0) {
      throw {status: 400, error : 'could not update because values are same as previous one'};
    }
  
    const ticket = await getTicketById(ticketId);

    service.email.sendTicketUpdateEmail(ticket);

    return ticket;
};
const createComment = async( ticketId, body) =>{
  ticketId = helper.common.isValidId(ticketId);
  body.text = helper.common.isValidString(body.text,'comment');
  let newComment = {
    commentId:new ObjectId(),
    text:body.text
  }
  if(body.document) {
    body.document = helper.ticket.isValidDocument(body.document);
    newComment.document = boyd.document;
  }
  const ticketCollection = await ticketCol();
  const insertInfo = await ticketCollection.updateOne(
    {_id:new ObjectId(ticketId)}, {$push:{comments:newComment}}
  );
  if (!insertInfo.acknowledged || !insertInfo.modifiedCount)
      throw {status: 400, error : 'Could not add comment'};

  const ticket = await getTicketById(ticketId);

  return ticket;
}

const getCommentsByTicketId = async(ticketId) =>{
  ticketId = helper.common.isValidId(ticketId);

  const ticketCollection = await ticketCol();
  const ticket = await ticketCollection.findOne({_id: new ObjectId(ticketId)});

  if (ticket === null) 
  {
      throw {status: 404, error : 'No ticket with that id'};
  }

  return ticket.comments;
}
module.exports = {
getTicketById,
getTicketByProjectId,
getTicketByUser,
createTicket,
updateTicket,
deleteTicketComment,
createComment,
getCommentsByTicketId
};
