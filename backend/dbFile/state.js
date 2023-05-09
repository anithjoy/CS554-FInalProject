const {ObjectId} = require('mongodb');

const state = [{
    "_id": new ObjectId( "644904eae484963210856144"),
    "name": "Done",
    "companyId": "6448fbb3d6242a22961da169",
    "transition": [
      "6449effe7ce38e770f84fda5",
      "644a5c46e6a07b9a23ba8071"
    ],
    "description": "completed task"
  },{
    "_id": new ObjectId( "6449effe7ce38e770f84fda5"),
    "name": "Review",
    "companyId": "6448fbb3d6242a22961da169",
    "transition": [
      "644904eae484963210856144"
    ],
    "description": "In review ticket"
  },{
    "_id": new ObjectId( "644a5c46e6a07b9a23ba8071"),
    "name": "Not Ready",
    "companyId": "6448fbb3d6242a22961da169",
    "transition": [
      "644904eae484963210856144"
    ],
    "description": "Not Ready for dev"
  },{
    "_id": new ObjectId( "645350d458315fe8ba85fc11"),
    "name": "TO DO",
    "companyId": "645350d158315fe8ba85fc10",
    "transition": [],
    "description": "It's TO DO for person whom it's assigned"
  },{
    "_id": new ObjectId( "645350d658315fe8ba85fc12"),
    "name": "IN PROGRESS",
    "companyId": "645350d158315fe8ba85fc10",
    "transition": [],
    "description": "Person started woring on it"
  },{
    "_id": new ObjectId( "645350d658315fe8ba85fc13"),
    "name": "DONE",
    "companyId": "645350d158315fe8ba85fc10",
    "transition": [],
    "description": "Done by the person who was working on it"
  },{
    "_id": new ObjectId( "645350d658315fe8ba85fc14"),
    "name": "REOPEN",
    "companyId": "645350d158315fe8ba85fc10",
    "transition": [],
    "description": "Task or Issue was not properly done or resolved so it is reopened"
  },{
    "_id": new ObjectId( "645350d658315fe8ba85fc15"),
    "name": "CLOSE",
    "companyId": "645350d158315fe8ba85fc10",
    "transition": [],
    "description": "Perpose of the ticket is served"
  },{
    "_id": new ObjectId( "64562e5b1d0cededde2c8328"),
    "name": "kehvatlal",
    "companyId": "6448fbb3d6242a22961da169",
    "transition": [
      "644904eae484963210856144",
      "644a5c46e6a07b9a23ba8071"
    ],
    "description": "In review ticket"
  },{
    "_id": new ObjectId( "6456310ce9637d3dfce74968"),
    "name": "TO DO",
    "companyId": "6456310ce9637d3dfce74967",
    "transition": [],
    "description": "It's TO DO for person whom it's assigned"
  },{
    "_id": new ObjectId( "6456310ce9637d3dfce74969"),
    "name": "IN PROGRESS",
    "companyId": "6456310ce9637d3dfce74967",
    "transition": [],
    "description": "Person started woring on it"
  },{
    "_id": new ObjectId( "6456310ce9637d3dfce7496a"),
    "name": "DONE",
    "companyId": "6456310ce9637d3dfce74967",
    "transition": [],
    "description": "Done by the person who was working on it"
  },{
    "_id": new ObjectId( "6456310ce9637d3dfce7496b"),
    "name": "REOPEN",
    "companyId": "6456310ce9637d3dfce74967",
    "transition": [],
    "description": "Task or Issue was not properly done or resolved so it is reopened"
  },{
    "_id": new ObjectId( "6456310ce9637d3dfce7496c"),
    "name": "CLOSE",
    "companyId": "6456310ce9637d3dfce74967",
    "transition": [],
    "description": "Perpose of the ticket is served"
  },{
    "_id": new ObjectId( "6456c2dcadb8bf500932eadd"),
    "name": "parivar",
    "companyId": "6448fbb3d6242a22961da169",
    "transition": [
      "644904eae484963210856144"
    ],
    "description": "Not Ready with"
  },{
    "_id": new ObjectId( "64583021dac460ef6aa8a9b2"),
    "name": "TO DO",
    "companyId": "64583021dac460ef6aa8a9b1",
    "transition": [],
    "description": "It's TO DO for person whom it's assigned"
  },{
    "_id": new ObjectId( "64583021dac460ef6aa8a9b3"),
    "name": "IN PROGRESS",
    "companyId": "64583021dac460ef6aa8a9b1",
    "transition": [],
    "description": "Person started woring on it"
  },{
    "_id": new ObjectId( "64583021dac460ef6aa8a9b4"),
    "name": "DONE",
    "companyId": "64583021dac460ef6aa8a9b1",
    "transition": [],
    "description": "Done by the person who was working on it"
  },{
    "_id": new ObjectId( "64583021dac460ef6aa8a9b5"),
    "name": "REOPEN",
    "companyId": "64583021dac460ef6aa8a9b1",
    "transition": [],
    "description": "Task or Issue was not properly done or resolved so it is reopened"
  },{
    "_id": new ObjectId( "64583021dac460ef6aa8a9b6"),
    "name": "CLOSE",
    "companyId": "64583021dac460ef6aa8a9b1",
    "transition": [],
    "description": "Purpose of the ticket is served"
  }]

  module.exports = state