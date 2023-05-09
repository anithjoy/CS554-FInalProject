const {ObjectId} = require('mongodb');

const state = [{
  "_id": new ObjectId("645a2e8c56a35445d8ad9b89"),
  "name": "TO DO",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "transition": [
    "645a2e8c56a35445d8ad9b8a",
    "645a380056a35445d8ad9bab",
    "645a3ab31cc5e5ed8ef6a70e"
  ],
  "description": "It's TO DO for person whom it's assigned"
},{
  "_id": new ObjectId("645a2e8c56a35445d8ad9b8a"),
  "name": "IN PROGRESS",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "transition": [
    "645a2e8c56a35445d8ad9b8b",
    "645a380056a35445d8ad9bab",
    "645a3ab31cc5e5ed8ef6a70e",
    "645a3bbc1cc5e5ed8ef6a70f"
  ],
  "description": "Person started woring on it"
},{
  "_id": new ObjectId("645a2e8c56a35445d8ad9b8b"),
  "name": "DONE",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "transition": [],
  "description": "Done by the person who was working on it"
},{
  "_id": new ObjectId("645a2e8c56a35445d8ad9b8c"),
  "name": "REOPEN",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "transition": [
    "645a2e8c56a35445d8ad9b89",
    "645a2e8c56a35445d8ad9b8a",
    "645a380056a35445d8ad9bab",
    "645a3ab31cc5e5ed8ef6a70e"
  ],
  "description": "Task or Issue was not properly done or resolved so it is reopened"
},{
  "_id": new ObjectId("645a2e8c56a35445d8ad9b8d"),
  "name": "CLOSE",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "transition": [
    "645a2e8c56a35445d8ad9b8c"
  ],
  "description": "Purpose of the ticket is served"
},{
  "_id": new ObjectId("645a36ff56a35445d8ad9ba5"),
  "name": "TO DO",
  "companyId": "645a36ff56a35445d8ad9ba4",
  "transition": [],
  "description": "It's TO DO for person whom it's assigned"
},{
  "_id": new ObjectId("645a36ff56a35445d8ad9ba6"),
  "name": "IN PROGRESS",
  "companyId": "645a36ff56a35445d8ad9ba4",
  "transition": [],
  "description": "Person started woring on it"
},{
  "_id": new ObjectId("645a36ff56a35445d8ad9ba7"),
  "name": "DONE",
  "companyId": "645a36ff56a35445d8ad9ba4",
  "transition": [],
  "description": "Done by the person who was working on it"
},{
  "_id": new ObjectId("645a36ff56a35445d8ad9ba8"),
  "name": "REOPEN",
  "companyId": "645a36ff56a35445d8ad9ba4",
  "transition": [],
  "description": "Task or Issue was not properly done or resolved so it is reopened"
},{
  "_id": new ObjectId("645a36ff56a35445d8ad9ba9"),
  "name": "CLOSE",
  "companyId": "645a36ff56a35445d8ad9ba4",
  "transition": [],
  "description": "Purpose of the ticket is served"
},{
  "_id": new ObjectId("645a380056a35445d8ad9bab"),
  "name": "In Development",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "transition": [
    "645a2e8c56a35445d8ad9b8a",
    "645a2e8c56a35445d8ad9b8b",
    "645a3bbc1cc5e5ed8ef6a70f"
  ],
  "description": "Developer picked up this ticket and working on it"
},{
  "_id": new ObjectId("645a3ab31cc5e5ed8ef6a70e"),
  "name": "In Testing",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "transition": [
    "645a2e8c56a35445d8ad9b8b",
    "645a2e8c56a35445d8ad9b8a",
    "645a3bbc1cc5e5ed8ef6a70f"
  ],
  "description": "QA picked up ticket for testing"
},{
  "_id": new ObjectId("645a3bbc1cc5e5ed8ef6a70f"),
  "name": "Dependency Of Ticket",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "transition": [
    "645a2e8c56a35445d8ad9b8a",
    "645a380056a35445d8ad9bab",
    "645a3ab31cc5e5ed8ef6a70e",
    "645a2e8c56a35445d8ad9b89"
  ],
  "description": "Depended on other ticket which need to be finish"
}];

  module.exports = state