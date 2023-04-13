const helper = require('../helper');
const mongoCollections = require('../config/mongoCollections');
const ticketCol = mongoCollections.ticket;
const {ObjectId} = require('mongodb');

const getTicketById = async(ticketId) =>{
    ticketId = helper.common.isValidId(ticketId);

    const ticketCollection = await ticketCol();
    const ticket = await ticketCollection.findOne({_id: ObjectId(ticketId)});

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
    const ticket = await ticketCollection.find({projectId : projectId});

    if (ticket === null) 
    {
        throw {status: 404, error : 'No ticket with that project id'};
    }

    ticket._id = ticket._id.toString();

    return ticket;
}

const createTicket = async(data) => {

    data = helper.ticket.isValidTicketCreationData(data);

    const ticketCollection = await ticketCol();
  
    const insertInfo = await ticketCollection.insertOne(data);
  
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw {status: 400, error : 'Could not add ticket'};
  
    const newId = insertInfo.insertedId.toString();
    const ticket = await getTicketById(newId);
  
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
      {_id: ObjectId(ticketId)},
      {$set: data}
    );
      
    if (updatedInfo.modifiedCount === 0) {
      throw {status: 400, error : 'could not update because values are same as previous one'};
    }
  
    const ticket = await getTicketById(ticketId);
    return ticket;
};

module.exports = {
getTicketById,
getTicketByProjectId,
createTicket,
updateTicket
};