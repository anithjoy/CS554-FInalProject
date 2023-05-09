const {ObjectId} = require('mongodb');

const comment = [{
  "_id": new ObjectId("645a488105401d99d12760ea"),
  "sender": "developer1.company1@gmail.com",
  "ticketId": "645a486a05401d99d12760e9",
  "timeStamp": new Date("1683648793236"),
  "text": "Hello"
},{
  "_id": new ObjectId("645a488e05401d99d12760eb"),
  "sender": "developer1.company1@gmail.com",
  "ticketId": "645a486a05401d99d12760e9",
  "timeStamp": new Date("1683648793236"),
  "text": "Please finish this on time"
},{
  "_id": new ObjectId("645a4aa405401d99d12760ee"),
  "sender": "developer1.company1@gmail.com",
  "ticketId": "645a49a305401d99d12760ed",
  "timeStamp": new Date("1683648793236"),
  "text": "hello"
}];

module.exports = comment;