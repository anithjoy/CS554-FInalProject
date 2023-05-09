const {ObjectId} = require('mongodb');

const user = [{
  "_id": new ObjectId("645a2e8c56a35445d8ad9b8e"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "admin1.company1@gmail.com",
  "name": "Company Account",
  "role": "SUPER-ADMIN",
  "accessProjects": []
},{
  "_id": new ObjectId("645a2f2c56a35445d8ad9b8f"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "admin2.company1@gmail.com",
  "name": "Admin two",
  "role": "ADMIN",
  "accessProjects": []
},{
  "_id": new ObjectId("645a2f5c56a35445d8ad9b90"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "admin3.company1@gmail.com",
  "name": "Admin Three",
  "role": "ADMIN",
  "accessProjects": []
},{
  "_id": new ObjectId("645a2f9456a35445d8ad9b91"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "manager1.company1@gmail.com",
  "name": "Manager One",
  "role": "MANAGER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a2fa756a35445d8ad9b92"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "manager2.company1@gmail.com",
  "name": "Manager two",
  "role": "MANAGER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a2fd056a35445d8ad9b93"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "manager3.company1@gmail.com",
  "name": "Manager Three",
  "role": "MANAGER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a2fe856a35445d8ad9b94"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "manager4.company1@gmail.com",
  "name": "Manager Four",
  "role": "MANAGER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a300456a35445d8ad9b95"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "manager5.company1@gmail.com",
  "name": "Manager five",
  "role": "MANAGER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a31df56a35445d8ad9b96"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer1.company1@gmail.com",
  "name": "Developer One",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a31f356a35445d8ad9b97"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer2.company1@gmail.com",
  "name": "Developer Two",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a320856a35445d8ad9b98"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer3.company1@gmail.com",
  "name": "Developer Three",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a324156a35445d8ad9b99"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer4.company1@gmail.com",
  "name": "Developer Four",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a325656a35445d8ad9b9a"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer5.company1@gmail.com",
  "name": "Developer Five",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a326956a35445d8ad9b9b"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer6.company1@gmail.com",
  "name": "Developer Six",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a328b56a35445d8ad9b9c"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer7.company1@gmail.com",
  "name": "Developer Seven",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a32ac56a35445d8ad9b9d"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer8.company1@gmail.com",
  "name": "Developer Eight",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a32bf56a35445d8ad9b9e"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer9.company1@gmail.com",
  "name": "Developer Nine",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a32cf56a35445d8ad9b9f"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "developer10.company1@gmail.com",
  "name": "Developer Ten",
  "role": "DEVELOPER",
  "accessProjects": []
},{
  "_id": new ObjectId("645a355256a35445d8ad9ba0"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "qa1.company1@gmail.com",
  "name": "QAE One",
  "role": "QA",
  "accessProjects": []
},{
  "_id": new ObjectId("645a356156a35445d8ad9ba1"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "qa2.company1@gmail.com",
  "name": "QAE Two",
  "role": "QA",
  "accessProjects": []
},{
  "_id": new ObjectId("645a357c56a35445d8ad9ba2"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "support1.company1@gmail.com",
  "name": "Support One",
  "role": "SUPPORT",
  "accessProjects": []
},{
  "_id": new ObjectId("645a358b56a35445d8ad9ba3"),
  "companyId": "645a2e8c56a35445d8ad9b88",
  "email": "support2.company1@gmail.com",
  "name": "Support Two",
  "role": "SUPPORT",
  "accessProjects": []
},{
  "_id": new ObjectId("645a36ff56a35445d8ad9baa"),
  "companyId": "645a36ff56a35445d8ad9ba4",
  "email": "admin1.company2@gmail.com",
  "name": "Company Account",
  "role": "SUPER-ADMIN",
  "accessProjects": []
}];

  module.exports = user;