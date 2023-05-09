const mongoCollections = require('./config/mongoCollections');
const companyCol = mongoCollections.company;
const userCol = mongoCollections.user;
const stateCol = mongoCollections.state;
const projectCol = mongoCollections.project;
const ticketCol = mongoCollections.ticket;
const commentCol = mongoCollections.comment;
const company = require("./dbFile/company");
const user = require("./dbFile/user");
const state = require("./dbFile/state");
const project = require("./dbFile/project");
const ticket = require("./dbFile/ticket");
const comment = require("./dbFile/comment");
const dbConnection = require('./config/mongoConnection');

const importCompanyData = async () => {
  try {
    const companyCollection = await companyCol();
    if(await companyCollection.count({}, { limit: 1 }) == 0)
    {
        await companyCollection.insertMany(company);
    }
    console.log('Company data successfully imported');
    return;
  } catch (error) {
    console.log('error', error);
    return;
  }
}

const importUserData = async () => {
    try {
      const userCollection = await userCol();
      if(await userCollection.count({}, { limit: 1 }) == 0)
      {
        await userCollection.insertMany(user);
      }
      console.log('User data successfully imported');
      return;
    } catch (error) {
      console.log('error', error);
      return;
    }
}

const importStateData = async () => {
    try {
      const stateCollection = await stateCol();
      if(await stateCollection.count({}, { limit: 1 }) == 0)
      {
        await stateCollection.insertMany(state);
      }
      console.log('State data successfully imported');
      return;
    } catch (error) {
      console.log('error', error);
      return;
    }
}

const importProjectData = async () => {
    try {
      const projectCollection = await projectCol();
      if(await projectCollection.count({}, { limit: 1 }) == 0)
      {
        await projectCollection.insertMany(project);
      }
      console.log('Project data successfully imported');
      return;
    } catch (error) {
      console.log('error', error);
      return;
    }
}

const importTicketData = async () => {
    try {
      const ticketCollection = await ticketCol();
      if(await ticketCollection.count({}, { limit: 1 }) == 0)
      {
        await ticketCollection.insertMany(ticket);
      }
      console.log('Ticket data successfully imported');
      return;
    } catch (error) {
      console.log('error', error);
      return;
    }
}

const importCommentData = async () => {
    try {
      const commentCollection = await commentCol();
      if(await commentCollection.count({}, { limit: 1 }) == 0)
      {
        await commentCollection.insertMany(comment);
      }
      console.log('Comment data successfully imported');
      return;
    } catch (error) {
      console.log('error', error);
      return;
    }
}
const main = async() =>{
 await importCompanyData();
 await importUserData();
 await importStateData();
 await importProjectData();
 await importTicketData();
 await importCommentData();
 dbConnection.closeConnection();
}

main()