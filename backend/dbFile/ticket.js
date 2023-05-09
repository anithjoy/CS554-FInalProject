const {ObjectId} = require('mongodb');

const ticket = [{
    "_id": new ObjectId("64490cdc07dacbcac30b2b12"),
    "name": "Parth ticket",
    "description": "xxvjgfbhfkdjvdfkvd",
    "type": "STORY",
    "projectId": "644903971ed69af2c16ed405",
    "stateId": "6449effe7ce38e770f84fda5",
    "priority": "LOW",
    "assign": "pdarji998@gmail.com",
    "watchers": [
      "pdarji998@gmail.com",
      "pdarji99@gmail.com",
      "pdarji9988@gmail.com"
    ],
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu",
    "comments": [],
    "closeDate": {
      "$date": {
        "$numberLong": "1682481600000"
      }
    },
    "expectedDate": {
      "$date": {
        "$numberLong": "1682481600000"
      }
    },
    "reopenDate": {
      "$date": {
        "$numberLong": "1682481600000"
      }
    }
  },{
    "_id": new ObjectId("644a5ab6e6a07b9a23ba806f"),
    "assign": "pdarji7777@gmail.com",
    "priority": "HIGH",
    "stateId": "6449effe7ce38e770f84fda5",
    "projectId": "644903971ed69af2c16ed405",
    "type": "TASK",
    "name": "Parth ticket",
    "description": "fsbjfdbljdfkvjlkd",
    "expectedDate": {
      "$date": {
        "$numberLong": "1685186264000"
      }
    },
    "dependedOnTickets": [
      "64490cdc07dacbcac30b2b12"
    ],
    "watchers": [
      "pdarji998@gmail.com",
      "pdarji7777@gmail.com",
      "pdarji88@stevens.edu"
    ],
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu",
    "comments": []
  },{
    "_id": new ObjectId("645277ce9ad888ce6273a8ac"),
    "projectId": "644903971ed69af2c16ed405",
    "name": "Test from project",
    "description": "hahaha nice one",
    "type": "TASK",
    "stateId": "644904eae484963210856144",
    "priority": "LOW",
    "assign": "pdarji998@gmail.com",
    "watchers": [
      "pdarji7777@gmail.com",
      "pdarji998@gmail.com"
    ],
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu"
  },{
    "_id": new ObjectId("645279bb9ad888ce6273a8ad"),
    "projectId": "644903971ed69af2c16ed405",
    "name": "xxxx",
    "description": "xxxx",
    "type": "STORY",
    "stateId": "644904eae484963210856144",
    "priority": "HIGH",
    "assign": "pdarji7777@gmail.com",
    "watchers": [
      "pdarji99@gmail.com",
      "pdarji@stevens.edu",
      "pdarji7777@gmail.com"
    ],
    "dependedOnTickets": [
      "645277ce9ad888ce6273a8ac",
      "645279bb9ad888ce6273a8ad",
      "645279d59ad888ce6273a8af"
    ],
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu"
  },{
    "_id": new ObjectId("645279bc9ad888ce6273a8ae"),
    "projectId": "644903971ed69af2c16ed405",
    "name": "xxxx",
    "description": "xxxx",
    "type": "STORY",
    "stateId": "644904eae484963210856144",
    "priority": "HIGH",
    "assign": "pdarji998@gmail.com",
    "watchers": [
      "pdarji99@gmail.com",
      "pdarji998@gmail.com",
      "pdarji@stevens.edu"
    ],
    "dependedOnTickets": [
      "645277ce9ad888ce6273a8ac"
    ],
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu"
  },{
    "_id": new ObjectId("645279d59ad888ce6273a8af"),
    "projectId": "644903971ed69af2c16ed405",
    "name": "xxxx",
    "description": "xxxx",
    "type": "STORY",
    "stateId": "644904eae484963210856144",
    "priority": "HIGH",
    "assign": "pdarji998@gmail.com",
    "watchers": [
      "pdarji99@gmail.com",
      "pdarji998@gmail.com",
      "pdarji@stevens.edu"
    ],
    "dependedOnTickets": [
      "645277ce9ad888ce6273a8ac"
    ],
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu",
    "expectedDate": {
      "$date": {
        "$numberLong": "1683691200000"
      }
    }
  },{
    "_id": new ObjectId("64527a339ad888ce6273a8b0"),
    "projectId": "644903971ed69af2c16ed405",
    "name": "xxxx",
    "description": "xxxx",
    "type": "STORY",
    "stateId": "644904eae484963210856144",
    "priority": "HIGH",
    "assign": "pdarji998@gmail.com",
    "watchers": [
      "pdarji99@gmail.com",
      "pdarji998@gmail.com",
      "pdarji@stevens.edu"
    ],
    "dependedOnTickets": [
      "645277ce9ad888ce6273a8ac"
    ],
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu"
  },{
    "_id": new ObjectId("64527d69a082737b1fe84ccc"),
    "projectId": "644903971ed69af2c16ed405",
    "name": "Parth ticket",
    "description": "dfbhgdfb",
    "type": "STORY",
    "sprintId": "64510f98764ef067c6aff8f2",
    "stateId": "644904eae484963210856144",
    "priority": "HIGH",
    "assign": "pdarji@gmail.com",
    "watchers": [
      "pdarji99@gmail.com",
      "pdarji@gmail.com",
      "pdarji@stevens.edu"
    ],
    "expectedDate": {
      "$date": {
        "$numberLong": "1683691200000"
      }
    },
    "dependedOnTickets": [
      "645277ce9ad888ce6273a8ac",
      "645279bb9ad888ce6273a8ad"
    ],
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu"
  },{
    "_id": new ObjectId("6456b587090e1e0a2de06bce"),
    "name": "new test",
    "description": "dfvfv",
    "type": "STORY",
    "projectId": "644903971ed69af2c16ed405",
    "sprintId": "64527a569ad888ce6273a8b1",
    "stateId": "644a5c46e6a07b9a23ba8071",
    "priority": "MEDIUM",
    "assign": "pdarji99@gmail.com",
    "watchers": [
      "pdarji998@gmail.com",
      "pdarji2112@gmail.com",
      "pdarji7777@gmail.com",
      "pdarji99@gmail.com",
      "pdarji@stevens.edu"
    ],
    "dependedOnTickets": [
      "645279bb9ad888ce6273a8ad",
      "64527a339ad888ce6273a8b0"
    ],
    "expectedDate": {
      "$date": {
        "$numberLong": "1684555200000"
      }
    },
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu"
  },{
    "_id": new ObjectId("6456b5a9090e1e0a2de06bcf"),
    "name": "Parth ticket",
    "description": "dvdsv",
    "type": "STORY",
    "projectId": "644903971ed69af2c16ed405",
    "sprintId": "64510f98764ef067c6aff8f2",
    "stateId": "644904eae484963210856144",
    "priority": "MEDIUM",
    "assign": "pdarji@gmail.com",
    "watchers": [
      "pdarji99@gmail.com",
      "pdarji9988@gmail.com",
      "pdarji@gmail.com",
      "pdarji@stevens.edu"
    ],
    "dependedOnTickets": [],
    "companyId": "6448fbb3d6242a22961da169",
    "creator": "pdarji@stevens.edu"
  }]

  module.exports = ticket