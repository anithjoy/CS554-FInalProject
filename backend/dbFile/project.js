const {ObjectId} = require('mongodb');

const project = [{
  "_id": new ObjectId("645a3e2291fe71be286857bd"),
  "name": "Project One",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "admin1.company1@gmail.com",
  "manager": "manager1.company1@gmail.com",
  "watchers": [
    "admin2.company1@gmail.com",
    "admin3.company1@gmail.com",
    "manager1.company1@gmail.com",
    "developer1.company1@gmail.com",
    "developer3.company1@gmail.com",
    "admin1.company1@gmail.com"
  ],
  "sprint": [
    {
      "_id": new ObjectId("645a3ff391fe71be286857c1"),
      "name": "Sprint One",
      "startDate": new Date("1683691200000"),
      "description": "This project is big I need to divide it in sprints..."
    },
    {
      "_id": new ObjectId("645a401391fe71be286857c2"),
      "name": "Sprint Two",
      "startDate": new Date("1685419200000"),
      "description": "this is second sprint"
    }
  ],
  "description": "This is my first project for seed file...."
},{
  "_id": new ObjectId("645a3ed391fe71be286857be"),
  "name": "Project Two",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager2.company1@gmail.com",
  "manager": "manager2.company1@gmail.com",
  "watchers": [
    "admin3.company1@gmail.com",
    "developer5.company1@gmail.com",
    "developer8.company1@gmail.com",
    "manager3.company1@gmail.com",
    "qa2.company1@gmail.com",
    "support1.company1@gmail.com",
    "manager2.company1@gmail.com"
  ],
  "sprint": [],
  "description": "This is my second project for seed file"
},{
  "_id": new ObjectId("645a3f3591fe71be286857bf"),
  "name": "Project Three",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager2.company1@gmail.com",
  "manager": "manager3.company1@gmail.com",
  "watchers": [
    "admin3.company1@gmail.com",
    "manager1.company1@gmail.com",
    "manager4.company1@gmail.com",
    "developer2.company1@gmail.com",
    "developer4.company1@gmail.com",
    "developer8.company1@gmail.com",
    "qa1.company1@gmail.com",
    "support2.company1@gmail.com",
    "manager2.company1@gmail.com",
    "manager3.company1@gmail.com"
  ],
  "sprint": [],
  "description": "This is my third Project for seed file"
},{
  "_id": new ObjectId("645a3f8591fe71be286857c0"),
  "name": "Project Four",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager2.company1@gmail.com",
  "manager": "manager5.company1@gmail.com",
  "watchers": [
    "admin2.company1@gmail.com",
    "manager3.company1@gmail.com",
    "manager5.company1@gmail.com",
    "developer10.company1@gmail.com",
    "developer9.company1@gmail.com",
    "developer8.company1@gmail.com",
    "qa1.company1@gmail.com",
    "qa2.company1@gmail.com",
    "support1.company1@gmail.com",
    "support2.company1@gmail.com",
    "manager2.company1@gmail.com"
  ],
  "sprint": [],
  "description": "This is my forth Project for seed file"
},{
  "_id": new ObjectId("645a423b91fe71be286857c5"),
  "name": "Project Five",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager4.company1@gmail.com",
  "manager": "manager3.company1@gmail.com",
  "watchers": [
    "admin3.company1@gmail.com",
    "manager5.company1@gmail.com",
    "developer4.company1@gmail.com",
    "developer7.company1@gmail.com",
    "developer6.company1@gmail.com",
    "qa1.company1@gmail.com",
    "support2.company1@gmail.com",
    "manager4.company1@gmail.com",
    "manager3.company1@gmail.com"
  ],
  "sprint": [
    {
      "_id": new ObjectId("645a427091fe71be286857c6"),
      "name": "One and Only Sprint",
      "startDate": new Date("1684123200000"),
      "description": "This is small project which does not need more sprint"
    }
  ],
  "description": "This is my fifth project"
},{
  "_id": new ObjectId("645a43a991fe71be286857c8"),
  "name": "Project Six",
  "companyId": "645a2e8c56a35445d8ad9b88",
  "creator": "manager5.company1@gmail.com",
  "manager": "manager2.company1@gmail.com",
  "watchers": [
    "admin3.company1@gmail.com",
    "manager1.company1@gmail.com",
    "manager4.company1@gmail.com",
    "developer2.company1@gmail.com",
    "developer4.company1@gmail.com",
    "developer6.company1@gmail.com",
    "qa1.company1@gmail.com",
    "qa2.company1@gmail.com",
    "support1.company1@gmail.com",
    "manager5.company1@gmail.com",
    "manager2.company1@gmail.com"
  ],
  "sprint": [],
  "description": "This is my sixth project"
}];

  module.exports = project