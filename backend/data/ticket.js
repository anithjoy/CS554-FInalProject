const helper = require('../helper');
const service =  require("../service");
const mongoCollections = require('../config/mongoCollections');
const ticketCol = mongoCollections.ticket;
const commentCol = mongoCollections.comment;
const {ObjectId} = require('mongodb');

const getCommentById = async(commentId) =>{

  commentId = helper.common.isValidId(commentId);

  const commentCollection = await commentCol();
  const comment = await commentCollection.findOne({_id: new ObjectId(commentId)});

    if (comment === null) 
    {
        throw {status: 404, error : 'No comment with that id'};
    }

    comment._id = comment._id.toString();

    return comment;
}

const deleteTicketComment = async (commentId) => {

  commentId = helper.common.isValidId(commentId);

  const commentCollection = await commentCol();

  const updatedInfo_comment = await commentCollection.deleteOne({
    _id: new ObjectId(commentId),
  });

  if (
    !updatedInfo_comment.acknowledged ||
    !updatedInfo_comment.deletedCount 
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
    if(data.watchers && data.assign) data.watchers = [...new Set([...data.watchers, data.assign,data.creator])];
    else if(data.assign) data.watchers = [...new Set([data.assign,data.creator])];
    else if(data.watchers) data.watchers = [...new Set([...data.watchers,data.creator])];
    else data.watchers = [...new Set([data.creator])];
    
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
    
    let ticketInDb = await getTicketById(ticketId);
    if(data.assign){
      if(data.watchers) data.watchers = [...new Set([...data.watchers, data.assign])];
      else data.watchers = [...new Set([...ticketInDb.watchers, data.assign])];
    }
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
const createComment = async( ticketId, sender, text) =>{
  ticketId = helper.common.isValidId(ticketId);
  sender = helper.common.isValidEmail(sender);
  text = helper.common.isValidString(text,'comment');
  let newComment = {
    sender,
    ticketId,
    timeStamp:new Date(),
    text
  }
  const commentCollection = await commentCol();
  const commentInsertInfo = await commentCollection.insertOne(newComment);
  if (!commentInsertInfo.acknowledged || !commentInsertInfo.insertedId)
        throw {status: 400, error : 'Could not add comment'};

  return newComment;
}

const getCommentsByTicketId = async(ticketId) =>{
  ticketId = helper.common.isValidId(ticketId);

  const commentCollection = await commentCol();
  const comments = await commentCollection.find({ticketId}).toArray();

  return comments;
}

module.exports = {
getTicketById,
getTicketByProjectId,
getTicketByUser,
createTicket,
updateTicket,
deleteTicketComment,
createComment,
getCommentsByTicketId,
getCommentById
};
