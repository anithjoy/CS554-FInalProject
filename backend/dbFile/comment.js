const {ObjectId} = require('mongodb');

const comment = [{
    "_id": new ObjectId("644e79afdff8ad28ad9bdf08"),
    "sender": "pdarji@stevens.edu",
    "ticketId": "64490cdc07dacbcac30b2b12",
    "timeStamp": {
      "$date": {
        "$numberLong": "1682864559481"
      }
    },
    "text": "Hurry finish it"
  },{
    "_id": new ObjectId("644e7a74dea2b4d2928395f5"),
    "sender": "pdarji@stevens.edu",
    "ticketId": "64490cdc07dacbcac30b2b12",
    "timeStamp": {
      "$date": {
        "$numberLong": "1682864756643"
      }
    },
    "text": "nice work"
  },{
    "_id": new ObjectId("644e7d2cdea2b4d2928395f8"),
    "sender": "pdarji9988@gmail.com",
    "ticketId": "64490cdc07dacbcac30b2b12",
    "timeStamp": {
      "$date": {
        "$numberLong": "1682865452846"
      }
    },
    "text": "bye"
  },{
    "_id": new ObjectId("644e7d37dea2b4d2928395f9"),
    "sender": "pdarji@stevens.edu",
    "ticketId": "64490cdc07dacbcac30b2b12",
    "timeStamp": {
      "$date": {
        "$numberLong": "1682865463633"
      }
    },
    "text": "tata"
  }]

module.exports = comment;