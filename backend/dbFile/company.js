const {ObjectId} = require('mongodb');

const company = [{
  "_id": new ObjectId("645a2e8c56a35445d8ad9b88"),
  "email": "admin1.company1@gmail.com",
  "EIN": "123456789",
  "name": "MSI"
},{
  "_id": new ObjectId("645a36ff56a35445d8ad9ba4"),
  "email": "admin1.company2@gmail.com",
  "EIN": "123456788",
  "name": "HP"
}]

  module.exports = company;