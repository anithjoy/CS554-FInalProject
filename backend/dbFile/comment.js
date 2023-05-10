const {ObjectId} = require('mongodb');

const comment = [{
  "_id": new ObjectId("645a488105401d99d12760ea"),
  "sender": "developer1.company1@gmail.com",
  "ticketId": "645a486a05401d99d12760e9",
  "timeStamp": new Date("Tue May 09 2023 20:08:22 GMT-0400 (Eastern Daylight Time)"),
  "text": "Hello"
},{
  "_id": new ObjectId("645a488e05401d99d12760eb"),
  "sender": "developer1.company1@gmail.com",
  "ticketId": "645a486a05401d99d12760e9",
  "timeStamp": new Date("Tue May 09 2023 20:08:22 GMT-0400 (Eastern Daylight Time)"),
  "text": "Please finish this on time"
},{
  "_id": new ObjectId("645a4aa405401d99d12760ee"),
  "sender": "developer1.company1@gmail.com",
  "ticketId": "645a49a305401d99d12760ed",
  "timeStamp": new Date("Tue May 09 2023 20:08:22 GMT-0400 (Eastern Daylight Time)"),
  "text": "hello"
}];

module.exports = comment;