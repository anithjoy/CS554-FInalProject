const {ObjectId} = require('mongodb');

const ticket = [{
  "_id": new ObjectId("645a413f91fe71be286857c3"),
  "projectId": "645a3e2291fe71be286857bd",
  "name": "Ticket One",
  "description": "This is my first ticket",
  "type": "STORY",
  "sprintId": "645a3ff391fe71be286857c1",
  "stateId": "645a2e8c56a35445d8ad9b89",
  "priority": "MEDIUM",
  "assign": "developer2.company1@gmail.com",
  "watchers": [
    "developer3.company1@gmail.com",
    "developer2.company1@gmail.com",
    "manager1.company1@gmail.com"
  ],
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager1.company1@gmail.com"
},{
  "_id": new ObjectId("645a41c491fe71be286857c4"),
  "projectId": "645a3e2291fe71be286857bd",
  "name": "Ticket Two",
  "description": "Can we automate this work I am tried of creating dummy data",
  "type": "TASK",
  "sprintId": "645a3ff391fe71be286857c1",
  "stateId": "645a380056a35445d8ad9bab",
  "priority": "HIGH",
  "assign": "developer5.company1@gmail.com",
  "watchers": [
    "developer1.company1@gmail.com",
    "developer9.company1@gmail.com",
    "developer5.company1@gmail.com",
    "manager1.company1@gmail.com"
  ],
  "expectedDate": new Date("1683648793236"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager1.company1@gmail.com"
},{
  "_id": new ObjectId("645a42c191fe71be286857c7"),
  "projectId": "645a423b91fe71be286857c5",
  "name": "Assign work",
  "description": "Divide and assign work to developers",
  "type": "TASK",
  "sprintId": "645a427091fe71be286857c6",
  "stateId": "645a2e8c56a35445d8ad9b8a",
  "priority": "HIGH",
  "assign": "manager3.company1@gmail.com",
  "watchers": [
    "admin2.company1@gmail.com",
    "admin3.company1@gmail.com",
    "manager1.company1@gmail.com",
    "manager5.company1@gmail.com",
    "manager3.company1@gmail.com",
    "manager4.company1@gmail.com"
  ],
  "expectedDate": new Date("1683648793236"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager4.company1@gmail.com",
  "dependedOnTickets": [
    "645a44f791fe71be286857ca"
  ]
},{
  "_id": new ObjectId("645a445b91fe71be286857c9"),
  "name": "Module Purchase",
  "description": "Please purchase xxx module for xxx platform",
  "type": "TASK",
  "projectId": "645a43a991fe71be286857c8",
  "stateId": "645a2e8c56a35445d8ad9b89",
  "priority": "LOW",
  "assign": "support1.company1@gmail.com",
  "watchers": [
    "admin2.company1@gmail.com",
    "admin3.company1@gmail.com",
    "manager1.company1@gmail.com",
    "manager5.company1@gmail.com",
    "support1.company1@gmail.com"
  ],
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager5.company1@gmail.com"
},{
  "_id": new ObjectId("645a44f791fe71be286857ca"),
  "name": "Aws Access",
  "description": "Needed aws access to create basic structure before assigning to team",
  "type": "TASK",
  "projectId": "645a423b91fe71be286857c5",
  "sprintId": "645a427091fe71be286857c6",
  "stateId": "645a2e8c56a35445d8ad9b8a",
  "priority": "HIGH",
  "assign": "admin2.company1@gmail.com",
  "watchers": [
    "admin2.company1@gmail.com",
    "admin3.company1@gmail.com",
    "manager1.company1@gmail.com",
    "manager2.company1@gmail.com",
    "manager3.company1@gmail.com",
    "manager4.company1@gmail.com",
    "manager5.company1@gmail.com"
  ],
  "expectedDate": new Date("1683648793236"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager5.company1@gmail.com"
},{
  "_id": new ObjectId("645a486a05401d99d12760e9"),
  "name": "Access control",
  "description": "check access using this ticket",
  "type": "BUG",
  "projectId": "645a3e2291fe71be286857bd",
  "sprintId": "645a401391fe71be286857c2",
  "stateId": "645a2e8c56a35445d8ad9b8b",
  "priority": "MEDIUM",
  "assign": "developer1.company1@gmail.com",
  "watchers": [
    "manager2.company1@gmail.com",
    "manager4.company1@gmail.com",
    "developer1.company1@gmail.com",
    "developer4.company1@gmail.com"
  ],
  "expectedDate": new Date("1683648793236"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "developer1.company1@gmail.com"
},{
  "_id": new ObjectId("645a492105401d99d12760ec"),
  "name": "Assign Exp Date",
  "description": "demo for assign exp date",
  "type": "BUG",
  "projectId": "645a3e2291fe71be286857bd",
  "sprintId": "645a401391fe71be286857c2",
  "stateId": "645a380056a35445d8ad9bab",
  "priority": "HIGH",
  "assign": "developer1.company1@gmail.com",
  "watchers": [
    "manager2.company1@gmail.com",
    "developer3.company1@gmail.com",
    "developer8.company1@gmail.com",
    "developer1.company1@gmail.com"
  ],
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "developer3.company1@gmail.com"
},{
  "_id": new ObjectId("645a49a305401d99d12760ed"),
  "name": "Expire date",
  "description": "this is demo for expire expected date",
  "type": "BUG",
  "projectId": "645a3e2291fe71be286857bd",
  "sprintId": "645a3ff391fe71be286857c1",
  "stateId": "645a2e8c56a35445d8ad9b8d",
  "priority": "MEDIUM",
  "assign": "developer1.company1@gmail.com",
  "watchers": [
    "admin2.company1@gmail.com",
    "manager2.company1@gmail.com",
    "manager1.company1@gmail.com",
    "manager5.company1@gmail.com",
    "support2.company1@gmail.com",
    "qa1.company1@gmail.com",
    "developer8.company1@gmail.com",
    "developer1.company1@gmail.com",
    "developer3.company1@gmail.com"
  ],
  "expectedDate": new Date("1683648793236"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "developer3.company1@gmail.com"
}];

  module.exports = ticket